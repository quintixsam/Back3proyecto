import mongoose from "mongoose";

const adoptionSchema = new mongoose.Schema({
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
});

const AdoptionModel = mongoose.model("Adoption", adoptionSchema);
export default AdoptionModel;
