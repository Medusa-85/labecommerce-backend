import { 
    users,
    products, 
    purchases, 
    createNewUser, 
    getUsers, 
    getAllProducts, 
    getProductById, 
    getProductByName, 
    getPurchaseByUserId} from "./database";
    import express, {Request, Response}  from "express";
    import cors from "cors";

// CRIAÇÃO DO SERVIDOR EXPRESS
const app = express()

// CONFIGURAÇÃO QUE GARANTE AS RESPOSTAS SEMPRE NO FORMATO JSON
app.use(express.json());

// CONFIGURAÇÃO QUE HABILITA O CORS
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users);
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

app.get("/products/search", (req: Request, res: Response) => {
    const q = req.query.q
    res.status(200).send(getProductByName("Caminha"))
})

app.post("/users", (req: Request, res: Response) => {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password
    res.status(201).send("Cadastro realizado com sucesso")
})

app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category
    res.status(201).send("Produto cadastrado com sucesso")
})

app.post("/purchases", (req: Request, res: Response) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice
    res.status(201).send("Compra realizada com sucesso")
})

