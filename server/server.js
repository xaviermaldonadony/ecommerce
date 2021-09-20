const { readdirSync } = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT;

// import routes

const app = express();

// db

mongoose.connection.once('open', () => {
	console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
	console.error(err);
});

const mongoConnect = async () => {
	await mongoose.connect(MONGO_URI, {});
};

//  middleware
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(cors());

// Routes middleware
readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));
// route

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

mongoConnect();
// 40
