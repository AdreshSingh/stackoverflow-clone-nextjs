import User from "../models/User.js";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = User.findOne({ email });
        if (existingUser) {
            return res.status(404).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = User.create({ username, email, password: hashedPassword });

        return res.status(201).json({ data: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const hashedPassword = await bcrypt.compare(password, existingUser.password);
        if (!hashedPassword) {
            return res.status(404).json({ message: "Invalid credentials( pwd)" });
        }

        return res.status(201).json({ data: existingUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
}