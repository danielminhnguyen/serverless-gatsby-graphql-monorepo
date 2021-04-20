import mongoose from "mongoose";
import KohaModel from "./models/koha";

let database: mongoose.Connection;

export const connect = () => {
  const uri =
    "mongodb+srv://gatsby:hBNWt650IxGpSDJI@cluster0.cqcjd.mongodb.net/gatsby?retryWrites=true&w=majority";

  if (database) {
    return;
  }

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  database = mongoose.connection;

  database.once("open", async () => {
    console.log("Connected to database");
  });

  database.on("error", () => {
    console.log("Error connecting to database");
  });

  return {
    KohaModel,
  };
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  mongoose.disconnect();
};
