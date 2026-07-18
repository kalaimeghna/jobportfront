import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import axiosInstance from "../../api/axios";


// =================================================
// APPLICATION STATUS
// =================================================

export type ApplicationStatus =
  | "pending"
  | "reviewed"
  | "interview"
  | "accepted"
  | "rejected";



// =================================================
// APPLICATION TYPE
// =================================================

export interface Application {

  _id:string;


  job:
  {
    _id:string;
    title:string;

    company?:{
      _id?:string;
      companyName:string;
      logo?:string;
    };

    location?:string;

  } | null;



  applicant:
  {
    _id:string;
    name:string;
    email:string;

  } | null;



  resumeUrl?:string;

  coverLetter?:string;

  coverLetterUrl?:string;


  status:ApplicationStatus;


  expectedSalary?:number;


  createdAt?:string;

  updatedAt?:string;

}




// =================================================
// STATE
// =================================================

interface ApplicationState {

  applications:Application[];

  selectedApplication:Application|null;

  loading:boolean;

  error:string|null;

}



const initialState:ApplicationState={

  applications:[],

  selectedApplication:null,

  loading:false,

  error:null,

};




// =================================================
// APPLY JOB
// =================================================

export const applyJob=createAsyncThunk<

Application,

{

 jobId:string;

 formData:FormData;

},

{rejectValue:string}

>(

"applications/apply",

async(
payload,
{rejectWithValue}
)=>{

try{


const {data}=await axiosInstance.post(

`/applications/apply/${payload.jobId}`,

payload.formData,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);



return data.data;



}

catch(error:any){


return rejectWithValue(

error.response?.data?.message ||

"Job application failed"

);


}


}

);




// =================================================
// FETCH MY APPLICATIONS
// =================================================

export const fetchMyApplications=createAsyncThunk<

Application[],

void,

{rejectValue:string}

>(

"applications/my",

async(_,
{rejectWithValue}

)=>{

try{


const {data}=await axiosInstance.get(

"/applications/my"

);



return (

data.data ||

data.applications ||

[]

);



}

catch(error:any){


return rejectWithValue(

error.response?.data?.message ||

"Failed to fetch applications"

);


}


}

);





// =================================================
// FETCH ALL APPLICATIONS (ADMIN / ATS)
// =================================================

export const fetchApplications=createAsyncThunk<

Application[],

void,

{rejectValue:string}

>(


"applications/all",

async(_,
{rejectWithValue}

)=>{


try{


const {data}=await axiosInstance.get(

"/applications/employer/dashboard"

);



return data.data || [];



}

catch(error:any){


return rejectWithValue(

error.response?.data?.message ||

"Failed to fetch applications"

);


}


}

);





// =================================================
// FETCH SINGLE APPLICATION
// =================================================

export const fetchApplicationById=createAsyncThunk<

Application,

string,

{rejectValue:string}

>(


"applications/byId",

async(

id,

{rejectWithValue}

)=>{


try{


const {data}=await axiosInstance.get(

`/applications/${id}`

);



return data.data;



}

catch(error:any){


return rejectWithValue(

error.response?.data?.message ||

"Application not found"

);


}


}

);





// =================================================
// UPDATE APPLICATION STATUS
// =================================================

export const updateApplicationStatus=createAsyncThunk<

Application,

{

id:string;

status:ApplicationStatus;

},

{rejectValue:string}

>(


"applications/updateStatus",

async(

payload,

{rejectWithValue}

)=>{


try{


const {data}=await axiosInstance.patch(

`/applications/${payload.id}/status`,

{

status:payload.status

}

);



return data.data;



}

catch(error:any){


return rejectWithValue(

error.response?.data?.message ||

"Status update failed"

);


}


}

);







// =================================================
// SLICE
// =================================================


const applicationSlice=createSlice({


name:"applications",


initialState,


reducers:{



clearApplications:(state)=>{


state.applications=[];

state.selectedApplication=null;


},



clearError:(state)=>{


state.error=null;


},



setSelectedApplication:(

state,

action:PayloadAction<Application|null>

)=>{


state.selectedApplication=

action.payload;


},



},




extraReducers:(builder)=>{


builder



// ---------------- APPLY JOB ----------------


.addCase(

applyJob.fulfilled,

(state,action)=>{


state.applications.push(

action.payload

);


}

)




// ---------------- FETCH MY ----------------


.addCase(

fetchMyApplications.pending,

(state)=>{

state.loading=true;

state.error=null;

}

)



.addCase(

fetchMyApplications.fulfilled,

(state,action)=>{


state.loading=false;


state.applications=

action.payload;


}

)



.addCase(

fetchMyApplications.rejected,

(state,action)=>{


state.loading=false;


state.error=

action.payload || null;


}

)




// ---------------- FETCH ATS ----------------


.addCase(

fetchApplications.fulfilled,

(state,action)=>{


state.applications=

action.payload;


}

)





// ---------------- SINGLE APPLICATION ----------------


.addCase(

fetchApplicationById.pending,

(state)=>{


state.loading=true;


}

)


.addCase(

fetchApplicationById.fulfilled,

(state,action)=>{


state.loading=false;


state.selectedApplication=

action.payload;


}

)


.addCase(

fetchApplicationById.rejected,

(state,action)=>{


state.loading=false;


state.error=

action.payload || null;


}

)





// ---------------- UPDATE STATUS ----------------


.addCase(

updateApplicationStatus.fulfilled,

(state,action)=>{


const index=

state.applications.findIndex(

app=>app._id===action.payload._id

);



if(index!==-1){

state.applications[index]=

action.payload;

}



if(

state.selectedApplication?._id===

action.payload._id

){

state.selectedApplication=

action.payload;

}



}

);



}



});





export const {

clearApplications,

clearError,

setSelectedApplication


}=applicationSlice.actions;




export default applicationSlice.reducer;