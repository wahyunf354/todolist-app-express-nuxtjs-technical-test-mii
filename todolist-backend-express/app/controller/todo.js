const { UUIDV1 } = require("sequelize");

const Todo = require("../models").Todo;

module.exports = {
  getById(req, res) {
    return Todo.findByPk(req.params.id, {
      include: [],
    })
      .then((doc) => {
        if (!doc) {
          return res.status(404).send({
            status_response: "Not Found",
            errors: "Todo Not Found",
          });
        }
        const todo = {
          status_response: "OK",
          data: doc,
          errors: null,
        };
        return res.status(200).send(todo);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  list(req, res) {
    return Todo.findAll({
      limit: 10,
      include: [],
      order: [["createdAt", "DESC"]],
    })
      .then((docs) => {
        const statuses = {
          status_response: "OK",
          count: docs.length,
          statuses: docs.map((doc) => {
            return doc;
          }),
          errors: null,
        };
        res.status(200).send(statuses);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  listTodoUser(req, res) {
    return Todo.findAll({
      limit: 10,
      include: [],
      where: {
        user_id: req.userId,
      },
      order: [["createdAt", "DESC"]],
    })
      .then((docs) => {
        const statuses = {
          status_response: "OK",
          count: docs.length,
          todo_list: docs.map((doc) => {
            return doc;
          }),
          errors: null,
        };
        res.status(200).send(statuses);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  add(req, res) {
    return Todo.create({
      title: req.body.title,
      body: req.body.body,
      user_id: req.userId,
    })
      .then((doc) => {
        const status = {
          status_response: "Created",
          status: doc,
          errors: null,
        };
        return res.status(201).send(status);
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  update(req, res) {
    return Todo.findByPk(req.params.id, {})
      .then((todo) => {
        if (!todo) {
          return res.status(404).send({
            status_response: "Bad Request",
            errors: "Todo Not Found",
          });
        }

        if (todo.user_id !== req.userId) {
          return res.status(403).send({
            status_response: "Bad Request",
            errors: "Different User Id",
          });
        }

        return todo
          .update({
            title: req.body.title || todo.title,
            body: req.body.body || todo.body,
            status: req.body.status,
          })
          .then((doc) => {
            const todo = {
              status_response: "OK",
              todo: doc,
              errors: null,
            };
            return res.status(200).send(todo);
          })
          .catch((error) => {
            res.status(400).send({
              status_response: "Bad Request",
              errors: error,
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },

  delete(req, res) {
    return Todo.findByPk(req.params.id)
      .then((todo) => {
        if (!todo) {
          return res.status(400).send({
            status_response: "Bad Request",
            errors: "Todo Not Found",
          });
        }

        if (todo.user_id !== req.userId) {
          return res.status(403).send({
            status_response: "Bad Request",
            errors: "Different User Id",
          });
        }

        return todo
          .destroy()
          .then(() =>
            res.status(204).send({
              status_response: "No Content",
              message: "Success deleted todo",
              errors: null,
            })
          )
          .catch((error) => {
            res.status(400).send({
              status_response: "Bad Request",
              errors: error,
            });
          });
      })
      .catch((error) => {
        res.status(400).send({
          status_response: "Bad Request",
          errors: error,
        });
      });
  },
};
