// Mongoose Imports
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IOrderedItem extends Document {
  productId: string;
  quantity: number;
}

// Create interface for ordered items
export interface IOrder extends Document {
  amount: string;
  date: string;
  items: IOrderedItem[];
}

export interface IUserOrder extends Document {
  userId: string;
  orders: IOrder[];
}

export const OrderedItemSchema: Schema<IOrderedItem> = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
});

// Create schema for ordered items
const OrderSchema: Schema<IOrder> = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  items: [OrderedItemSchema]
});

// Create schema for all orders of a user
const UserOrderSchema: Schema<IUserOrder> = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  orders: [OrderSchema]
});

const Order: Model<IUserOrder> = mongoose.model<IUserOrder>('orders', UserOrderSchema);

export default Order;