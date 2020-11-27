import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from 'Schemas';
import compression from 'compression';
import * as config from 'Config/config.json';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import { getTokenFromReq } from 'Common/Utils/VerifyToken';

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

const server = new ApolloServer({
	schema,
	context: ({ req }) => {
		return { token: getTokenFromReq(req) };
	},
});

server.applyMiddleware({ app, path: '/api', cors: true });

mongoose
	.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(port, () => console.log(`> Ready on http://localhost:${port}${server.graphqlPath}`)));

mongoose.set('useCreateIndex', true);
