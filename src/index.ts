import { 
    users,
    products, 
    purchases, 
    } from "./database";
import express, {Request, Response}  from "express";
import cors from "cors";
import { TProduct, TUser } from "./types";
import { db } from "./database/knex";
import { resourceLimits } from "worker_threads";

// CRIAÇÃO DO SERVIDOR EXPRESS
const app = express()

// CONFIGURAÇÃO QUE GARANTE AS RESPOSTAS SEMPRE NO FORMATO JSON
app.use(express.json());

// CONFIGURAÇÃO QUE HABILITA O CORS
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

//REFATORAÇÃO DOS ENDPOINTS COM IMPLEMENTAÇÃO DO BLOCO TRY/CATCH PARA CENTRALIZAÇÃO E MANIPULAÇÃO DOS ERROS 
app.get("/users", async (req: Request, res: Response) => {
    try{
        const result = await db("users")
        res.status(200).send(result)
    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }
    
})

app.get("/products", async (req: Request, res: Response) => {
    try{
        const result = await db("products")
        res.status(200).send(result)
    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }
})

//GET products by name
app.get("/products/:name", async (req: Request, res: Response) => {
    try{
        const searchProduct = req.query.q as string
        
        if(searchProduct === undefined){
            const result = await db("products")
            console.log(result)
            res.status(200).send(result)
        } else {
            const result = await db("products").where("name", "LIKE", `%${searchProduct}%`)
            res.status(200).send(result)
        }
    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }   
})

//POST new user
app.post("/users", async (req: Request, res: Response) => {
    try{
        const {id, email, password} = req.body

        if (typeof id !== "string"){
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof email !== "string"){
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string"){
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
			throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
		}

        const [idAlreadyExists]: TUser[] = await db("users").where({ id })

        if (idAlreadyExists){
            res.status(400)
            throw new Error("'id' já existe")
        }


        const [emailAlreadyExists]: TUser[] = await db("users").where({ email }) 
        if (emailAlreadyExists){
            res.status(400)
            throw new Error("'email' já existe")
        }

        const newUser: TUser = {
            id,
            email,
            password
        }

        await db("users").insert(newUser)
        res.status(201).send({ 
            message: "Usuário cadastrado com sucesso", 
            user: newUser
        })

    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }
    
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
    res.status(200).send("Produto atualizado com sucesso")
    
})