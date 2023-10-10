// Mongoose Imports
import mongoose, { Document, Model, Schema } from 'mongoose';

// Create interfact for products
export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Create schema for products
const UserSchema: Schema<IUser> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> = mongoose.model<IUser>('user', UserSchema);

export default User;

// END OF FILE