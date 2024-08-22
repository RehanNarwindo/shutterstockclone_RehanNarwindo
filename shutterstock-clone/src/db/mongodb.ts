const uri = process.env.MONGGO_DB_URI as string;
import { MongoClient, ServerApiVersion } from "mongodb";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("shutterstock_clone");
export default database;
