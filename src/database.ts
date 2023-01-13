import { TUser, TProduct, TPurchase } from "./types";

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
        category: "casinhas"
    },
    {
        id: "p002",
        name: "Caminha de cachorro",
        price: 150,
        category: "casinhas"
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