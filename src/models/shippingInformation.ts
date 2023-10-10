// Mongoose Imports
import mongoose, { Document, Model, Schema } from 'mongoose';

// Create interfact for user checkout information
export interface IDeliveryDetails extends Document {
  userId: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  country: string;
  city: string;
  zip: string;
  state: string;
}

// Create schema for user checkout information
const DeliveryDetailSchema: Schema<IDeliveryDetails> = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
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
  companyName: {
    type: String,
    required: false,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: false,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

const DeliveryDetails: Model<IDeliveryDetails> = mongoose.model<IDeliveryDetails>('deliveryDetails', DeliveryDetailSchema);

export default DeliveryDetails;

// END OF FILE