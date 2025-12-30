import { SERVER_URL } from "../config/env.js";
import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js"
export const createSubscription = async (req,res,next) =>{
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
        const {workflowRunId} = await workflowClient.trigger({
           url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
           body:{
            subscriptionId: subscription.id
           },
           headers:{
            'content-type': 'application/json',
           },
           retries: 0,
        })
        res.status(201).json({
            success:true,
            data:subscription,
            workflowRunId
        })
    } catch(e){
        next(e);
    }
}
export const getUserSubscriptions = async(req, res, next) =>{
        try{
            if(req.user.id != req.params.id){
                const error = new Error('You are not the Owner of this account');
                throw error;
            }
             const subscriptions = await Subscription.find({user:req.params.id});
             res.status(200).json({
                success:true,
                data: subscriptions
             });
        } catch(e){
            next(e);
        }
  }
export const getSubscriptionDetails = async(req,res,next)=>{
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success:true,
            data: subscription
        });
    } catch(e){
        next(e);
    }
}
export const getAllSubscriptions = async(req,res, next)=>{
    try{
        const subscriptions = await Subscription.find();
        res.status(200).json({
            succcess:true,
            data: subscriptions
        });
    } catch(e){
        next(e);
    }
}
export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (e) {
    next(e);
  }
};
export const cancelSubscription = async(req,res,next)=>{
    try{
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription){
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
        subscription.status = 'canceled';
        await subscription.save();
        res.status(200).json({
            success:true,
            data:subscription
        });
    } catch(e){
        next(e);
    }
}



