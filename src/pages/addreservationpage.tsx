import { useEffect, useState } from "react";
import { Stack, Typography, Button, CircularProgress } from "@mui/material";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import { clearReservationState, createReservation } from "../features/reservationSlice";
import dayjs from "dayjs";
import "../styles/createroom.scss";

const ReservationPage = () =>{

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { addToast:notify } = useToasts()
    const {userInfo} = useAppSelector((state)=>state.user)
    const {isAdding,isSuccessfullyAdded,addSuccessMsg,isAddError,addErrorMsg} = 
    useAppSelector((state)=>state.reservations)

    let currentDay = new Date();  
    let nextDay = new Date(currentDay);
    nextDay.setDate(currentDay.getDate() + 2);

    const [CheckinOutDate, setCheckinOutDate] = useState<any>([
        dayjs(currentDay),
        dayjs(nextDay),
    ]);

    const[hotel,setHotel] = useState<string>("hotel1")
    const[guests,setGuests]=useState<number>(1)
    const[roomType,setRoomType]=useState<"single"|"double"|"suite">("single")


    useEffect(()=>{
      if(isSuccessfullyAdded){
        notify(`${addSuccessMsg}`,{
            appearance: 'success',
            autoDismiss:true
        })
        dispatch(clearReservationState())
        navigate("/myreservations")
      }else if(isAddError){
        notify(`${addErrorMsg}`,{
            appearance: 'error',
            autoDismiss:true
        })
        dispatch(clearReservationState())
      }
    },[isSuccessfullyAdded,isAddError])

    const handleSubmit = async (e:React.FormEvent) =>{
        e.preventDefault()
        if(!hotel || !CheckinOutDate.length){
            notify(`You Have To Fill All Fields,Add Image.`,{
                appearance: 'warning',
                autoDismiss:true
            })
            
        }else{

            console.log(CheckinOutDate[0],CheckinOutDate[1])

            dispatch(createReservation({
                hotel, guests, roomType,
                status: 'Pending',
                checkIn: CheckinOutDate[0],
                checkOut: CheckinOutDate[1],
                userId: userInfo.id,
                user: userInfo.name
            }))
        }
    }

    return(
        <Stack alignItems="center">
            <Stack width="100%">
                <Typography sx={{fontWeight:"bold",fontSize:"32px",color:"#444",mb:4}} variant="h2">
                    Add New Reservation Room
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Stack gap={2}>
                        <Stack className="selection-field">
                            <label>Guests Number</label>
                            <select onChange={(e)=>setGuests(Number(e.target.value))}>
                                {
                                    [1,2,3,4,5].map((ele)=>{
                                        return(
                                            <option value={`${ele}`} key={ele}>{ele}</option>
                                        )
                                    })
                                }
                            </select>
                        </Stack>

                        <Stack className="selection-field">
                            <label>Room Type</label>
                            <select  onChange={(e:any)=>setRoomType(e.target.value)}>
                                {
                                    ["single","double","suite"].map((ele)=>{
                                        return(
                                            <option value={`${ele}`} key={ele}>{ele}</option>
                                        )
                                    })
                                }
                            </select>
                        </Stack>

                        <Stack className="selection-field">
                            <label>Hotel Name</label>
                            <select  onChange={(e)=>setHotel(e.target.value)}>
                                {
                                    Array.from({ length: 5 }, (_, index) => index + 1).map((ele)=>{
                                        return(
                                            <option value={`hotel${ele}`} key={ele}>hotel{ele}</option>
                                        )
                                    })
                                }
                            </select>
                        </Stack>

                        <DemoContainer components={['DateRangePicker']} sx={{marginBottom:"10px"}}>
                          <DemoItem component="DateRangePicker">
                            <DateRangePicker
                                localeText={{ start: 'Check-in', end: 'Check-out' }}
                                value={CheckinOutDate}
                                onChange={(newValue) => setCheckinOutDate(newValue)}
                              />
                          </DemoItem>
                       </DemoContainer>
                        
                        <Button
                            disableFocusRipple
                            disableRipple
                            type="submit"
                            size="medium"
                            variant='contained'
                            color='primary'
                            sx={{width:"fit-content"}}
                            endIcon={
                                isAdding?
                                <CircularProgress size={25} sx={{color:"#fff"}} />
                                :null
                            }
                        >
                            Add New Reservation
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Stack>
    )
}

export default ReservationPage;