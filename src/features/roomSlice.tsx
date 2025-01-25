import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Room } from '../interfaces/Room'
import initialInstance from '../utils/api'
import axios from 'axios'


type InitialState = {
  isLoading: boolean
  isError:boolean
  errorMsg:string
  allRooms:Room[]
}

const initialState: InitialState = {
  isLoading: false,
  isError:false,
  errorMsg:"",
  allRooms:[] as Room[],
}


export const getAllRooms = createAsyncThunk(
    "room/getallrooms",
    async (undefined,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await axios.get(`https://664f1beefafad45dfae2604a.mockapi.io/hotelsystem/rooms`)
            return fulfillWithValue(res.data)
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)


const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {},
extraReducers: builder => {

    //get all rooms
    builder.addCase(getAllRooms.pending,(state)=>{
        state.isLoading=true
    });
    builder.addCase(getAllRooms.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.allRooms=[...action.payload]
    });
    builder.addCase(getAllRooms.rejected,(state,action)=>{
        state.isLoading=false
        state.errorMsg=`${action.payload}`
    });
   }
})
export default roomSlice.reducer
