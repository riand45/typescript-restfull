import BaseRoute from './BaseRoute';
import TodoController from '../Controllers/TodoController';
import validate from '../Middleware/TodoValidator';
import {auth} from '../Middleware/AuthMiddleware';
class TodoRoute extends BaseRoute {
  public routes(): void {
    this.router.get("/", auth, TodoController.index);
    this.router.post("/", auth, validate, TodoController.create);
    this.router.get("/:id", auth, TodoController.show);
    this.router.put("/:id", auth, TodoController.update);
    this.router.delete("/:id", auth, TodoController.delete);
  }
}

export default new TodoRoute().router;