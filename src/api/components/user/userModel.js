import mongoose from 'mongoose';
import db from '../../connections/dbConnection.js';

const userSchema = new mongoose.Schema({});

const user = db.model('User', userSchema);

export default user;
