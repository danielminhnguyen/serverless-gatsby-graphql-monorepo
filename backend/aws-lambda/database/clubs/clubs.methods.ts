import { Document } from "mongoose";
import { IClubDocument } from "./clubs.types";

export async function setLastUpdated(this: IClubDocument): Promise<void> {
  const now = new Date();
  if (!this.lastUpdated || this.lastUpdated < now) {
    this.lastUpdated = now;
    await this.save();
  }
}
export async function sameLastName(this: IClubDocument): Promise<Document[]> {
  return this.model("user").find({ lastName: this.lastName });
}
