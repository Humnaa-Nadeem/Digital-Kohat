import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.DB_URL);
const db = client.db();
const Schools = db.collection(process.env.S_C); // School Collection: