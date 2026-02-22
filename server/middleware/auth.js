import jwt from "jsonwebtoken";


export default async function authenticate(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1]; //? Bearer token

        //? If token length is less than 500, it's a custom token, otherwise it's a Google token
        const isCustomAuth = token.length < 500;
        let decodedData;
        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, process.env.JWT_SECRET); //? Verify the token using the secret key
            req.userId = decodedData?.id;
        } else {
            //? For Google token, we can decode it without verifying since it's already verified by Google
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}