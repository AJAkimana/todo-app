import { Router } from 'express';
import { createATodo, getTodos } from '../../controllers/todoController';
import { catchErrors } from '../../middlewares/app';
import { isTodoInfoValid } from '../../middlewares/todoValidation';

const todoRoutes = Router();

todoRoutes.post('/', isTodoInfoValid, catchErrors(createATodo));
todoRoutes.get('/', catchErrors(getTodos));

export default todoRoutes;
