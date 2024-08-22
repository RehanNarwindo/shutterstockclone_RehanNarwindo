import jwt from "jsonwebtoken";
const key = process.env.SECRET_KEY as string;
import * as jose from "jose";

export const signToken = (payload: { _id: string; email: string }) => {
  return jwt.sign(payload, key);
};

export const jwtVerify = (payload: string) => {
  return jwt.verify(payload, key);
};

export const verifyJose = async <T>(payload: string) => {
  const secretKey = new TextEncoder().encode(key);
  const paylaodJose = await jose.jwtVerify<T>(payload, secretKey);
  return paylaodJose.payload;
};
