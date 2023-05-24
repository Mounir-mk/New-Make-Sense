const fs = require("fs");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const upload = multer({ dest: "uploads/" });

const uploadFile = upload.single("avatar");
const handleFile = (req, res, next) => {
  if (req.file) {
    const { filename, originalname } = req.file;
    const modifiedName = `${uuidv4()}-${originalname}`;
    const path = `uploads/${modifiedName}`;
    fs.rename(`uploads/${filename}`, path, (err) => {
      if (err) {
        res.sendStatus(500);
      }
      req.body.image_url = modifiedName;
      next();
    });
  } else {
    next();
  }
};

const browse = async (req, res) => {
  const users = await prisma.user.findMany();
  if (users) {
    Object.keys(users).forEach((key) => {
      delete users[key].hashed_password;
    });
    res.status(200).json(users);
  } else {
    res.status(404).json({ message: "Users not found" });
  }
};

const read = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });
  if (user) {
    delete user.hashed_password;
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const browseAndCountDecisions = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        decision: true,
      },
    });
    Object.keys(users).forEach((key) => {
      delete users[key].hashed_password;
    });
    users.forEach((user) => {
      const userMutated = user;
      userMutated.nb_decisions = userMutated.decision.length;
      delete userMutated.decision;
    });
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  try {
    const data = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };

    if (!req.body.hashedPassword) {
      const oldHashedPassword = await prisma.user.findUnique({
        where: {
          id: parseInt(req.params.id, 10),
        },
        select: {
          hashed_password: true,
        },
      });
      data.hashed_password = oldHashedPassword.hashed_password;
    } else {
      data.hashed_password = req.body.hashedPassword;
    }

    const user = await prisma.user.update({
      where: {
        id: parseInt(req.params.id, 10),
      },
      data,
    });

    res.status(204).json({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

const add = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashed_password: req.body.hashedPassword,
      image_url: req.body.image_url || "default.png",
    },
  });
  if (user) {
    delete user.hashed_password;
    res.status(201).json({ message: "User created", user });
  } else {
    res.json({ message: "User not created" });
  }
};

const destroy = async (req, res) => {
  const user = await prisma.user.delete({
    where: {
      id: parseInt(req.params.id, 10),
    },
  });
  if (user) {
    res.status(204).json({ message: "User deleted" });
  } else {
    res.status(404).json({ message: "User not deleted" });
  }
};

const getUserByEmailWithPasswordAndPassToNext = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  req.user = user;
  next();
  return null;
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getUserByEmailWithPasswordAndPassToNext,
  browseAndCountDecisions,
  uploadFile,
  handleFile,
};
