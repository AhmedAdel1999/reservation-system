import { useEffect, useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { Reservation } from "../interfaces/reservation";
import TableShared from "../components/tableShared";
import { clearReservationState, getAllReversations, updateReservation } from "../features/reservationSlice";
import moment from "moment";
import { useToasts } from "react-toast-notifications";
import FilterComponent from "../components/filtercomponent";
import React from "react";


const AllReservations = () =>{

    const[hotel,setHotel] = useState("")
    const[name,setName] = useState("")
    const[status,setStatus] = useState("Pending")

    const dispatch = useAppDispatch()
    const { addToast:notify } = useToasts()
    const{userInfo} = useAppSelector((state)=>state.user)
    const{allReservations,updateSuccessfully,updateSuccessMsg,isUpdateError,updateErrorMsg} = 
    useAppSelector((state)=>state.reservations)

    const [filteredReservations,setFilteredReservations] = useState([...allReservations])


    const handelUpdateStatus = (data:Reservation) => {
        dispatch(updateReservation(data))
    }

    const userTableHeader =[
        {name:"Hotel Name"},{name:"Check in"},{name:"Check out"},
        {name:"Status"},{name:"Action"}
    ]

    const userTableRow = filteredReservations?.filter((item:any)=>item.userId==userInfo.id)
    .map((reservation:any)=>{
        return{
            cell1:(<Typography fontSize={17} variant="caption">{reservation.hotel}</Typography>),
            cell2:(<Typography fontSize={17} variant="caption">{moment(reservation.checkIn).format("LL")}</Typography>),
            cell3:(<Typography fontSize={17} variant="caption">{moment(reservation.checkOut).format("LL")}</Typography>),
            cell4:(<Typography fontSize={17} variant="caption">{reservation.status}</Typography>),
            cell5:(
                <Button 
                    color="error" 
                    variant="contained"
                    disableElevation
                    disableRipple
                    disableTouchRipple
                    onClick={()=>handelUpdateStatus({...reservation,status:"Canceled"})}
                >
                    cancel
                </Button>
            ),
        }
    })

    const adminTableHeader =[
        {name:"Reservation ID"},{name:"User Name"},{name:"Hotel Name"},
        {name:"Check in"},{name:"Check out"},{name:"Status"},{name:"Actions"}
    ]

    const adminTableRow = filteredReservations?.map((reservation:any)=>{
        return{
            cell1:(<Typography fontSize={17} variant="caption">{reservation.id}</Typography>),
            cell2:(<Typography fontSize={17} variant="caption">{reservation.user}</Typography>),
            cell3:(<Typography fontSize={17} variant="caption">{reservation.hotel}</Typography>),
            cell4:(<Typography fontSize={17} variant="caption">{moment(reservation.checkIn).format("LL")}</Typography>),
            cell5:(<Typography fontSize={17} variant="caption">{moment(reservation.checkOut).format("LL")}</Typography>),
            cell6:(<Typography fontSize={17} variant="caption">{reservation.status}</Typography>),
            cell7:(
                <Stack flexDirection={"row"} gap={"20px"}>
                    <Button
                        color="error" 
                        variant="contained"
                        disableElevation
                        disableRipple
                        disableTouchRipple
                        onClick={()=>handelUpdateStatus({...reservation,status:"Canceled"})}
                    >
                        Cancel
                    </Button>
                    {
                        reservation.status!=="Approved"&&
                        <Button
                            color="primary" 
                            variant="contained"
                            disableElevation
                            disableRipple
                            disableTouchRipple
                            onClick={()=>handelUpdateStatus({...reservation,status:"Approved"})}
                        >
                            Approve
                        </Button>
                    } 
                </Stack>
            ),
        }
    })

    
    useEffect(()=>{
        dispatch(getAllReversations())
    },[])

    useEffect(()=>{
      setFilteredReservations(
        allReservations.filter(
         (item:Reservation)=>item.user.includes(name)&&item.status==status&&item.hotel.includes(hotel))
      )
    },[name,hotel,status,allReservations])

    useEffect(()=>{
        if(updateSuccessfully){
          notify(`${updateSuccessMsg}`,{
              appearance: 'success',
              autoDismiss:true
          })
          dispatch(clearReservationState())
        }else if(isUpdateError){
          notify(`${updateErrorMsg}`,{
              appearance: 'error',
              autoDismiss:true
          })
          dispatch(clearReservationState())
        }
    },[updateSuccessfully,isUpdateError])

    return (
        <Stack direction="column" gap={2}>
            <Typography textTransform="capitalize" sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2">
                All {userInfo?.isAdmin?null:`${userInfo.name}`} Reservations
            </Typography>

            {
                userInfo.isAdmin&&
                <React.Fragment>
                    <Typography textTransform="capitalize" variant="body1">
                        Filter By:
                    </Typography>
                    <FilterComponent
                        setHotel={setHotel} 
                        setName={setName}
                        setStatus={setStatus}
                    />
                </React.Fragment>
                
            }
            {
                filteredReservations.length?
                <TableShared 
                    tableHeader={userInfo?.isAdmin?adminTableHeader:userTableHeader}
                    tableRow={userInfo?.isAdmin?adminTableRow:userTableRow} 
                />
                :
                <Typography variant="h4" textAlign={"center"} textTransform="capitalize" fontWeight={500}>
                     There Is No Reservations..
                </Typography>
            }
            
        </Stack>
    )
}
export default AllReservations;