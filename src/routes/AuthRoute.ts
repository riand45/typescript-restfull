import BaseRoute from './BaseRoute';
import AuthController from '../Controllers/AuthController';
import validate from '../Middleware/AuthValidator';
import {auth} from '../Middleware/AuthMiddleware';
class AuthRoute extends BaseRoute {
  public routes(): void {
    this.router.post("/register", validate, AuthController.register);
    this.router.post("/login", AuthController.login);
    this.router.get("/profile", auth, AuthController.profile);
  }
}

export default new AuthRoute().router;