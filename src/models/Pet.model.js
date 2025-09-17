import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  adopted: { type: Boolean, default: false }
});

const PetModel = mongoose.model("Pet", petSchema);
export default PetModel;
