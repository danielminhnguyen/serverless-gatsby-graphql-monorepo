type Enviroment = {
  mongoURL: string;
  mongoUSER: string;
  mongoPASSWORD: string;
};

export const enviroment: Enviroment = {
  mongoURL: process.env.MONGO_URL as string,
  mongoUSER: process.env.MONGO_USER as string,
  mongoPASSWORD: process.env.MONGO_PASSWORD as string,
};
