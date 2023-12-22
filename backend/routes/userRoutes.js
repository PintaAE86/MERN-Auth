import express from "express";
import { authUser, 
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile 
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddlerWare.js";

const router = express.Router();


router.post('/', registerUser)
router.post('/auth', authUser);
router.post('/logout', logoutUser)
//for below you can create two separate get and post routes to '/profile'
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;