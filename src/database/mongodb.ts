import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;
const options: mongoose.ConnectOptions = {};

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const dbConnect = async () => mongoose.connect(uri, options);

export default dbConnect;