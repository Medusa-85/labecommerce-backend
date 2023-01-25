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
    import { TProduct, TPurchase, TUser } from "./types";

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
    const nameProduct = req.query.name as string
    const filtro = products.filter((product) => product.name.includes(nameProduct) )
    res.status(200).send(filtro)
})

app.post("/users", (req: Request, res: Response) => {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password
    const newUser: TUser = {id,email,password}
    users.push(newUser)
    res.status(201).send("Usuário cadastrado com sucesso.")
})

app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id
    const name = req.body.name as string
    const price = req.body.price
    const category = req.body.category
    const newProduct: TProduct = {id, name, price, category}
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso.")
})

app.post("/purchases", (req: Request, res: Response) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice
    const newPurchase: TPurchase = {userId, productId, quantity, totalPrice}
    purchases.push(newPurchase)
    res.status(201).send("Compra realizada com sucesso.")
})