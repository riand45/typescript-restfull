import { Request, Response } from 'express';
import IController from './ControllerInterface';

import TodoService from '../services/TodoService';

class TodoController implements IController {
  index = async (req: Request, res: Response):Promise<Response> => {
   const service: TodoService = new TodoService(req);
   const todos = await service.getAll();

    return res.status(201).json({
      status: 'success showing',
      data: todos
    })
  }
  create = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);
    const todo = await service.store();

    return res.status(201).json({
      status: 'success created',
      data: todo
    })
  }
  show = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);
    const todo = await service.show();

    return res.status(201).json({
      status: 'success showing by id',
      data: todo
    })
  }
  update = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);
    const todo = await service.update();

    return res.status(200).json({
      status: 'success updated by id',
      data: todo
    })
  }
  delete = async (req: Request, res: Response): Promise<Response> => {
    const service: TodoService = new TodoService(req);
    const todo = await service.delete();

    return res.status(200).json({
      status: 'success deleted by id',
      data: todo
    })
  }
}

export default new TodoController();