import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { localPassport, session } from './config';
import { handleErrors } from './middlewares/app';
import routes from './routes';
import * as swaggerDocument from './swagger.json';

dotenv.config();
localPassport(passport);

const port = process.env.PORT || 3000;

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session());

/**
 * Initialize passport and session
 */
app.use(passport.initialize());
app.use(passport.session());
/**
 * App routes
 */
app.use(
	'/api/documentation',
	swaggerUi.serve,
	swaggerUi.setup(swaggerDocument)
);
app.use(routes);
/**
 * Catch unexpected errors
 */
app.use(handleErrors);
/**
 * Start express server
 */
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;
