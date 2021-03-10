import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "없는 아이디 입니다",
        };
      }

      const passwordOK = await bcrypt.compare(password, user.password);
      if (!passwordOK) {
        return {
          ok: false,
          error: "비번이 틀렸습니다",
        };
      }

      const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);

      return {
        ok: true,
        token,
      };
    },
  },
};
