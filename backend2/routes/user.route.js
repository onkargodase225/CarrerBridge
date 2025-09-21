
import express from "express";
import { login, logout, register, updateProfile, viewResume, viewApplicantResume } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";
const router=express.Router();

router.route("/register").post(singleUpload,register); //// "http://localhost:8000/api/v1/user/register"; agar request me /resgister hoga to register pe leke jao
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/resume/view").get(isAuthenticated, viewResume);
router.route("/applicant/:applicantId/resume/view").get(isAuthenticated, viewApplicantResume);

export default router;