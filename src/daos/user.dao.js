import UserModel from "../models/user.model.js";

class UserDAO {
    async findUserByEmail(email) {
        return await UserModel.findOne({ email }).lean();
    }

    async findUserById(id) {
        return await UserModel.findById(id).lean();
    }

    async createUser(userData) {
        const newUser = new UserModel(userData);
        return await newUser.save();
    }

    async updateUser(id, updateData) {
        return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }
}

export default new UserDAO();
