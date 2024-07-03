const verifySignUpController = require("../controller").verifySignUp;
const verifySignController = require("../controller").verifySign;
const todoController = require("../controller").Todo;
const verifyJwtTokenController = require("../controller").verifyJwtToken;

module.exports = function (app) {
  // User Auth
  app.post(
    "/api/auth/singup",
    [verifySignUpController.checkDuplicateUsernameOrEmail],
    verifySignController.signup
  );

  app.post("/api/auth/signin", verifySignController.signin);

  // Todo
  app.get(
    "/api/todo-all",
    [verifyJwtTokenController.verifyToken, verifyJwtTokenController.isAdmin],
    todoController.list
  );

  app.get(
    "/api/todos",
    [verifyJwtTokenController.verifyToken],
    todoController.listTodoUser
  );

  app.get(
    "/api/todos/:id",
    [verifyJwtTokenController.verifyToken],
    todoController.getById
  );

  app.post(
    "/api/todos",
    [verifyJwtTokenController.verifyToken],
    todoController.add
  );

  app.put(
    "/api/todos/:id",
    [verifyJwtTokenController.verifyToken],
    todoController.update
  );

  app.delete(
    "/api/todos/:id",
    [verifyJwtTokenController.verifyToken],
    todoController.delete
  );
};
