import { Router } from "express";
import {removeFromFavourite, addToFavourite, getFavourites} from '../controllers/User.controller.js'

const userRouter = Router();

userRouter.route("/favourites").get(getFavourites);
userRouter.route("/add").post(addToFavourite);
userRouter.route("/remove").put(removeFromFavourite);

export {userRouter};