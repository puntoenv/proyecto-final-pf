const Pet = require("./src/models/Pet");
const conn = require("./app");
const mongoose = require("mongoose");

const { PORT, MONGOPASSWORD, MONGOHOST, MONGOPORT, MONGOUSER } = process.env;
const uri = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}`;

mongoose.set("strictQuery", true);
const db = mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("db connected"))
  .catch((e) => console.log(e));
Pet.ensureIndexes({ createdAt: 1 }, { expireAfterSeconds: 120 });

conn.listen(PORT || 3001, () => console.log("SERVER OPEN IN PORT"));
