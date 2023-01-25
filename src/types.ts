export enum PRODUCT {
    CAMAS_E_TOCAS = "Camas e tocas",
    TOYS = "Brinquedos",
    SNACKS_AND_BONES = "Petiscos e ossos"
}

export type TUser = {
    id: string
    email: string
    password: string
}

export type TProduct ={
    id: string
    name: string
    price: number
    category: PRODUCT
}


export type TPurchase = {
    userId: string
    productId: string
    quantity: number
    totalPrice: number
}