import { ApolloError } from "apollo-server-errors";
import mongoose from "mongoose";
import { IKoha, KohaModel } from "../mongodb/models";

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
  Mutation: {
    payToClub: async (
    parent: any, 
    { _id, Amount }: { _id: IKoha["_id"];Amount: IKoha["Amount"]}, 
    ):Promise<IKoha> => {
      let currentAmount: number;
      let deductAmount:number;
      let newAmount: number;
      if (Amount < 0) {
        deductAmount = 0;
      } else {
        deductAmount = Amount
      }
      console.log(deductAmount)
      try {
        const club: IKoha = await KohaModel.findById({_id}, async(err:Error, club:IKoha) => {
          if (err) {
            console.log("Cannot find the club by ID error", err);
            throw new ApolloError("Cannot find the club by ID");
          } else {
            const currentAmount = club.Amount
            if (Amount > currentAmount) {
              deductAmount = Amount
            }        
            newAmount = currentAmount - deductAmount
            // console.log(currentAmount)
            // console.log("deduct amount", deductAmount)
            await KohaModel.findByIdAndUpdate(_id, {Amount: newAmount})
          }
        })
        return club
      } catch (error) {
        console.log("Pay to club error: ", error);
        throw new ApolloError("Error Retreiving all clubs");
      }
    },
    addClub: async (
      parent: any, 
      { name }: { name: IKoha["name"]}, 
      ):Promise<IKoha> => {
        try {
          const newID = mongoose.Types.ObjectId()
          await KohaModel.create({name: name, Amount: 0, _id: newID})
          const club = await KohaModel.findById(newID)
          return club
        } catch (error) {
          console.log("Pay to club error: ", error);
          throw new ApolloError("Error Retreiving all clubs");
        }
      },
  },
};
