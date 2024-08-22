import { hashPassword } from "../helpers/bycrypt";
// import { ObjectId } from "mongodb";
import database from "../mongodb";
import { z } from "zod";
import { use } from "react";

const UserSchema = z.object({
  name: z.string(),
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6),
});

type UserType = z.infer<typeof UserSchema>;

class User {
  static collection() {
    return database.collection("users");
  }
  static async getUserByUsername(username: string) {
    const user = await this.collection().findOne({
      username,
    });
    return user;
  }

  static async getUserByEmail(email: string) {
    const user = await this.collection().findOne({
      email,
    });
    return user;
  }

  static async create(payload: UserType) {
    const parseData = UserSchema.safeParse(payload);
    if (!parseData.success) {
      throw parseData.error;
    }
    payload.password = hashPassword(payload.password);
    await this.collection().insertOne(payload);
    return "success register";
  }
}

export default User;
