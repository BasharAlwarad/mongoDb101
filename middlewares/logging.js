import User from '../models/usersModel.js';

export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const isOwner = async (req, res, next) => {
  try {
    const loggedInUserId = req.session.user?.id;

    if (!loggedInUserId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(loggedInUserId);
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user._id.toString() !== loggedInUserId) {
      return res.status(403).json({
        message: 'Forbidden: You do not have permission to perform this action',
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Admins only' });
  }
};
