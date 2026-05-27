import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "bc_market_secret_key_2026";

export const generateToken = (userId: string) => {
 return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
 return jwt.verify(token, JWT_SECRET);
};
