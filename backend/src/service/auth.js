const argon2 = require("argon2");

const hashPassword = (req, res, next) => {
    const hashOptions = {
        type: argon2.argon2id,
        memoryCost: 2 ** 16,
        parallelism: 1,
        timeCost: 5,
    };
    argon2
        .hash(req.body.password, hashOptions)
        .then((hashPassword) => {
            req.body.password = hashPassword;
            delete req.body.password;
            next();
        })
        .catch((err) => {
            res.status(500).json({ message: "Internal server error" });
        });
};

module.exports = {
    hashPassword,
};