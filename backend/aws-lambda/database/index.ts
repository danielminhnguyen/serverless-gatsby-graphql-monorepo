import mongoose from "mongoose";
import { enviroment } from "../enviroment";

// const uri: string = enviroment.mongoURL;

const uri: string =
  "mongodb+srv://gatsby:hBNWt650IxGpSDJI@cluster0.cqcjd.mongodb.net/gatsby?retryWrites=true&w=majority";

let conn: mongoose.Connection = null;

export const getConnection = async (): Promise<mongoose.Connection> => {
  if ((conn = null)) {
    try {
      conn: mongoose.Connection = await mongoose.connect(uri, {
        bufferCommands: false,
        bufferMaxEntries: 0,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      });
      console.log("Connect to MongoDB Successful");
      require("../database/models/clubs");
    } catch (err) {
      console.log(err);
    }
  }

  return conn;
};
