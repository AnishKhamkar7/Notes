import bcrypt from "bcrypt";
import ErrorFactory from "../errors";

export const hashPassword = async (password: string): Promise<string> => {
  const hash = await bcrypt.hash(password, 10);

  if (!hash) {
    throw ErrorFactory.internalServerError(
      "Something went wrong during password hashing"
    );
  }
  return hash;
};

export const comparePassword = async ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hashedPassword);

  if (!isMatch) {
    throw ErrorFactory.forbiddenError("Invalid User Credentials");
  }

  return isMatch;
};
