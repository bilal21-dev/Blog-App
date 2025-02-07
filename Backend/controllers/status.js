const User = require("../models/User")

async function handleUpdateStatus (req, res){
    const { userId, bio } = req.body;
    if (!userId || !bio) {
        return res.status(400).json({ message: 'User ID and bio are requiredddd' });
    }
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.status = bio;
        await user.save();

        res.status(200).json({ message: 'Bio updated successfully', bio: user.status });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
async function handleGetStatus(req, res) {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ bio: user.status || "No bio set yet" });
    } catch (error) {
        console.error('Error fetching status:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = {
    handleGetStatus,handleUpdateStatus
}