import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import initialInstance from '../utils/api'
import { Reservation } from '../interfaces/reservation'


type InitialState = {
  isLoading: boolean
  isAdding:boolean
  isSuccessfullyAdded:boolean
  addSuccessMsg:string
  isAddError:boolean
  addErrorMsg:string
  isUpdating:boolean
  updateSuccessfully:boolean
  updateSuccessMsg:string
  isUpdateError:boolean
  updateErrorMsg:string
  isError:boolean
  errorMsg:string
  allReservations:Reservation[]
}

const initialState: InitialState = {
    isLoading: false,
    isAdding:false,
    isSuccessfullyAdded:false,
    addSuccessMsg:"",
    isAddError:false,
    addErrorMsg:"",
    isUpdating:false,
    updateSuccessfully:false,
    updateSuccessMsg:"",
    isUpdateError:false,
    updateErrorMsg:"",
    isError:false,
    errorMsg:"",
    allReservations:[] as Reservation[],
}


export const getAllReversations = createAsyncThunk(
    "room/getallreservations",
    async (undefined,{rejectWithValue,fulfillWithValue}) => {
        try {
            const res = await initialInstance.get(`reservations`)
            return fulfillWithValue(res.data)
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)
export const createReservation = createAsyncThunk(
    "room/createReservation",
    async (data:Reservation,{rejectWithValue,fulfillWithValue}) => {
        try {
            await initialInstance.post(`reservations`,data)
            const res = await initialInstance.get(`reservations`)
            return fulfillWithValue(res.data)
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)

export const updateReservation = createAsyncThunk(
    "room/updateReservation",
    async (data:Reservation,{rejectWithValue,fulfillWithValue}) => {
        try {
            if(data.status==="Canceled"){
                await initialInstance.delete(`reservations/${data.id}`)
            }else{
                await initialInstance.put(`reservations/${data.id}`,data)
            }
            const res = await initialInstance.get(`reservations`)
            return fulfillWithValue(res.data)
        } catch (error:any) {
            return rejectWithValue(error.message)
        }
    }
)



const reservationSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        clearReservationState:((state)=>{
            state.isLoading= false
            state.isAdding=false
            state.isSuccessfullyAdded=false
            state.addSuccessMsg=""
            state.isAddError=false
            state.addErrorMsg=""
            state.isUpdating=false
            state.updateSuccessfully=false
            state.updateSuccessMsg=""
            state.isUpdateError=false
            state.updateErrorMsg=""
            state.isError=false
            state.errorMsg=""
        })
    },
    extraReducers: builder => {

    //get all reservations
    builder.addCase(getAllReversations.pending,(state)=>{
        state.isLoading=true
    });
    builder.addCase(getAllReversations.fulfilled,(state,action)=>{
        state.isLoading=false;
        state.allReservations=[...action.payload]
    });
    builder.addCase(getAllReversations.rejected,(state,action)=>{
        state.isLoading=false
        state.errorMsg=`${action.payload}`
    });

    //add new reservation
    builder.addCase(createReservation.pending,(state)=>{
        state.isAdding=true
    });
    builder.addCase(createReservation.fulfilled,(state,action)=>{
        state.isAdding=false;
        state.isSuccessfullyAdded=true
        state.addSuccessMsg="A New Reservation Added Successfully"
        state.allReservations=[...action.payload]
    });
    builder.addCase(createReservation.rejected,(state,action)=>{
        state.isAdding=false
        state.isAddError=true
        state.addErrorMsg=`Something Went Wrong!!`
    });

    //update reservation
    builder.addCase(updateReservation.pending,(state)=>{
        state.isUpdating=true
    });
    builder.addCase(updateReservation.fulfilled,(state,action)=>{
        state.isUpdating=false;
        state.updateSuccessfully=true
        state.updateSuccessMsg="You Have Updated Reservation Successfully"
        state.allReservations=[...action.payload]
    });
    builder.addCase(updateReservation.rejected,(state,action)=>{
        state.isUpdating=false
        state.isUpdateError=true
        state.updateErrorMsg=`Something Went Wrong!!`
    });

   }
})
export default reservationSlice.reducer
export const { clearReservationState } = reservationSlice.actions
