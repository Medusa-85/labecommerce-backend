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
import { PRODUCT, TProduct, TPurchase } from "./types";

// CRIAÇÃO DO SERVIDOR EXPRESS
const app = express()

// CONFIGURAÇÃO QUE GARANTE AS RESPOSTAS SEMPRE NO FORMATO JSON
app.use(express.json());

// CONFIGURAÇÃO QUE HABILITA O CORS
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})
 //CRIAÇÃO DOS ENDPOINTS
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users);
})

app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products)
})

//GET products by id
app.get("/products/:id", (req: Request, res: Response) => {
    const searchProductById = req.query.q as string
    const result: TProduct[] = products.filter(
        (product) => product.id.toLowerCase().includes(searchProductById.toLowerCase())
    )
    res.status(200).send(result)
})

app.get("/purchases", (req: Request, res: Response) => {
    res.status(200).send(purchases);
})

//POST new user
app.post("/users", (req: Request, res: Response) => {
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password
    const newUser = {
        id,
        email,
        password
    }
    users.push(newUser)
    res.status(201).send({
        message: "Cadastro realizado com sucesso",
        user: newUser    
    })
})

//POST new product
app.post("/products", (req: Request, res: Response) => {
    const id = req.body.id 
    const name = req.body.name 
    const price = req.body.price 
    const category = req.body.category 
    const newProduct = {
        id,
        name,
        price,
        category
    }
    products.push(newProduct)
    res.status(201).send("Produto cadastrado com sucesso")
})

//POST new purchase
app.post("/purchases", (req: Request, res: Response) => {
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }
    purchases.push(newPurchase)
    res.status(201).send({
        message: "Compra realizada com sucesso",
        user: newPurchase    
    })
})

//GET User Purchases by User id
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    const purchaseByUserId = req.query.id as string
    const result = purchases.filter((purchase) => purchase.userId === purchaseByUserId)
    console.log(purchaseByUserId)
    res.status(200).send(result)
})

//DELETE user by id
app.delete("/users/:id", (req: Request, res: Response) => {
    const idToDel = req.params.id
    const userIndex = users.findIndex((user) => user.id === idToDel)

    if(userIndex) {
        users.splice(userIndex, 1)
    }

    res.status(200).send("Usuário excluído com sucesso")
}) 

//DELETE product by id
app.delete("/products/:id", (req: Request, res: Response) => {
    const idToDel = req.params.id
    const productIndex = products.findIndex((product) => product.id === idToDel)

    if(productIndex >= 0) {
        products.splice(productIndex, 1)
        
    }
    res.status(200).send("Produto excluído com sucesso")
    
}) 

//PUT user by id
app.put("/users/:id", (req: Request, res: Response) => {
    const idToEdit = req.params.id
    const newEmail = req.body.email
    const newPassword = req.body.password
    const user = users.find((user) => user.id === idToEdit)

    if(user) {
        user.email = newEmail
        user.password = newPassword
    }
    res.status(200).send("Cadastro alterado com sucesso")
    
})

//PUT product by id
app.put("/products/:id", (req: Request, res: Response) => {
    const idToEdit = req.params.id
    const newName = req.body.name
    const newPrice = req.body.price
    const newCategory = req.body.category
    const product = products.find((product) => product.id === idToEdit)

    if(product) {
        product.name = newName
        product.price = newPrice
        product.category = newCategory
    }
    res.status(200).send("Produto atualizad com sucesso")
    
})