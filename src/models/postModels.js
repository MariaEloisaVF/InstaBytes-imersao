import conectarAoBanco from "../config/dbconfig.js";

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida pela variável de ambiente STRING_CONEXAO
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts da coleção "posts" no banco de dados "imersao-alura"
export async function getTodosPosts() {
    const db = conexao.db("imersao-alura"); // Seleciona o banco de dados
    const colecao = db.collection("posts"); // Seleciona a coleção de posts
    return colecao.find().toArray(); // Busca todos os documentos da coleção e retorna como um array
}

// Função assíncrona para inserir um novo post a coleção 'posts' no banco de dados
export async function criarPost(novoPost) {
    const db = conexao.db("imersao-alura");
    const colecao = db.collection("posts"); 
    return colecao.insertOne(novoPost)
}