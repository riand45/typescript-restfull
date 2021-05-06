import { Request} from 'express';

const db = require('../db/models');

class TodoService {
  credential: {
    id: number;
  };
  body: Request['body'];
  params: Request['params'];

  constructor(req: Request) {
    this.credential = req.app.locals.credential;
    this.body = req.body;
    this.params = req.params;
  }

  getAll = async() => {
    const todos = await db.todo.findAll({
      where: {user_id: this.credential.id},
      attributes: ['id', 'description']
    });

    return todos;
  }

  store = async() => {
    const todos = await db.todo.create({
      user_id: this.credential.id,
      description: this.body.description
    });

    return todos;
  }

  show = async() => {
    const todo = await db.todo.findOne({
      where: {id: this.params.id, user_id: this.credential.id}
    });

    return todo;
  }

  update = async() => {
    const todo = await db.todo.update({
      description: this.body.description
    },{
      where: {id: this.params.id, user_id: this.credential.id}
    });

    return todo;
  }

  delete = async() => {
    const todo = await db.todo.destroy({
      where: {id: this.params.id, user_id: this.credential.id}
    });

    return todo;
  }
}

export default TodoService;