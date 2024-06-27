import UserModel from '../../models/usersModel/usersModel.js';

export const getAllUsers = async (req, res) => {
    try {
        const {name}=req.query
        const users = await UserModel.find(name&&{name});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const createSingleUser = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        const createdUser = await user.save();
        res.json(createdUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

export const getSingleUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const updateSingleUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

export const deleteSingleUser = async (req, res) => {
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
