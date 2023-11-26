import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import path from 'path';
import url from 'url';

import userRoutes from './routes/userRoutes.js';
import shortlinkRoutes from './routes/shortlinkRoutes.js';
import redirectRoutes from './routes/redirectRoutes.js';

// =============================================================================================================
// Config dotenv
// =============================================================================================================
dotenv.config();

// =============================================================================================================
// Globals
// =============================================================================================================

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL || 'mongo-url';

// =============================================================================================================
// App
// =============================================================================================================
const app = express();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/shortlinks', shortlinkRoutes);
app.use('/r', redirectRoutes);

// =============================================================================================================
// Client Build
// =============================================================================================================

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const clientBuildFolder = path.resolve(
	__dirname,
	'../',
	'../',
	'client',
	'build'
);
const clientHTML = path.resolve(clientBuildFolder, 'index.html');
// console.log(clientBuildFolder);
// console.log(clientHTML);

app.use(express.static(clientBuildFolder));

app.get('*', (req, res) => {
	res.sendFile(clientHTML);
});

// =============================================================================================================
// Start
// =============================================================================================================

const startServer = async () => {
	try {
		mongoose.set('strictQuery', false);
		await mongoose.connect(MONGO_URL);
		app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
	} catch (error) {
		console.log(error);
	}
};

startServer();
