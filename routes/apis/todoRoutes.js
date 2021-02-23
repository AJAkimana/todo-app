import { Router } from 'express';
import {
	createATodo,
	deleteTodo,
	downloadCsvTodos,
	getTodoDetails,
	getTodos,
	updateTodo
} from '../../controllers/todoController';
import { catchErrors } from '../../middlewares/app';
import { isAuthenticated } from '../../middlewares/auth';
import {
	doesTodoExits,
	isTodoInfoValid
} from '../../middlewares/todoValidation';

const todoRoutes = Router();

todoRoutes.post(
	'/',
	isAuthenticated,
	isTodoInfoValid,
	catchErrors(createATodo)
);
todoRoutes.get('/', catchErrors(getTodos));
todoRoutes.get(
	'/:todoId',
	catchErrors(doesTodoExits),
	catchErrors(getTodoDetails)
);
todoRoutes.patch(
	'/:todoId',
	isAuthenticated,
	catchErrors(doesTodoExits),
	isTodoInfoValid,
	catchErrors(updateTodo)
);
todoRoutes.delete(
	'/:todoId',
	isAuthenticated,
	catchErrors(doesTodoExits),
	catchErrors(deleteTodo)
);
todoRoutes.get('/download/all', catchErrors(downloadCsvTodos));

export default todoRoutes;
