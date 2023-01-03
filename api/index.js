const conn = require("./app");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

conn.listen(3000, () => console.log("SERVER OPEN IN PORT"));
