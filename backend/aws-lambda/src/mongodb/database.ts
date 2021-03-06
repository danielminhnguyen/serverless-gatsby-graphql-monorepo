import mongoose from "mongoose";
import { enviroment } from "../../enviroment";
import { KohaModel, TransactionsModel } from "./models";

let database: mongoose.Connection;

export const connect = () => {
  const uri = enviroment.mongoURL;

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
    TransactionsModel,
  };
};

export const disconnect = () => {
  if (!database) {
    return;
  }

  mongoose.disconnect();
};
