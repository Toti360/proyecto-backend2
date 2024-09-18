import UserDAO from "../daos/user.dao.js";
import UserDTO from "../dtos/user.dto.js";

class UserRepository {
    async getUserByEmail(email, includePassword = false) {
        const user = await UserDAO.findUserByEmail(email);
        if (!user) return null;
        return includePassword ? user : new UserDTO(user);
    }

    async getUserById(id) {
        const user = await UserDAO.findUserById(id);
        return user ? new UserDTO(user) : null;
    }

    async createUser(userData) {
        const newUser = await UserDAO.createUser(userData);
        return new UserDTO(newUser);
    }

    async updateUser(id, updateData) {
        const updatedUser = await UserDAO.updateUser(id, updateData);
        return updatedUser ? new UserDTO(updatedUser) : null;
    }
}

export default new UserRepository();
