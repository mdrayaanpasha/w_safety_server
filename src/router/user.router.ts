// userRouter.ts

import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { UserController } from '../controllers/user.controller';

const userRouter = express.Router();

// Use memory storage (no disk writes)
const storage = multer.memoryStorage();
const upload = multer({ storage });

userRouter.post('/register', upload.single('image'), UserController.registerUser);

userRouter.post('/login', UserController.loginUser);
userRouter.post('/verify/:id', UserController.verifyUser);
userRouter.post('/reject/:id', UserController.rejectUser);

userRouter.post('/pending-verifications', UserController.getUsersPendingVerification);
userRouter.post('/activate', UserController.activateUser);
userRouter.post('/check-dispatch', UserController.checkAssignedComplaint);


export default userRouter;
