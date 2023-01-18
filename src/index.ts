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
