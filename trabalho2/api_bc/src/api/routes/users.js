const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://127.0.0.1:27017/trabalho');

mongoose.connection.on('connected', () => {
    console.log('Conectado ao banco de dados');
});

mongoose.connection.on('error', (error) => {
    console.log('Erro ao conectar ao banco de USUARIOS: ' + error);
});

const UsersSchema = new mongoose.Schema({
    author_name: { type: String, required: true },
    author_email: { type: String, required: true },
    author_user: { type: String, required: true },
    author_pwd: { type: String, required: true },
    admin_status: { type: Boolean, default: false },
    author_status: { type: Boolean, default: true },
    author_create_date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UsersSchema);

//Posta um usuário no banco.
router.post('/', async (req, res) => {
    const user = req.body.user;

    //gera o hash da senha
    const salt = bcrypt.genSaltSync(10);
    user.author_pwd = bcrypt.hashSync(user.author_pwd, salt);

    try {
        const newUser = await User.create(user);
        console.log('Usuario salvo');
        res.json(newUser);
    } catch (err) {
        console.log('Erro ao salvar usuario');
        res.status(500).json(err);
    }
});

//Loga um usuário.
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ author_email: email });

        if (!user.author_status) {
            return res.status(401).json({ message: 'Usuário desativado!' });
        }
        else if (user && bcrypt.compareSync(password, user.author_pwd)) {
            user.author_pwd = undefined;
            return res.status(200).json({
                user,
                admin: user.admin_status == true,
            });
        }
        else {
            return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
        }

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Retorna um usuário pelo id.
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        data = await User.findById(id);
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Retorna todos os usuários.
router.get('/', async (req, res) => {
    try {
        const data = await User.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Atualiza um usuário pelo id.
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { user } = req.body;

    try {
        const data = await User.findByIdAndUpdate(id, {
            author_name: user.author_name,
            author_email: user.author_email,
            author_user: user.author_user,
            author_pwd: user.author_pwd,
            admin_status: user.admin_status,
            author_status: user.author_status,
        }, { new: true });
        console.log('Usuario atualizado');
        res.status(200).json(data);
    } catch (error) {
        console.log('Erro ao atualizar usuario');
        res.status(500).json(error);

    }
});

//Desativa um usuário pelo id.
router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const data = await User.findByIdAndUpdate(id, { author_status: false }, { new: true });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
        console.log('Erro ao desativar usuario: ' + err);
    }
});

module.exports = router;