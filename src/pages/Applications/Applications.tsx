import React, { useEffect, useState } from "react";
import {
  Loader2,
  Briefcase,
  Calendar,
  FileText,
} from "lucide-react";

import axiosInstance from "../../api/axios";


interface Application {

  _id: string;

  job?: {
    _id: string;
    title?: string;

    company?: {
      _id?: string;
      companyName?: string;
    } | null;

    location?: string;

  } | null;


  status:
    | "pending"
    | "reviewed"
    | "interview"
    | "accepted"
    | "rejected";


  resumeUrl?: string;

  createdAt?: string;

}





const Applications: React.FC = () => {


  const [applications, setApplications] =
    useState<Application[]>([]);


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");





  const fetchApplications = async () => {


    try {


      setLoading(true);

      setError("");



      const response =
        await axiosInstance.get("/applications/my");



      console.log(
        "MY APPLICATION RESPONSE:",
        response.data
      );




      const applicationsData =
        response.data.data ||
        response.data.applications ||
        response.data ||
        [];




      setApplications(

        Array.isArray(applicationsData)
          ? applicationsData
          : []

      );



    }


    catch(err:any){


      console.log(err);



      setError(

        err.response?.data?.message ||
        "Failed to load applications"

      );


    }


    finally{


      setLoading(false);


    }


  };






  useEffect(()=>{


    fetchApplications();


  },[]);









  if(loading){


    return (

      <div
        className="
        min-h-[50vh]
        flex
        justify-center
        items-center
        "
      >

        <Loader2

          className="
          animate-spin
          text-blue-600
          "

          size={40}

        />

      </div>

    );


  }









  if(error){


    return (

      <div

        className="
        max-w-5xl
        mx-auto
        mt-10
        bg-red-50
        text-red-600
        p-6
        rounded-xl
        "

      >

        {error}

      </div>

    );


  }









  return (


    <div

      className="
      max-w-6xl
      mx-auto
      p-6
      "

    >



      <h1

        className="
        text-3xl
        font-black
        text-slate-900
        mb-8
        "

      >

        My Applications

      </h1>







      {
        applications.length === 0 ?


        (

          <div

            className="
            bg-slate-50
            rounded-2xl
            p-10
            text-center
            "

          >


            <Briefcase

              className="
              mx-auto
              text-slate-400
              mb-4
              "

              size={45}

            />



            <h2

              className="
              text-xl
              font-bold
              "

            >

              No Applications Found

            </h2>




            <p

              className="
              text-slate-500
              mt-2
              "

            >

              Apply for jobs to see them here.

            </p>


          </div>


        )



        :



        (

          <div

            className="
            grid
            md:grid-cols-2
            gap-6
            "

          >



            {
              applications.map((app)=>(


                <div

                  key={app._id}

                  className="
                  bg-white
                  border
                  rounded-2xl
                  shadow-sm
                  p-6
                  "

                >




                  <div

                    className="
                    flex
                    justify-between
                    items-start
                    "

                  >




                    <div>


                      <h2

                        className="
                        text-xl
                        font-bold
                        "

                      >

                        {
                          app.job?.title ||
                          "Job Removed"
                        }

                      </h2>




                      <p

                        className="
                        text-slate-500
                        mt-1
                        "

                      >

                        {
                          app.job?.company?.companyName ||
                          "Company Not Available"
                        }

                      </p>



                      {
                        app.job?.location &&

                        <p

                          className="
                          text-sm
                          text-slate-400
                          mt-1
                          "

                        >

                          {app.job.location}

                        </p>

                      }


                    </div>








                    <span

                      className={`

                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-bold
                      uppercase


                      ${
                        app.status === "accepted"

                        ?

                        "bg-green-100 text-green-700"


                        :


                        app.status === "rejected"

                        ?

                        "bg-red-100 text-red-700"


                        :


                        app.status === "interview"

                        ?

                        "bg-blue-100 text-blue-700"


                        :


                        app.status === "reviewed"

                        ?

                        "bg-purple-100 text-purple-700"


                        :


                        "bg-yellow-100 text-yellow-700"

                      }


                      `}

                    >

                      {app.status}

                    </span>



                  </div>









                  <div

                    className="
                    mt-5
                    space-y-3
                    text-sm
                    text-slate-600
                    "

                  >





                    {
                      app.createdAt &&


                      <p

                        className="
                        flex
                        gap-2
                        items-center
                        "

                      >

                        <Calendar size={16}/>


                        Applied:


                        {
                          new Date(
                            app.createdAt
                          ).toLocaleDateString()
                        }


                      </p>

                    }









                    {
                      app.resumeUrl &&


                      <a

                        href={`https://jobport-back-2.onrender.com/${app.resumeUrl}`}

                        target="_blank"

                        rel="noreferrer"


                        className="
                        flex
                        gap-2
                        items-center
                        text-blue-600
                        font-semibold
                        "

                      >

                        <FileText size={16}/>


                        View Resume


                      </a>


                    }





                  </div>






                </div>



              ))

            }



          </div>


        )

      }




    </div>


  );


};





export default Applications;