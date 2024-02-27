const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const authMiddleware = require('./middleware/authMiddleware');
const authUtils = require('./middleware/authUtils');
const app = express();


app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Bienvenido a Eje01-tasks");
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'admin' && password === 'admin') {
        const token = authUtils.generateToken({ id: 1, username: username });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }

});

app.use(authMiddleware);

app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});