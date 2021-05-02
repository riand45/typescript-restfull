import BaseRoute from './BaseRoute';
import AuthController from '../Controllers/AuthController';

class AuthRoute extends BaseRoute {
  public routes(): void {
    this.router.post("/register", AuthController.register);
    this.router.post("/login", AuthController.login);
  }
}

export default new AuthRoute().router;