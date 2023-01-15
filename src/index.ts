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


console.log(getUsers())
console.log(getAllProducts())
console.log(getProductById("p002"))
console.log(getProductByName("de"))
console.log(getPurchaseByUserId("Su"))