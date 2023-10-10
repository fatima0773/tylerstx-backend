// Mongoose Imports
import mongoose, { Document, Model, Schema } from 'mongoose';

// Price Schema Interface
interface IPrice {
  price: number;
  currency: string;
  discountPercentage: number;
  discountedPrice: number;
}

// Brand Schema Interface
interface IBrand {
  id: string;
  name: string;
}

// Variant Schema Interface
export interface IVariant {
  value: string;
  variantName: string;
  description: string;
  price: IPrice;
  stock: number;
  image: string[];
}

// Review Schema Interface
export interface IReview {
  rating: number;
  comment: string;
  userId: string;
}

// Product Schema Interface
export interface IProduct extends Document {
  name: string;
  brand: IBrand;
  category: string[];
  reviews: IReview[];
  variants: IVariant[];
  averageRating: number;
  tags: string[];
}

// Price Schema
const PriceSchema: Schema<IPrice> = new mongoose.Schema({
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  discountPercentage: {
    type: Number,
    required: false
  },
  discountedPrice: {
    type: Number,
    required: false
  }
});

// Price Schema
const BrandSchema: Schema<IBrand> = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String
  },
});

// Variant Schemaco
const VariantSchema: Schema<IVariant> = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  variantName: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  price: PriceSchema,
  stock: {
    type: Number,
    required: true
  },
  image: [String]
});

// Review Schema
const ReviewSchema: Schema<IReview> = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
    min:0,
    max: 5
  }
});

// Create schema for products
const ProductSchema: Schema<IProduct> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: BrandSchema,
  category: {
    type: [String],
    required: true,
  },
  reviews: [ReviewSchema],
  variants: [VariantSchema],
  averageRating: {
    type: Number,
    required: false,
  },
  tags: {
    type: [String],
  }
});

const Product: Model<IProduct> = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

// END OF FILE