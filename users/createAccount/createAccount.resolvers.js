import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (
      _,
      { firstName, lastName, username, email, password }
    ) => {
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });

        if (existingUser) {
          throw new Error("이미 있는 아이디 , 이메일 입니다");
        }

        console.log(existingUser);

        const uglyPassword = await bcrypt.hash(password, 10);
        return client.user.create({
          data: {
            firstName,
            lastName,
            username,
            email,
            password: uglyPassword,
          },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
