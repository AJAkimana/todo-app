import { Router } from 'express';
import {
	createATodo,
	deleteTodo,
	getTodoDetails,
	getTodos,
	updateTodo
} from '../../controllers/todoController';
import { catchErrors } from '../../middlewares/app';
import {
	doesTodoExits,
	isTodoInfoValid
} from '../../middlewares/todoValidation';

const todoRoutes = Router();

todoRoutes.post('/', isTodoInfoValid, catchErrors(createATodo));
todoRoutes.get('/', catchErrors(getTodos));
todoRoutes.get(
	'/:todoId',
	catchErrors(doesTodoExits),
	catchErrors(getTodoDetails)
);
todoRoutes.patch(
	'/:todoId',
	catchErrors(doesTodoExits),
	isTodoInfoValid,
	catchErrors(updateTodo)
);
todoRoutes.delete(
	'/:todoId',
	catchErrors(doesTodoExits),
	catchErrors(deleteTodo)
);

export default todoRoutes;
