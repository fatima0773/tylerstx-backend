/* eslint-disable no-unused-vars */

// Enum for Response Code
export enum ResponseCode {
  SUCCESS = 200,
  CREATED_SUCCESSFULLY = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

// Enum for Auth Response Messages
export enum AuthResponseMessage {
  ERROR = 'Something went wrong, please try again',
  SIGNUP_SUCCESS = 'User registered successfully',
  SIGNUP_ERROR = 'Something went wrong while registering the user, please try again',
  USER_EXISTS = 'Email already in use, please try a new email or signin',
  USER_NOT_FOUND = 'The user does not exist. Please try with a different email or signup',
  OTP_SUCCESS = 'OTP code sent successfully',
  OTP_ERROR = 'Error sending OTP code, please try again',
  SIGNIN_SUCCESS = 'Signin successful',
  SIGNIN_ERROR = 'Error signing you in, please try again',
  INVALID_PASSWORD = 'The password is incorrect. Please try again or reset your account password',
  RESET_PASSWORD_SUCCESS = 'Password successfully reset',
  RESET_PASSWORD_ERROR = 'There was some error resetting your password. Please try again',
  NEW_PASSWORD_MISMATCH = 'New password can not be same as the old password',
  NO_TOKEN_FOUND = 'No authorized token found',
  NO_SECRET_KEY = 'Server Error: No secret key found',
  INVALID_TOKEN = 'Invalid token',
  OTP_MISMATCH = 'The otp you entered is incorrect, please try again',
}

// Enum for Product Response Messages
export enum ProductResponseMessage {
  PRODUCT_ADDED_SUCCESSFULLY = 'The product was added successfully',
  PRODUCT_ADDED_UNSUCCESSFUL = 'Error adding the product, please try again',
  PRODUCTS_FETCH_UNSUCCESSFUL = 'Error fetching the products, please try again',
  PRODUCT_REMOVE_UNSUCCESSFUL = 'Error deleting the product, please try again',
  PRODUCT_REMOVE_SUCCESSFUL = 'Product deleted successfully',
  PRODUCT_UPDATE_UNSUCCESSFUL = 'Error updating the product, please try again',
  PRODUCT_UPDATE_SUCCESSFUL = 'Product updated successfully',
  PRODUCT_NOT_FOUND = 'The product you entered does not exist',
  PRODUCT_SEARCH_SUCCESSFUL = 'Product search successful',
  PRODUCT_SEARCH_UNSUCCESSFUL = 'Error searching the product, please try again',
  CATEGORIES_SEARCH_SUCCESSFUL = 'Categories fetched successfully',
  CATEGORIES_SEARCH_UNSUCCESSFUL = 'Error fetching categories, please try again',
  REVIEW_ADDED_UNSUCCESSFUL = 'There was an error adding your product, please try again later',
  REVIEW_ADDED_SUCCESSFULLY = 'Your review was successfully added',
}

// Enum for Cart Response Messages
export enum CartResponseMessage {
  GET_CART_SUCCESSFUL = 'Cart successfully fetched',
  GET_CART_FAILED = 'There was some error displaying your cart, please try again',
  ADD_TO_CART_SUCCESSFUL = 'The product was added successfully',
  ADD_TO_CART_FAILED = 'Error adding the product, please try again',
  PRODUCT_NOT_FOUND = 'The product does not exist',
  CART_UPDATED_SUCCESSFULLY = 'Your cart was updated successfully',
  CART_UPDATED_UNSUCCESSFUL = 'Error updating the cart, please try again',
  CART_NOT_FOUND = 'Internal Error: Cart not found',
  REMOVE_ITEM_SUCCESSFUL = 'Item removed successfully',
  REMOVE_ITEM_FAILED = 'Error occured while removing the product. Please try again',
  CLEAR_CART_FAILED = 'Error while clearing the cart, please try again',
  CLEAR_CART_SUCCESSFUL = 'Cart cleared successfully'
}

// END OF FILE