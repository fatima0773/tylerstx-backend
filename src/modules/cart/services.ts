// Express Imports
import { Request, Response } from 'express';

// Model Imports
import CartModel, { ICartItem } from '../../models/cart';
import ProductModel from '../../models/product';
import { CartResponseMessage, ResponseCode } from '../../common/apiResponse';

export const getCartService = async (request: Request, response: Response) => {
  try {
    const userId = request.params.userId;

    // Find the user's cart based on userId
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: CartResponseMessage.CART_NOT_FOUND,
      });
    }

    return response.status(ResponseCode.SUCCESS).json({
      message: CartResponseMessage.GET_CART_SUCCESSFUL,
      data: cart,
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: CartResponseMessage.GET_CART_FAILED,
    });
  }
};

export const addToCartService = async (request: Request, response: Response) => {
  try {
    const { userId, items } = request.body;
    const cart = await CartModel.findOne({ userId });
    let totalAmount = cart ? cart.totalAmount : 0;
    const cartItems: ICartItem[] = cart ? cart.items : [];

    for (const item of items) {
      const existingCartItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.productId === item.productId
      );

      if (existingCartItemIndex !== -1) {
        // If product already exists, update its quantity and totalAmount
        totalAmount -= cartItems[existingCartItemIndex].price * cartItems[existingCartItemIndex].quantity;
        cartItems[existingCartItemIndex].quantity = item.quantity;
      } else {
        // If product doesn't exist, add it to cartItems
        // eslint-disable-next-line no-await-in-loop
        const product = await ProductModel.findById(item.productId);

        if (!product) {
          return response.status(ResponseCode.NOT_FOUND).json({
            message: CartResponseMessage.PRODUCT_NOT_FOUND,
          });
        }

        cartItems.push({
          productId: item.productId,
          productName: item.productName,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        });
      }

      // Update totalAmount with the updated/added item
      totalAmount += item.price * item.quantity;
    }

    const updatedCart = await CartModel.findOneAndUpdate(
      { userId },
      {
        userId,
        items: cartItems,
        totalAmount,
      },
      { upsert: true, new: true }
    );

    return response.status(ResponseCode.SUCCESS).json({
      message: CartResponseMessage.ADD_TO_CART_SUCCESSFUL,
      cart: updatedCart,
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: CartResponseMessage.ADD_TO_CART_FAILED,
    });
  }
};

export const updateCartService = async (request: Request, response: Response) => {
  try {
    const userId = request.params.id;
    const { productId, productName, price, quantity, image } = request.body;

    // Fetch the user's cart from the database
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: CartResponseMessage.CART_NOT_FOUND,
      });
    }

    // Check if the product already exists in the cart
    const existingCartItem = cart.items.find(item => item.productId === productId);

    if (existingCartItem) {
      // Update the existing item's quantity and total amount
      cart.totalAmount -= existingCartItem.price * existingCartItem.quantity;
      existingCartItem.quantity = quantity;
      cart.totalAmount += price * quantity;
    } else {
      // Add the new item to the cart items array
      cart.items.push({
        productId,
        productName,
        price,
        quantity,
        image
      });
      cart.totalAmount += price * quantity;
    }

    // Save the updated cart
    await cart.save();

    return response.status(ResponseCode.SUCCESS).json({
      message: CartResponseMessage.ADD_TO_CART_SUCCESSFUL,
      cart,
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: CartResponseMessage.ADD_TO_CART_FAILED,
    });
  }
};

export const removeItemFromCartService = async (request: Request, response: Response) => {
  try {
    const userId = request.params.userId;
    const productId = request.params.productId;

    // Find the cart associated with the userId
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: CartResponseMessage.CART_NOT_FOUND,
      });
    }

    // Find the index of the item to be removed in the cart's items array
    const itemIndex = cart.items.findIndex(item => item.productId === productId);

    if (itemIndex === -1) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: CartResponseMessage.PRODUCT_NOT_FOUND,
      });
    }

    // Get the price and quantity of the item to be removed
    const itemPrice = cart.items[itemIndex].price;
    const itemQuantity = cart.items[itemIndex].quantity;

    // Remove the item from the items array
    cart.items.splice(itemIndex, 1);

    // Update the totalAmount in the cart
    cart.totalAmount -= itemPrice * itemQuantity;

    // Save the updated cart
    await cart.save();

    return response.status(ResponseCode.SUCCESS).json({
      message: CartResponseMessage.REMOVE_ITEM_SUCCESSFUL,
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: CartResponseMessage.REMOVE_ITEM_FAILED,
    });
  }
};

export const clearCartService = async (request: Request, response: Response) => {
  try {
    const userId = request.params.userId;

    // Find the user's cart
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: CartResponseMessage.CART_NOT_FOUND,
      });
    }

    // Clear the items in the cart
    cart.items = [];
    cart.totalAmount = 0;

    // Save the updated cart
    await cart.save();

    return response.status(ResponseCode.SUCCESS).json({
      message: CartResponseMessage.CLEAR_CART_SUCCESSFUL,
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: CartResponseMessage.CLEAR_CART_FAILED,
    });
  }
};