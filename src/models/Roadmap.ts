import mongoose, {Schema, Document} from "mongoose";

export interface IRoadmap extends Document {
    entryId: string;   // cs entry uid
}


const RoadmapSchema = new Schema ({
    entryId : {type: String, required: true}
})


const Roadmap = mongoose.models.Roadmap || mongoose.model<IRoadmap>('Roadmap', RoadmapSchema);
export default Roadmap;