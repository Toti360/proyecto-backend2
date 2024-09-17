import UserModel from "../models/user.model.js";

class UserDAO {
    async findUserByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async findUserById(id) {
        return await UserModel.findById(id);
    }

    async createUser(userData) {
        const user = new UserModel(userData);
        return await user.save();
    }

    async updateUser(id, updateData) {
        return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }
}

export default new UserDAO();
