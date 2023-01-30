import { 
    users,
    products, 
    purchases, 
    } from "./database";
import express, {Request, Response}  from "express";
import cors from "cors";
import { TProduct, TUser, TPurchase, PRODUCT } from "./types";
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

//REFATORAÇÃO DOS ENDPOINTS COM IMPLEMENTAÇÃO DA COMUNICAÇÃO ENTRE SERVIDOR E BANCO DE DADOS
//GET all users
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

//GET all products
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

//GET all purchases
app.get("/purchases", async (req: Request, res: Response) => {
    try{
        const result = await db("purchases")
        res.status(200).send(result)
    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }
})

//GET products by name
app.get("/products/search", async (req: Request, res: Response) => {
    try{
        const searchProduct = req.query.q as string
                
        if(searchProduct === undefined){
            const result = await db("products")
            console.log(result)
            res.status(200).send(result)
        } else {
            const result = await db("products").where("name", "LIKE", `%${searchProduct}%`)
            console.log(result)
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
        const {id, name, email, password} = req.body

        if (typeof id !== "string"){
            res.status(400)
            throw new Error("'id' deve ser string")
        }

        if (typeof email !== "string"){
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof name !== "string"){
            res.status(400)
            throw new Error("'name' deve ser string")
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
            name,
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
app.post("/products", async (req: Request, res: Response) => {
    
    try{
        const {id, name, price, description, imageURL} = req.body

        if (typeof id !== "string"){
            res.status(400)
            throw new Error("'id' deve ser string")
        }
        if (typeof name !== "string"){
            res.status(400)
            throw new Error("'name' deve ser string")
        }
        if (typeof price !== "number"){
            res.status(400)
            throw new Error("'price' deve ser number")
        }
        if (typeof description !== "string"){
            res.status(400)
            throw new Error("'description' deve ser string")
        }
        if (typeof imageURL !== "string"){
            res.status(400)
            throw new Error("'imageURL' deve ser string")
        }

        const [idAlreadyExists]: TProduct[] = await db("products").where({ id })

        if (idAlreadyExists){
            res.status(400)
            throw new Error("'id' já existe")
        }

        const newProduct: TProduct = {
            id,
            name,
            price, 
            description,
            imageURL
        }

        await db("products").insert(newProduct)
        res.status(201).send({ 
            message: "Produto cadastrado com sucesso", 
            user: newProduct
        })

    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }
})

//POST new purchase
app.post("/purchases", async (req: Request, res: Response) => {
    
    try{
        const {id, buyer, totalPrice, paid} = req.body

        if (typeof id !== "string"){
            res.status(400)
            throw new Error("'id' deve ser string")
        }
        if (typeof buyer !== "string"){
            res.status(400)
            throw new Error("'buyer' deve ser string")
        }
        if (typeof totalPrice !== "number"){
            res.status(400)
            throw new Error("'totalPrice' deve ser number")
        }
        if (typeof paid !== "number"){
            res.status(400)
            throw new Error("'paid' deve ser number")
        }
        
        const newPurchase = {
            id,
            buyer,
            totalPrice,
            paid
        }

        await db("purchases").insert(newPurchase)
        res.status(201).send({ 
            message: "Compra realizada com sucesso", 
            user: newPurchase
        })

    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }
})

//GET product by id
app.get("/products/:id", async (req: Request, res: Response) => {
    try{
        const productId = req.query.q as string | undefined
        //const findProductId = products.find((product) => product.id.includes(productId))
        const [productById] = await db("products").where("id", "LIKE", `${productId}`)
        
        console.log(productById)
        
        if(!productById){
            res.status(400)
            throw new Error("'produto' não encontrado")
        }
            
        res.status(200).send(productById)
    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }
})

//GET User Purchases by User id
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try{
        const purchaseByUserId = req.query.id as string
        //const result = purchases.filter((purchase) => purchase.id === purchaseByUserId)
        const [userPurchaseByUserId] = await db("purchases").where("id", "LIKE", `${purchaseByUserId}`)

        console.log(purchaseByUserId)
        console.log(userPurchaseByUserId)

        if(!userPurchaseByUserId || userPurchaseByUserId === undefined){
            res.status(400)
            throw new Error("Usuário não realizou nenhuma compra")
        }
        
        res.status(200).send(userPurchaseByUserId)
        
    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }

    
})

//DELETE user by id
app.delete("/users/:id", (req: Request, res: Response) => {
    try{
        const idToDel = req.params.id
        const userId = users.find((user) => user.id === idToDel)
        const userIndex = users.findIndex((user) => user.id === idToDel)

        console.log(userId)
        console.log(userIndex)

        if(!userId){
            res.status(400)
            throw new Error("Usuário não existe")
        }
        if(userIndex >= 0) {
            users.splice(userIndex, 1)
        }
        
        res.status(200).send("Usuário deletado do sistema")
        
    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }
}) 

//DELETE product by id
app.delete("/products/:id", (req: Request, res: Response) => {
    try{
        const idToDel = req.params.id
        const productId = products.find((product) => product.id === idToDel)
        const productIndex = products.findIndex((product) => product.id === idToDel)

        console.log(productId)
        console.log(productIndex)

        if(!productId){
            res.status(400)
            throw new Error("Usuário não existe")
        }
        if(productIndex >= 0) {
            products.splice(productIndex, 1)
        }
        
        res.status(200).send("Produto excluído do sistema com sucesso")   
    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }
}) 

//PUT user by id
app.put("/users/:id", (req: Request, res: Response) => {
    try{
        const idToEdit = req.params.id
        const newEmail = req.body.email as string
        const newPassword = req.body.password as string
        const userToEdit = users.find((user) => user.id === idToEdit)

        if (typeof newEmail !== "string"){
            res.status(400)
            throw new Error("'email' deve ser string")
        }

        if (typeof newPassword !== "string"){
            res.status(400)
            throw new Error("'password' deve ser string")
        }

        if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
			throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
		}

        if(!userToEdit){
            res.status(400)
            throw new Error("Usuário não existe")
        }
        if(userToEdit) {
            userToEdit.email = newEmail
            userToEdit.password = newPassword
        }
        
        res.status(200).send("Cadastro alterado com sucesso")
        
    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }    
})

//PUT product by id
app.put("/products/:id", (req: Request, res: Response) => {
    try{
        const idToEdit = req.params.id
        const newName = req.body.name as string
        const newPrice = req.body.price as string
        const newDescription = req.body.description 
        const productToEdit = products.find((user) => user.id === idToEdit)

        if (typeof newName !== "string"){
            res.status(400)
            throw new Error("'name' deve ser string")
        }
        if (typeof newPrice !== "number"){
            res.status(400)
            throw new Error("'price' deve ser number")
        }

        if(!productToEdit){
            res.status(400)
            throw new Error("Produto não existe")
        }
        if(productToEdit) {
            productToEdit.name = newName
            productToEdit.price = newPrice
            productToEdit.description = newDescription
        }
        
        res.status(200).send("Produto atualizado com sucesso")
        
    }
    catch(error: any){
        console.log(error)
        res.status(400).send(error.message)
    }
})

//APROFUNDAMENTO KNEX
//EXERCÍCIO 1: TODOS OS ENDPOINTS ACIMA JÁ HAVIAM SIDO REFATORADOS DE ACORDO COM O ENUNCIADO (UTILIZANDO QUERY BUILDER)

//EXERCÍCIO 2: Crie o seguinte endpoint com query builder:
/*Get Purchase by id
- method HTTP (GET)
-path ("/purchases/:id")
-response
    status 200
    um objeto contendo:
        id da compra
        valor total da compra
        quando foi criada
        status do pagamento
        id de quem fez a compra
        email de quem fez a compra
        nome de quem fez a compra*/




/*EXERCÍCIO 3: Refatore o endpoint criado no exercício anterior para que o resultado bem sucedido também 
retorne a lista de produtos registrados na compra.*/