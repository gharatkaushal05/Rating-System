import mongoose, {Schema, Document} from "mongoose";


export interface IRating extends Document {
    roadmapId : mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    rating: number;
    createdAt : Date;

}


const RatingSchema = new Schema ({
    roadmapId: {type: Schema.Types.ObjectId, ref: 'Roadmap', required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    rating: {type: Number, required: true },
    createdAt: {type: Date, default: Date.now},
})

RatingSchema.index({roadmapId: 1, userId: 1}, {unique: true} );

const Rating = mongoose.models.Rating || mongoose.model<IRating>('Rating', RatingSchema);
export default Rating