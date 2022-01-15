import mongoose from "mongoose";

const mongooseConnectionDB = (uri: string) => {
  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    // we're connected!
    console.log("Connected to DB");
  });
};

export default mongooseConnectionDB;
