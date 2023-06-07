import { Db, MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_NAME;
const options = {};

if (!uri) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

let client;
let clientPromise: Promise<MongoClient>;
let db: Db;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>
  };
  
  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export const initCollection = async (collectionName: string) => {
  if (db) {
    return;
  }

  try {
    client = await clientPromise;
    db = await client.db(databaseName);
    const collection = await db.collection(collectionName);

    return collection;
  } catch (e) {
    throw new Error('Failed to stablish connection to database');
  }
};

export default clientPromise;