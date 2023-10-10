// Mongoose Imports
import mongoose, { Document, Model, Schema } from 'mongoose';

// Cart Item Schema Interface
export interface ICartItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string
}

// Cart Schema Interface
export interface ICart extends Document {
  userId: string;
  items: ICartItem[];
  totalAmount: number;
}

// Cart Item Schema
export const CartItemSchema: Schema<ICartItem> = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  image: {
    type: String,
    required: true
  }
});

// Cart Schema
const CartSchema: Schema<ICart> = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [CartItemSchema],
  totalAmount: {
    type: Number,
    required: true,
  },
});

const Cart: Model<ICart> = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
