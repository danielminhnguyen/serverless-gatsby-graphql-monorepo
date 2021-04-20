import { ApolloError } from "apollo-server-errors";
import mongoose from "mongoose";
import KohaModel, { IKoha } from "../../database/models/koha";
import ClubModel from "../../database/models/clubs";

export default {
  Query: {
    kohaclub: async (
      parent: any,
      args: any,
      { dbConn }: { dbConn: mongoose.Connection }
    ): Promise<IKoha[]> => {
      try {
        return await KohaModel.find();
      } catch (error) {
        console.log("Query all clubs error: ", error);
        throw new ApolloError("Error Retreiving all clubs");
      }
    },
  },
};
