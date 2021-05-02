import { Request, Response } from 'express';
const db = require('../db/models');

class AuthController {
  register = async(req: Request, res: Response): Promise<Response> => {
    let { name, username, password } = req.body;

    const createdUser = await db.user.create({ name, username, password});

    return res.send(createdUser);
  }

  login(req: Request, res: Response): Response {
    return res.send('');
  }
}

export default new AuthController();