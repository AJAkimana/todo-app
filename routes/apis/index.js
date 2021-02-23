import { Router } from 'express';
import todoRoutes from './todoRoutes';
import userRoutes from './userRoutes';

const apiRoutes = Router();

apiRoutes.use('/auth', userRoutes);
apiRoutes.use('/todos', todoRoutes);

export default apiRoutes;
