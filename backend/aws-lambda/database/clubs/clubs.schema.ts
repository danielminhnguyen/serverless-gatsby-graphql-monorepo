import * as Mongoose from "mongoose";
// import { findOneOrCreate, findByAge } from "./users.statics";
import { setLastUpdated, sameLastName } from "./users.methods";

const ClubSchema = new Mongoose.Schema({
  _id: { type: Mongoose.SchemaTypes.ObjectId, required: true },
  name: { type: Mongoose.SchemaTypes.String, required: true },
  Amount: { type: Mongoose.SchemaTypes.Number, required: true },
});

// ClubSchema.statics.findOneOrCreate = findOneOrCreate;
// ClubSchema.statics.findByAge = findByAge;

ClubSchema.methods.setLastUpdated = setLastUpdated;
ClubSchema.methods.sameLastName = sameLastName;

export default ClubSchema;
