const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = require("../models").User;
const Role = require("../models").Role;
const Op = db.Sequelize.Op;
const config = require("../config/configRoles");
const { where } = require("sequelize");

module.exports = {
  async signup(req, res) {
    try {
      const role = await Role.findOne({
        where: { name: req.body.role },
      });

      const user = await User.create({
        name: req.body.name,
        id: req.body.id,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        role_id: role.id,
      });

      let token =
        "Bearer " +
        jwt.sign(
          {
            id: user.id,
          },
          config.secret,
          {
            expiresIn: 86400,
          }
        );

      return res.status(200).send({
        auth: true,
        message: "User registered successfully!",
        errors: null,
        accessToken: token,
        user: {
          name: user.name,
          id: user.id,
          email: user.email,
          role_id: user.role_id,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
        },
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        id: req.body.id,
        message: "Error",
        errors: err,
      });
    }
  },

  async signin(req, res) {
    try {
      const user = await User.findOne({
        where: {
          id: req.body.id,
        },
      });

      if (!user) {
        return res.status(404).send({
          auth: false,
          id: req.body.id,
          accessToken: null,
          message: "Error",
          error: "User Not Found",
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          id: req.body.id,
          accessToken: null,
          message: "Error",
          errors: "Invalid Password!",
        });
      }

      let token =
        "Bearer " +
        jwt.sign(
          {
            id: user.id,
          },
          config.secret,
          {
            expiresIn: 86400,
          }
        );

      return res.status(200).send({
        auth: true,
        id: req.body.id,
        accessToken: token,
        user: {
          name: user.name,
          id: user.id,
          email: user.email,
          role_id: user.role_id,
          created_at: user.createdAt,
          updated_at: user.updatedAt,
        },
        message: "Success",
        errors: null,
      });
    } catch (err) {
      return res.status(500).send({
        auth: false,
        id: req.body.id,
        accessToken: null,
        message: "Error",
        errors: err,
      });
    }
  },
};
