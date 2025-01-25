export interface Reservation{
    id?:number,
    user:string,
    hotel:string,
    checkIn:string,
    checkOut:string,
    guests:number,
    status:'Pending'|'Canceled'|'Approved'
    roomType:'double' | 'single' | 'suite',
    userId:number
}