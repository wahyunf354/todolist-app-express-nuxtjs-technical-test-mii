const User = require("../models").User;
const { where } = require("sequelize");
const config = require("../config/configRoles.js");
const ROLEs = config.ROLEs;

module.exports = {
  async checkDuplicateUsernameOrEmail(req, res, next) {
    console.log(req.body);
    try {
      const user = await User.findOne({ where: { id: req.body.id } });
      if (user) {
        return res.status(400).send({
          auth: false,
          id: req.body.id,
          message: "Error",
          errors: "Id is already taken!",
        });
      }
      const emailUserAxist = await User.findOne({
        where: { email: req.body.email },
      });
      if (emailUserAxist) {
        return res.status(400).send({
          auth: false,
          id: req.body.id,
          message: "Error",
          errors: "Email is already taken!",
        });
      }
      next();
    } catch (err) {
      return res.status(500).send({
        auth: false,
        message: "Error Disini",
        errors: err,
      });
    }
  },
  checkRolesExisted(req, res, next) {
    if (!ROLEs.includes(req.body.role.toUpperCase())) {
      return res.status(400).send({
        auth: false,
        id: req.body.id,
        message: "Error",
        errors: "Does NOT exist Role = " + req.body.roles[i],
      });
    }
    next();
  },
};
