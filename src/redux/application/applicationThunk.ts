import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";

import {
  Application,
  ApplicationStatus,
} from "./applicationSlice";


// ======================================
// APPLY FOR JOB
// POST /api/applications/apply/:jobId
// ======================================

export const applyJob = createAsyncThunk<
  Application,
  {
    jobId: string;
    formData: FormData;
  },
  {
    rejectValue: string;
  }
>(

  "applications/applyJob",

  async (
    {
      jobId,
      formData
    },

    {
      rejectWithValue
    }

  ) => {


    try {


      const { data } =

        await API.post<{
          application: Application;
        }>(

          `/applications/apply/${jobId}`,

          formData,

          {
            headers:{
              "Content-Type":
                "multipart/form-data",
            },
          }

        );



      return data.application;



    } catch(error:any){


      return rejectWithValue(

        error.response?.data?.message ||

        "Job application failed"

      );


    }


  }

);







// ======================================
// GET MY APPLICATIONS (JOB SEEKER)
// GET /api/applications/my
// ======================================

export const fetchMyApplications = createAsyncThunk<
  Application[],
  void,
  {
    rejectValue:string;
  }
>(


  "applications/fetchMyApplications",


  async(_, {rejectWithValue})=>{


    try{


      const {data}=

        await API.get<{
          applications:Application[];
          data?:Application[];
        }>(

          "/applications/my"

        );



      return (

        data.applications ||

        data.data ||

        []

      );



    }catch(error:any){


      return rejectWithValue(

        error.response?.data?.message ||

        "Failed to fetch applications"

      );


    }


  }

);







// ======================================
// GET APPLICATIONS BY JOB (EMPLOYER)
// GET /api/applications/job/:jobId
// ======================================

export const fetchApplicationsByJob = createAsyncThunk<
  Application[],
  string,
  {
    rejectValue:string;
  }
>(


  "applications/fetchApplicationsByJob",


  async(jobId,{rejectWithValue})=>{


    try{


      const {data}=

        await API.get<{
          applications:Application[];
        }>(

          `/applications/job/${jobId}`

        );



      return data.applications;



    }catch(error:any){


      return rejectWithValue(

        error.response?.data?.message ||

        "Failed to fetch job applications"

      );


    }


  }

);







// ======================================
// GET EMPLOYER DASHBOARD APPLICATIONS
// GET /api/applications/employer/dashboard
// ======================================

export const fetchEmployerApplications =
createAsyncThunk<

  Application[],

  void,

  {
    rejectValue:string;
  }

>(


  "applications/fetchEmployerApplications",


  async(_, {rejectWithValue})=>{


    try{


      const {data}=

        await API.get<{
          applications:Application[];
        }>(

          "/applications/employer/dashboard"

        );



      return data.applications;



    }catch(error:any){


      return rejectWithValue(

        error.response?.data?.message ||

        "Failed to fetch employer applications"

      );


    }


  }

);







// ======================================
// UPDATE APPLICATION STATUS
// PATCH /api/applications/:id/status
// ======================================

export const updateApplicationStatus =
createAsyncThunk<

  Application,

  {
    id:string;
    status:ApplicationStatus;
  },

  {
    rejectValue:string;
  }

>(


  "applications/updateApplicationStatus",


  async(
    {
      id,
      status
    },

    {
      rejectWithValue
    }

  )=>{


    try{


      const {data}=

        await API.patch<{
          application:Application;
        }>(


          `/applications/${id}/status`,


          {
            status
          }


        );



      return data.application;



    }catch(error:any){


      return rejectWithValue(

        error.response?.data?.message ||

        "Status update failed"

      );


    }


  }

);