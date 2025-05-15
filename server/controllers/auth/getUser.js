const User = require('../../models/User');


const getUser = async (req, res) => {
    try {
        const { spotifyId } = req.cookies;
        if (!spotifyId) {
            return res.status(401).json({ message: 'No spotifyId cookie found' });
        }

        const user = await User.findOne({ spotifyId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = getUser;