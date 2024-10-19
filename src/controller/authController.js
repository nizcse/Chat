const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

const users = []; // Temporary storage for user data (replace with DB in production)

// Signup logic
exports.signup = async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password, 'lol')
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.status(201).send({ message: 'User created successfully' });
};

// Login logic
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(user => user.username === username);

    if (!user) {
        return res.status(400).send({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send({ message: 'Invalid credentials' });
    }

    const token = jwt.generateToken({ username: user.username });
    res.send({ message: 'Login successful', token });
};
