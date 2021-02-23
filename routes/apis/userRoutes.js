import { Router } from 'express';
import {
	loginUser,
	signupUser,
	logoutUser
} from '../../controllers/userController';
import { catchErrors } from '../../middlewares/app';
import {
	isLoginInfoValid,
	isSignUpInfoValid
} from '../../middlewares/userValidation';

const userRoutes = Router();

userRoutes.post('/login', isLoginInfoValid, catchErrors(loginUser));
userRoutes.post('/signup', isSignUpInfoValid, catchErrors(signupUser));
userRoutes.use('/logout', logoutUser);

export default userRoutes;
