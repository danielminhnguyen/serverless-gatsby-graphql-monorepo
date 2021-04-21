import dotenv from "dotenv";

dotenv.config();

type Enviroment = {
  mongoURL: string;
};

export const enviroment: Enviroment = {
  mongoURL: process.env.MONGO_URL as string,
};
