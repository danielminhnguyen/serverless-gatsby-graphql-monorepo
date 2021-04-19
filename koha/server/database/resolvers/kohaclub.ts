import { ApolloError } from "apollo-server-errors";
import mongoose from "mongoose";
import Koha, { IKoha } from "../../database/models/koha";

export default {
  Query: {
    kohaclub: async (
      parent: any,
      args: any,
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<IKoha[]> => {
      // const Koha: mongoose.Model<IKoha> = KohaModel(dbConn);

      let list: IKoha[];

      try {
        list = await Koha.find().exec();
      } catch (error) {
        console.error("> getAllClubs error: ", error);

        throw new ApolloError("Error retrieving all koha clubs");
      }

      return list;
    },
  },
};
