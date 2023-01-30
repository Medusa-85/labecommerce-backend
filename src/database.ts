import { TUser, TProduct, TPurchase , PRODUCT } from "./types";

export const users: TUser[] = [
    {
        id: "Mariana",
        name: "",
        email: "dev.mariana@email.com",
        password: "teste1234"
    },
    {
        id: "Sulamita",
        name: "",
        email: "sukita@email.com",
        password: "sukete76"
    },
    {
        id: "Erica",
        name: "",
        email: "ericadlima@email.com",
        password: "Miloca09"
    }
]

export const products: TProduct[] = [
    {
        id: "p001",
        name: "Toca de gato",
        price: 100,
        description: PRODUCT.CAMAS_E_TOCAS,
        imageURL: ""
    },
    {
        id: "p002",
        name: "Caminha de cachorro",
        price: 150,
        description: PRODUCT.CAMAS_E_TOCAS,
        imageURL: ""
    },
]

export const purchases: TPurchase[] = [
    {
        id: "",
        buyer: "",
        totalPrice: 2,
        paid: 300
    },
]

export const createNewUser = function(
    id: string,
    name: string,
    email: string,
    password: string
): void {
    const newUser = {
        id,
        name,
        email,
        password
    };
    users.push(newUser)
}

export const getUsers = () => {
    console.log(`Todos os usuários:`, users)
}

export const createNewProduct = function(
    id: string,
    name: string,
    price: number,
    description: PRODUCT,
    imageURL: ""
): void {
    const newProduct = {
        id,
        name,
        price,
        description,
        imageURL: ""
    };
    products.push(newProduct)
}

export const getAllProducts = () => {
    console.log(`Todos os produtos:`, products)
}

export const getProductById = (id: string) => {
    const product = products.find((product)=>(product.id===id))
    console.log(`Busca de produto por ID:`,product)
}

export const getProductByName = (name: string) => {
    const product = products.filter((product)=>(product.name.includes(name)))
    console.log(`Busca por nome`,product)
}

export const createNewPurchase = function(
    id: string,
    buyer: string,
    totalPrice: number,
    paid: number
): void {
    const newPurchase = {
        id,
        buyer,
        totalPrice,
        paid
    }; 
    purchases.push(newPurchase)
}
createNewPurchase("Mariana","p003",2,30)

export const getPurchaseByUserId = (userId: string) => {
    const purchaseByUser = purchases.filter((purchase)=>(purchase.id.includes("id")))
    console.log(`Compras deste usuário:`, purchaseByUser)
}