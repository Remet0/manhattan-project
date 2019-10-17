import { Schema, SchemaTypes as Types, Model, model, Document } from 'mongoose';
import { IUser } from '../interfaces/IUser';

// Create interface for User documents
export interface IUserDocument extends IUser, Document {
    // TODO - define user document methods
}

// Create interface for User model
export interface IUserModel extends Model<IUserDocument> {
    // TODO - define user model methods
}

const userSchema = new Schema({
    username: {
        type: Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Types.String,
        required: true
    },
    name: Types.String,
    age: Types.Number,
    bio: Types.String,
    follows: {
        type: [Types.ObjectId],
        ref: 'User'
    },
    followers: {
        type: [Types.ObjectId],
        ref: 'User'
    }
});

export const User = model<IUserDocument, IUserModel>('User', userSchema);