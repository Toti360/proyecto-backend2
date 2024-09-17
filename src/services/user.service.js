import UserRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";

class UserService {
    async registerUser(userData) {
        const { first_name, last_name, email, password, age, role, cart_id } = userData;

        const hashedPassword = createHash(password);
        const newUser = { first_name, last_name, email, password: hashedPassword, age, role, cart_id };

        return await UserRepository.createUser(newUser);
    }

    async loginUser(email, password) {
        const user = await UserRepository.getUserByEmail(email);

        if (!user) throw new Error("Usuario no encontrado");

        if (!isValidPassword(password, user)) throw new Error("Contraseña incorrecta");

        return user;
    }

    async getUserByEmail(email) {
        return await UserRepository.getUserByEmail(email);
    }
}

export default new UserService();
