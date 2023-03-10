export enum PRODUCT {
    CAMAS_E_TOCAS = "Camas e tocas",
    TOYS = "Brinquedos",
    SNACKS_AND_BONES = "Petiscos e ossos"
}

export type TUser = {
    id: string
    name: string
    email: string
    password: string
}

export type TProduct ={
    id: string
    name: string
    price: number
    description: string
    imageURL: string
}


export type TPurchase = {
    id: string
    buyer: string
    totalPrice: number
    paid: number
}