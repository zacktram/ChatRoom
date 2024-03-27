import User from "../models/user.model.js";

export const getUsersForSiderbar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const allUsersExceptCurrent = await User.find({ _id: { $ne: loggedInUserId }}).select("-password");

        res.status(200).json(allUsersExceptCurrent);

    } catch (error) {
        console.log(`Error in getUsersForSiderbar Controller: ${error.message}`);
        res.status(500).json("Internal Server Error");
    }
}