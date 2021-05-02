import BaseRoute from './BaseRoute';

import UserController from '../Controllers/UserController';
import { auth } from '../Middleware/AuthMiddleware';

class UserRoute extends BaseRoute {

  public routes(): void {
    this.router.get("/", auth, UserController.index);
    this.router.post("/", UserController.create);
    this.router.get("/:id", UserController.show);
    this.router.put("/:id", UserController.update);
    this.router.delete("/:id", UserController.delete);
  }
}

export default new UserRoute().router;