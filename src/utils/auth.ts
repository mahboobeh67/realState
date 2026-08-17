import { hash, compare } from "bcryptjs";
async function hashPassword(password:string) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}
async function verifyPassword(password:string, hashPassword:string) {
  const isValid = await compare(password, hashPassword);
  return isValid;
}

export { hashPassword, verifyPassword };
