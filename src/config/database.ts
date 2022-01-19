import mongoose from "mongoose";

const mongooseConnectionDB = (uri: string) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  let db = mongoose.connection;
  db.on("error", (err) => console.log("connection error:", err));
  db.once("open", () => console.log("Database Ready"));
};

export default mongooseConnectionDB;
