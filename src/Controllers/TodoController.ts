import { Request, Response } from 'express';
import IController from './ControllerInterface';

const db = require('../db/models');

class TodoController implements IController {
  index = async (req: Request, res: Response):Promise<Response> => {
    const { id } = req.app.locals.credential;

    const todo = await db.todo.findAll({
      where: {user_id: id},
      attributes: ['id', 'description']
    });

    return res.status(201).json({
      status: 'success showing',
      data: todo
    })
  }
  create = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.app.locals.credential;
    const { description } = req.body;

    const todo = await db.todo.create({
      user_id: id,
      description
    });

    return res.status(201).json({
      status: 'success created',
      data: todo
    })
  }
  show = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;

    const todo = await db.todo.findOne({where: {id, user_id}});

    return res.status(201).json({
      status: 'success showing by id',
      data: todo
    })
  }
  update = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;
    const { description } = req.body;

    await db.todo.update({
      description: description
    },{
      where: {id, user_id}
    });

    return res.status(200).json({
      status: 'success updated by id',
    })
  }
  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id: user_id } = req.app.locals.credential;
    const { id } = req.params;

    await db.todo.destroy({ where: {id, user_id}});

    return res.status(200).json({
      status: 'success deleted by id',
    })
  }
}

export default new TodoController();