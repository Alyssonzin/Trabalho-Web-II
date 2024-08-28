const router = require('express').Router();
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/trabalho');

mongoose.connection.on('connected', () => {
    console.log('Conectado ao banco de dados');
});

mongoose.connection.on('error', (err) => {
    console.log('Erro ao conectar ao banco de ARTIGOS: ' + err);
});

const ArticlesSchema = new mongoose.Schema({
    kb_title: { type: String, required: true },
    kb_body: { type: String, required: true },
    kb_permalink: String,
    kb_keywords: String,
    kb_liked_count: { type: Number, default: 0 },
    kb_published: { type: Boolean, default: true },
    kb_suggestion: { type: Boolean, default: false },
    kb_featured: { type: Boolean, default: false },
    kb_author_email: { type: String, required: true },
    kb_published_date: { type: Date, default: Date.now }
});

const Article = mongoose.model('Article', ArticlesSchema);

//Insere um artigo no banco.
router.post('/', async (req, res) => {
    const { article } = req.body;

    try {
        const newArticle = await Article.create(article);
        console.log('Artigo criado com sucesso!');
        res.json(newArticle);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Retorna um artigo pelo id.
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const article = await Article.findById(id);
        console.log(article);
        res.status(200).json(article);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Retorna todos os artigos.
router.get('/', async (req, res) => {
    try {
        const data = await Article.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Deleta um artigo pelo id.
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const data = await Article.findByIdAndDelete(id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Atualiza um artigo pelo id.
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { article } = req.body;
    try {
        const articleAtualizado = await Article.findByIdAndUpdate(id, {
            kb_title: article.kb_title,
            kb_body: article.kb_body,
            kb_permalink: article.kb_permalink,
            kb_keywords: article.kb_keywords,
            kb_liked_count: article.kb_liked_count,
            kb_published: article.kb_published,
            kb_suggestion: article.kb_suggestion,
            kb_featured: article.kb_featured,
            kb_author_email: article.kb_author_email,
            kb_published_date: article.kb_published_date,
        }, { new: true });
        console.log('Artigo atualizado com sucesso!');
        res.status(200).json(articleAtualizado);

    } catch (error) {
        console.log('Erro ao atualizar o artigo: ' + error);
        res.status(500).json(error);
    }
});

module.exports = router;