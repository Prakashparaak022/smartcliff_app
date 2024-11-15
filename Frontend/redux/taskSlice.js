import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    tasksLists:[],
    selectedTask:{},
    isLoading:false,
    Error:''
};

const Url='http://localhost:8000/tasks';

//Get method
export const getFromServer = createAsyncThunk(
    "tasks/getFromServer",
    async(_,{rejectWithValue})=>{
        try{
        const response = await fetch(Url)
        if(response.ok){
            const jsonRespone = await response.json()
            return jsonRespone;
        }
        else{
            return rejectWithValue({Error:'No Courses found'})
        }
    }catch(error){
            return rejectWithValue({Error:'No Courses failed'})
        }
    }
);

//Post method
export const addToServer = createAsyncThunk(
    "tasks/addToServer",
    async(tasks,{rejectWithValue})=>{
        const options = {
            method : 'POST',
            body : JSON.stringify(tasks),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }
        const response = await fetch(Url,options)
        if(response.ok){
            const jsonRespone = await response.json()
            return jsonRespone;
        }
        else{
            return rejectWithValue({Error:'Course Not Added'})
        }
    }
)

//Patch method
export const updateToServer = createAsyncThunk(
    "tasks/updateToServer",
    async(tasks,{rejectWithValue})=>{
        const options = {
            method : 'PATCH',
            body : JSON.stringify(tasks),
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            }
        }
        const response = await fetch(Url+'/'+tasks.id,options)
        if(response.ok){
            const jsonRespone = await response.json()
            return jsonRespone;
        }
        else{
            return rejectWithValue({Error:'Course Not Updated'})
        }
    }
)
//Delete method
export const deleteToServer = createAsyncThunk(
    "tasks/deleteToServer",
    async(tasks,{rejectWithValue})=>{
        const options = {
            method : 'DELETE',
            body : JSON.stringify(tasks),
        }
        const response = await fetch(Url+'/'+tasks.id,options)
        if(response.ok){
            const jsonRespone = await response.json()
            return jsonRespone;
        }
        else{
            return rejectWithValue({Error:'Course Not Deleted'})
        }
    }
)

const taskSlice = createSlice({
    name:'tasksSlice', 
    initialState,
    reducers:{
        removeFromList:(state,action)=>{
            state.tasksLists = state.tasksLists.filter((task)=>task.id !== action.payload.id)
        },
        setSelectedTask:(state,action) => {
            state.selectedTask = action.payload
    }
    },
    extraReducers(builder){
        builder
        .addCase(getFromServer.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(getFromServer.fulfilled,(state,action)=>{
            state.isLoading= false ;
            state.Error='',
            state.tasksLists = action.payload
        })
        .addCase(getFromServer.rejected,(state,action)=>{
            state.Error = action.payload.Error;
            state.isLoading= false;
            state.tasksLists=[]
        })        
        // Add to server

        .addCase(addToServer.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addToServer.fulfilled,(state,action)=>{
            state.isLoading= false
            state.Error='',
            state.tasksLists.push(action.payload)
        })
        .addCase(addToServer.rejected,(state,action)=>{
            state.Error = action.payload.Error
            state.isLoading= false;
            state.tasksLists=[]
        })        
        
        // Update to server

        .addCase(updateToServer.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(updateToServer.fulfilled,(state,action)=>{
            state.isLoading= false
            state.Error='',
            state.tasksLists = state.tasksLists.map((task) => task.id === action.payload.id ? action.payload : task)
        })
        .addCase(updateToServer.rejected,(state,action)=>{
            state.Error = action.payload.Error
            state.isLoading= false;
            state.tasksLists=[]
        })        
        
        // Delete to server

        .addCase(deleteToServer.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteToServer.fulfilled,(state)=>{
            state.isLoading= false
            state.Error=''
        })
        .addCase(deleteToServer.rejected,(state,action)=>{
            state.Error = action.payload.Error
            state.isLoading= false;
        })
    }
});

export const{addTaskToList,removeFromList,updateTaskInList,setSelectedTask}=taskSlice.actions;

export default taskSlice.reducer;