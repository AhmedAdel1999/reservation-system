import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography, Stack, Grid,Alert, AlertTitle, Button,} from '@mui/material'
import { useAppDispatch,useAppSelector } from "../app/hooks"
import { getAllRooms } from "../features/roomSlice";
import RoomCard from "../components/room/roomCard";
import { Room } from "../interfaces/Room";


const HomeScreen = () =>{

    const {allRooms} = useAppSelector((state)=>state.rooms)
    const {userInfo} = useAppSelector((state)=>state.user)
    const dispatch = useAppDispatch();


    useEffect(()=>{
        dispatch(getAllRooms())
    },[])

    return(
        <Stack direction="column" rowGap="30px">
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography sx={{fontWeight:"bold",fontSize:"32px",color:"#444"}} variant="h2">
                    All Hotels Rooms
                </Typography>

                {
                    (userInfo.name&&!userInfo.isAdmin)&&
                    <Button 
                        component={Link} 
                        disableRipple
                        disableElevation
                        to={`/addreservation`} 
                        variant="contained" 
                        className="cardbtnlink"
                    >
                        Add New Reservation
                    </Button>
                }
            </Stack>
            
             {
                allRooms?.length?(
                        <Grid container spacing={4}>
                            {
                                allRooms?.map((room:Room)=>{
                                    return(
                                        <Grid key={room.id} item xs={12} sm={6} md={4} lg={3}>
                                            <RoomCard 
                                            roomInfo={room}
                                            />
                                        </Grid>
                                    )
                                })
                            }  
                        </Grid>
                ):
                (
                        <Alert severity="info">
                            <AlertTitle>No Rooms Avaliable</AlertTitle>
                        </Alert>
                )
             }             
        </Stack>
    )
}
export default HomeScreen