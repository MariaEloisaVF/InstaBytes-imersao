import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})
//Para Linux ou Mac
//const upload = multer({ dest: "./uploads"})

const routes = (app) => {
    // Habilita o parser JSON para lidar com requisições JSON
    app.use(express.json());
    app.use(cors(corsOptions))

    // Rota GET para obter todos os posts
    app.get('/posts', listarPosts);
    // Rota para criar um post
    app.post('/posts', postarPost);
    // Rota para fazer upload de uma imagem
    app.post('/upload', upload.single('imagem'), uploadImagem);
    app.put('/upload/:id', atualizarNovoPost);
}

export default routes;