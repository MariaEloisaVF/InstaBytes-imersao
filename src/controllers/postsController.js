import { getTodosPosts, criarPost, atualizarPost} from "../models/postModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

//Função assíncrona para listar todos os posts
export async function listarPosts(req, res) {
    const posts = await getTodosPosts(); // Chama a função para obter os posts
    res.status(200).json(posts); // Envia os posts como resposta JSON com status 200 (OK)
}

//Função assíncrona para criar um novo post
export async function postarPost(req, res) {
    //Extrai os dados do novo post da requisição
    const novoPost = req.body;
    try{
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisicao"});
    }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post
export async function uploadImagem(req, res) {
    // Cria um novo objeto de post com a descrição da imagem e o nome do arquivo
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try{
        const postCriado = await criarPost(novoPost);
        // Renomeia o arquivo da imagem para incluir o ID do post criado
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisicao"});
    }
}


export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
    try{
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`)
        const descricao = await gerarDescricaoComGemini(imageBuffer)
        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const postCriado = await atualizarPost(id, postAtualizado);
        res.status(200).json(postCriado);
    } catch(erro) {
        console.error(erro.message);
        res.status(500).json({"Erro":"Falha na requisicao"});
    }
}