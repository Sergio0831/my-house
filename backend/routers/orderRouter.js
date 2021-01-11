import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel";
import { isAuth } from "../utils";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      orderItems: req.body.orderItems,
      user: req.user._id,
      shipping: req.body.shipping,
      payment: req.body.payment,
      itemsPrice: req.body.itemsPrice,
      taxtPrice: req.body.taxtPrice,
      shippingPrice: req.body.shippingPrice,
      totlaPrice: req.body.totlaPrice,
    });
    const createOrder = await order.save();
    res.status(201).send({ message: "Nem order created", order: createOrder });
  })
);

export default orderRouter;
