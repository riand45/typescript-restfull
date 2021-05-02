import { Request, Response } from 'express';
import IController from './ControllerInterface';

let data: Array<{id:number, name:string}> = [
  {id: 1, name: 'John'},
  {id: 2, name: 'Doe'},
  {id: 3, name: 'Lorem'},
  {id: 4, name: 'Ipsum'},
  {id: 5, name: 'Dolor'},
]

class UserController implements IController {
  index(req: Request, res: Response): Response {
    return res.send(data);
  }
  create(req: Request, res: Response): Response {
    const {id, name} = req.body;

    data.push({id,name});

    return res.send(data);
  }
  show(req: Request, res: Response): Response {
    const {id} = req.params;

    let user = data.find(item => item.id == id);

    return res.send(user);
  }
  update(req: Request, res: Response): Response {
    const {id} = req.params;
    const {name} = req.body;

    let user = data.find(item => item.id == id);
    user.name = name;

    return res.send(data);
  }
  delete(req: Request, res: Response): Response {
    const {id} = req.params;

    let user = data.filter(item => item.id != id);

    return res.send(user);
  }
}

export default new UserController();