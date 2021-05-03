import { Request, Response } from 'express';
const db = require('../db/models');
import Authentication from '../utils/Authentication';

class AuthController {
  register = async(req: Request, res: Response): Promise<Response> => {
    let { name, username, password } = req.body;
    const hashedPassword: string = await Authentication.passwordHash(password);

    const createdUser = await db.user.create({ name, username, password:hashedPassword});

    return res.send(createdUser);
  }

  login = async(req: Request, res: Response): Promise<Response> => {
    let { username, password } = req.body;
    const user = await db.user.findOne({ where: {username}});

    let compare = await Authentication.passwordCompare(password, user.password);

    if(compare) {
      let token = Authentication.generateToken(user.id, user.username, user.password);
      return res.status(200).json({
        status: 'success',
        data: token
      })
    }

    return res.status(401).send("Authentication Failed!")
  }

  profile = (req: Request, res: Response): Response => {
    return res.send(req.app.locals.credential);
  }
}

export default new AuthController();