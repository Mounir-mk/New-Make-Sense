const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const hashPassword = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return next();
    }

    const hashOptions = {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      parallelism: 1,
      timeCost: 5,
    };

    const hashedPassword = await argon2.hash(req.body.password, hashOptions);
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;

    return next(); // Utilisation de `return` pour terminer l'exécution du middleware et passer au middleware ou au contrôleur suivant
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }

  return null;
};

const verifyPassword = async (req, res) => {
  const { user } = req;
  try {
    const match = await argon2.verify(user.hashed_password, req.body.password);
    if (match) {
      const accessTokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        type: "access",
      };
      const refreshTokenPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
        type: "refresh",
      };
      const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET, {
        expiresIn: 60,
      }); // expires in 1 minute
      const refreshToken = jwt.sign(
        refreshTokenPayload,
        process.env.JWT_SECRET,
        {
          expiresIn: 300,
        }
      ); // expires in 5 minutes

      // Find existing refresh token for user
      const existingRefreshToken = await prisma.refreshToken.findUnique({
        where: { userId: user.id },
      });

      // Delete existing refresh token if it exists
      if (existingRefreshToken) {
        await prisma.refreshToken.delete({
          where: { id: existingRefreshToken.id },
        });
      }

      // Store the refresh token in the database
      await prisma.refreshToken.create({
        data: {
          token: refreshToken,
          userId: user.id,
        },
      });

      res.json({
        accessToken,
        refreshToken,
        expiresIn: 60,
        authUserState: { id: user.id, email: user.email, role: user.role },
        refreshTokenExpireIn: 300,
        role: user.role,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const refreshTokens = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });
    if (!user) {
      throw new Error("User not found");
    }

    await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });

    const storedRefreshToken = await prisma.refreshToken.findUnique({
      where: { token: refreshToken },
    });
    if (!storedRefreshToken) {
      throw new Error("Invalid refresh token");
    }
    const newAccessTokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      type: "access",
    };
    const newRefreshTokenPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      type: "refresh",
    };
    const newAccessToken = jwt.sign(
      newAccessTokenPayload,
      process.env.JWT_SECRET,
      {
        expiresIn: 60,
      }
    ); // expires in 1 minute
    const newRefreshToken = jwt.sign(
      newRefreshTokenPayload,
      process.env.JWT_SECRET,
      {
        expiresIn: 300,
      }
    ); // expires in 5 minutes

    console.warn("newRefreshToken", newRefreshToken);

    // Use Prisma transaction to delete old and create new refresh token
    await prisma.$transaction([
      prisma.refreshToken.delete({
        where: { token: refreshToken },
      }),
      prisma.refreshToken.create({
        data: {
          token: newRefreshToken,
          userId: user.id,
        },
      }),
    ]);

    res.json({
      success: true,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      newAccessTokenExpiresIn: 60,
      newRefreshTokenExpiresIn: 300,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logout = async (req, res) => {
  const { user } = req.body;
  try {
    // Delete refresh token for user
    await prisma.refreshToken.delete({
      where: { userId: user.id },
    });

    // Now you can send a response back indicating successful logout
    res.json({ message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  refreshTokens,
  verifyToken,
  logout,
};
