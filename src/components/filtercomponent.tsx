import { Stack, TextField } from "@mui/material"
import React from "react"

type FilterProps = {
    setHotel:React.Dispatch<React.SetStateAction<any>>;
    setName:React.Dispatch<React.SetStateAction<any>>;
    setStatus:React.Dispatch<React.SetStateAction<any>>;
}

const FilterComponent = ({setHotel,setName,setStatus}:FilterProps) =>{
    return(
        <Stack alignItems={"flex-end"} flexDirection={"row"} columnGap={"20px"}>

            <TextField
                placeholder='Search By User Name'
                variant="outlined"
                onChange={(e)=>setName(e.target.value)}
            />

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

            <Stack className="selection-field">
                <label>Status</label>
                <select  onChange={(e:any)=>setStatus(e.target.value)}>
                    {
                        ["Approved","Pending"].map((ele)=>{
                            return(
                                <option value={`${ele}`} key={ele}>{ele}</option>
                            )
                        })
                    }
                </select>
            </Stack>

        </Stack>
    )
}

export default FilterComponent