require('dotenv').config();

const mongoose = require('mongoose');

let mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
    mongoUri = 'mongodb://127.0.0.1:27017/mydb';
}

async function connectMongo() {
	if (!mongoUri) {
		throw new Error('MONGODB_URI is not defined in the .env file');
	}

	return mongoose.connect(mongoUri);
}