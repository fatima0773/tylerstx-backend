// Express Imports
import { Request, Response } from 'express';

// API Response Enum Imports
import { ResponseCode } from '../../common/apiResponse';
import DeliveryDetails, { IDeliveryDetails } from '../../models/shippingInformation';
import Order, { IOrder } from '../../models/orders';

/**
 * Fetch user cart
 * @param { Request } request
 * @param { Response } response
 * @returns { Response } response
 */
export const getShippingDetails = async (request: Request, response: Response) => {
  try {
    const userId = request.params.userId;

    const shippingDetails = await DeliveryDetails.findOne({ userId });

    if (!shippingDetails) {
      return response.status(ResponseCode.NOT_FOUND).json({
        message: 'Shipping details not found.',
      });
    }

    return response.status(ResponseCode.SUCCESS).json({
      message: 'Shipping details retrieved successfully.',
      data: shippingDetails,
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Failed to retrieve shipping details.',
    });
  }
};

export const addShippingDetails = async (request: Request, response: Response) => {
  try {
    const shippingData: IDeliveryDetails = request.body; // Assuming the request body contains the shipping details

    // Check if shipping details already exist for the user
    const existingShippingDetails = await DeliveryDetails.findOne({ userId: shippingData.userId });

    if (existingShippingDetails) {
      // Update existing shipping details
      await DeliveryDetails.updateOne({ userId: shippingData.userId }, shippingData);
    } else {
      // Create new shipping details
      await DeliveryDetails.create(shippingData);
    }

    return response.status(ResponseCode.SUCCESS).json({
      message: 'Shipping details saved successfully.',
    });
  } catch (error) {
    return response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({
      message: 'Failed to save shipping details.',
    });
  }
};

export const processOrder = async (request: Request, response: Response) => {
  try {
    const { userId, amount, date, items } = request.body;

    // Check if the order already exists for the user
    const existingOrder = await Order.findOne({ userId });

    if (existingOrder) {
      // Add the new order items to the existing order
      existingOrder.orders.push({
        amount: amount,
        date: date,
        items: items,
      } as IOrder);
      await existingOrder.save();
      response.status(200).json(existingOrder);
    } else {
      // Create a new user order if it doesn't exist
      const newUserOrder = new Order({
        userId,
        orders: [
          {
            amount: amount,
            date: date,
            items: items,
          },
        ],
      });
      await newUserOrder.save();
      response.status(ResponseCode.CREATED_SUCCESSFULLY).json(newUserOrder);
    }
  } catch (error) {
    response.status(ResponseCode.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};
