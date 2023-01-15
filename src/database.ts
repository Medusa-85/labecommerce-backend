import { TUser, TProduct, TPurchase , PRODUCT } from "./types";

export const users: TUser[] = [
    {
        id: "Mariana",
        email: "dev.mariana@email.com",
        password: "teste1234"
    },
    {
        id: "Sulamita",
        email: "sukita@email.com",
        password: "sukete76"
    },
    {
        id: "Erica",
        email: "ericadlima@email.com",
        password: "Miloca09"
    }
]

export const products: TProduct[] = [
    {
        id: "p001",
        name: "Toca de gato",
        price: 100,
        category: PRODUCT.CAMAS_E_TOCAS
    },
    {
        id: "p002",
        name: "Caminha de cachorro",
        price: 150,
        category: PRODUCT.CAMAS_E_TOCAS
    },
]

export const purchases: TPurchase[] = [
    {
        userId: "Mariana",
        productId: "p002",
        quantity: 2,
        totalPrice: 300
    },
    {
        userId: "Sulamita",
        productId: "p001",
        quantity: 1,
        totalPrice: 100
    },
]

export const createNewUser = function(
    id: string,
    email: string,
    password: string
): void {
    const newUser = {
        id,
        email,
        password
    };
    users.push(newUser)
}
createNewUser("Maroca", "maroca85@email.com", "123456")

export const getUsers = () => {
    console.log(`Todos os usuários:`, users)
}

export const createNewProduct = function(
    id: string,
    name: string,
    price: number,
    category: PRODUCT
): void {
    const newProduct = {
        id,
        name,
        price,
        category
    };
    products.push(newProduct)
}
createNewProduct("p003","Cookie banana e aveia", 15, PRODUCT.SNACKS_AND_BONES)

export const getAllProducts = () => {
    console.log(`Todos os produtos:`, products)
}

export const getProductById = (id: string) => {
    const product = products.find((product)=>(product.id===id))
    console.log(`Busca de produto por ID:`,product)
}

export const getProductByName = (name: string) => {
    const product = products.filter((product)=>(product.name.includes(name)))
    console.log(`Busca pro nome`,product)
}

export const createNewPurchase = function(
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
): void {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }; 
    purchases.push(newPurchase)
}
createNewPurchase("Mariana","p003",2,30)

export const getPurchaseByUserId = (userId: string) => {
    const purchaseByUser = purchases.filter((purchase)=>(purchase.userId.includes(userId)))
    console.log(`Compras deste usuário:`, purchaseByUser)
}