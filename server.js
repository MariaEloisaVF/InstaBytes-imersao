import express from "express";

const posts = [
    {
        id: 1,
        descricao: 'Imagem teste',
        imagem: 'https://placecats.com/millie/300/150'
    },
    {
        id: 2,
        descricao: 'Gato brincando com um novelo de lã',
        imagem: 'https://placekitten.com/400/200'
    },
    {
        id: 3,
        descricao: 'Paisagem de um pôr do sol',
        imagem: 'https://picsum.photos/seed/picsum/200/300'
    },
    {
        id: 4,
        descricao: 'Cachorro correndo na praia',
        imagem: 'https://random.dog/woof.jpg'
    },
    {
        id: 5,
        descricao: 'Comida deliciosa',
        imagem: 'https://loremflickr.com/320/240/food'
    },
    {
        id: 6,
        descricao: 'Montanha nevosa',
        imagem: 'https://source.unsplash.com/random/300x200/?mountain,snow'
    }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log('Servidor escutando...');
});

app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

function buscarPostPorID(id){
    return posts.findIndex((post) => {
        return post.id === Number(id)
    })
}

app.get('/posts/:id', (req, res) => {
    const index = buscarPostPorID(req.params.id)
    res.status(200).json(posts[index]);
});