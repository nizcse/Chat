const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

const users = []; // Temporary storage for user data (replace with DB in production)

// Signup logic
exports.signup = async (req, res) => {
    const { username, password } = req?.body;
    if(username&&password){
        console.log(username, password, 'lol')
        const userExists = users.find(user => user.username === username);
        if(userExists){
            return res.status(400).send({ message: 'User already exists.' });
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            users.push({ username, password: hashedPassword });
            res.status(201).send({ message: 'User created successfully' });
        }
    }
    else{
        return res.status(400).send({ message: 'Could not get credentials' });
    }
};

// Login logic
exports.login = async (req, res) => {
    const { username, password } = req?.body;
    if(username&&password){
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
}
else{
    return res.status(400).send({ message: 'Could not get credentials' });
}
};

exports.authToken = async (req, res) => {
    const {authToken} = req?.body;
    if(authToken){
        try {
            const decoded = jwt.verifyToken(authToken);
            res.send({ message: 'Valid Token', user:decoded.username });
          } catch (err) {
            return res.status(400).send({ message: 'Invalid token' });
          }
    }
    else{
        return res.status(400).send({ message: 'Invalid or no token' });

    }
}