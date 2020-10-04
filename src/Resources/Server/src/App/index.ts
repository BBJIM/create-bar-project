import bodyParser from 'body-parser';
import compression from 'compression';
import * as config from 'Config/config.json';
import { AuthController, GenericController } from 'Controllers';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const connectionString = config[process.env.NODE_ENV].connectionString;
const port = process.env.PORT || 3005;

app.use(compression());
app.use(helmet());
// TODO: add url's to cors
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = express.Router();
router.use('/auth', AuthController);
router.use('/', GenericController);

app.use('/api', router);

mongoose
	.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(port, () => console.log(`> Ready on port ${port}`)));

mongoose.set('useCreateIndex', true);
