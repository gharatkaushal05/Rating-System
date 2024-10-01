import mongoose, {Schema, Document} from 'mongoose';

export interface IUser extends Document {
    entryId : string,
    name: string   
}

const UserSchema = new Schema ({
    entryId : { type: String, required: true} ,
    name : { type: String, required: true}
})


const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User