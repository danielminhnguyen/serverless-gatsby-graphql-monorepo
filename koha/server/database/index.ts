import mongoose from "mongoose";
import { enviroment } from "../enviroment";

// const uri: string = enviroment.mongoURL;

const uri: string =
  "mongodb+srv://gatsby:hBNWt650IxGpSDJI@cluster0.cqcjd.mongodb.net/gatsby?retryWrites=true&w=majority";

let conn: mongoose.Connection = null;

export const getConnection = async (): Promise<mongoose.Connection> => {
  if ((conn = null)) {
    conn = await mongoose
      .createConnection(uri, {
        // authSource: "admin",
        // user: "gatsby",
        // pass: "hBNWt650IxGpSDJI",
        // ssl: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log("Connected to database");
      })
      .catch(() => {
        conn = null;
        console.log("Error connecting to database");
      });
  }

  return conn;
};
