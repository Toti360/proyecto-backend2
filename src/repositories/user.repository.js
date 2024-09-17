import UserDAO from "../daos/user.dao.js";
import UserDTO from "../dtos/user.dto.js";

class UserRepository {
    async getUserByEmail(email) {
        const user = await UserDAO.findUserByEmail(email);
        return new UserDTO(user);
    }

    async getUserById(id) {
        const user = await UserDAO.findUserById(id);
        return new UserDTO(user);
    }

    async createUser(userData) {
        const newUser = await UserDAO.createUser(userData);
        return new UserDTO(newUser);
    }

    async updateUser(id, updateData) {
        const updatedUser = await UserDAO.updateUser(id, updateData);
        return new UserDTO(updatedUser);
    }
}

export default new UserRepository();
