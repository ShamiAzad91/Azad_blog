import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: "Please add the token" });
  }

  // Token format: "Bearer <token>"
  token = token.split(' ')[1];

  // console.log("Middleware called, token:", token);

   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Please provide a valid token" });
      }

      req.user = decoded;
      next();
    });
};

export default verifyToken;
