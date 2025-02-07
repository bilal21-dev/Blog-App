const User = require("../models/User")
async function handleImageUpload(req, res)  {
    try {
        const userId = req.params.userId;
        const filePath = req.file.path;

        // Update user profile picture in the database
        const user = await User.findByIdAndUpdate(userId, { profilePic: filePath }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile picture updated', filePath });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}


async function HandleGetImage(req, res){
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User retrieved successfully',
            user: {
                profilePic: user.profilePic, // Path to profile picture
            },
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    handleImageUpload,HandleGetImage
}