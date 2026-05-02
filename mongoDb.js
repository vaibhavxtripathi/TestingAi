require('dotenv').config();

const mongoose = require('mongoose');

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mydb';

async function connectMongo() {
	if (!mongoUri) {
		throw new Error('MONGODB_URI is not defined in the .env file');
	}

	return mongoose.connect(mongoUri);
}

module.exports = { connectMongo, mongoose };