import jwt from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { token } = req.body;
  const SECRET_KEY = process.env.JWT_SECRET;

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ valid: false, error: "Invalid token" });
  }
}
