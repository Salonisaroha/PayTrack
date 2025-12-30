import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createSubscription, getUserSubscriptions, getSubscriptionDetails, getAllSubscriptions, updateSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, getAllSubscriptions);
subscriptionRouter.get('/:id', authorize, getSubscriptionDetails);
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.put('/:id', authorize, updateSubscription);
subscriptionRouter.delete('/:id', (req,res)=>res.send({
    title: 'Delete subscription'
}));
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);
subscriptionRouter.put('/:id/cancel', (req,res)=>res.send({
    title: 'Cancel subscription'
}));
subscriptionRouter.get('/upcoming-renewals', (req,res)=>res.send({
    title: 'Get upcoming renewals'
}));
export default subscriptionRouter;