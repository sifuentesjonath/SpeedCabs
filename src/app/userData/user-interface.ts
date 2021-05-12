export interface Client{
    id?: string,
    idRole:string,
    name: string,
    lastname: string,
    email:string,
    phone:string,
    img_client:string
}
export interface Travels{
    id?:string,
    idClient:string,
    idEmployee:string,
    name_client:string,
    name_employee:string,
    origin:string,
    destiny:string,
    date:string,
    payment_type:string,
    state:string,
    phone_client:string,
    phone_employee:string,
    model:string,
    plates:string,
    img_client:string,
    img_employee:string,
    cost:string
}   