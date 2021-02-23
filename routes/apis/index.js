import { Router } from 'express';
import todoRoutes from './todoRoutes';
import userRoutes from './user';

const apiRoutes = Router();

apiRoutes.use('/users', userRoutes);
apiRoutes.use('/todos', todoRoutes);

export default apiRoutes;
