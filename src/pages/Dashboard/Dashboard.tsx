import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaBuilding,
  FaBriefcase,
  FaUsers,
} from "react-icons/fa";
import { Loader2 } from "lucide-react";

import axiosInstance from "../../api/axios";
import { useAuth } from "../../context/AuthContext";


interface Application {
  _id: string;

  status:
    | "pending"
    | "reviewed"
    | "interview"
    | "accepted"
    | "rejected";

  job?: {
    title: string;
  };
}



const Dashboard = () => {

  const { user } = useAuth();


  const [applications, setApplications] =
    useState<Application[]>([]);


  const [loading, setLoading] =
    useState(true);



  useEffect(() => {

    const loadDashboard = async () => {

      try {


        // JOBSEEKER APPLICATIONS

        if (user?.role === "jobseeker") {


          const response =
            await axiosInstance.get(
              "/applications/my"
            );


          const apps =
            response.data.applications ||
            response.data.data ||
            response.data ||
            [];


          setApplications(
            Array.isArray(apps)
              ? apps
              : []
          );

        }



      } catch (error) {

        console.error(
          "Dashboard Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };



    if (user) {

      loadDashboard();

    } else {

      setLoading(false);

    }


  }, [user]);





  if (loading) {

    return (

      <div className="flex justify-center items-center h-96">

        <Loader2
          className="h-10 w-10 animate-spin text-blue-600"
        />

      </div>

    );

  }





  // =====================================================
  // JOB SEEKER DASHBOARD
  // =====================================================


  if (user?.role === "jobseeker") {


    return (

      <div className="max-w-7xl mx-auto">


        <h1 className="text-3xl font-bold">

          Welcome back, {user.name}

        </h1>


        <p className="text-gray-500 mt-2">

          Track your applications and discover new opportunities.

        </p>




        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">



          <div className="bg-white shadow rounded-xl p-6">

            <FaFileAlt className="text-blue-600 text-3xl"/>

            <h3 className="font-semibold mt-4">

              Total Applications

            </h3>


            <p className="text-3xl font-bold">

              {applications.length}

            </p>

          </div>





          <div className="bg-white shadow rounded-xl p-6">

            <FaClock className="text-yellow-500 text-3xl"/>

            <h3 className="font-semibold mt-4">

              Pending

            </h3>


            <p className="text-3xl font-bold">

              {
                applications.filter(
                  (a)=>
                  a.status==="pending"
                ).length
              }

            </p>

          </div>





          <div className="bg-white shadow rounded-xl p-6">

            <FaCheckCircle className="text-green-600 text-3xl"/>


            <h3 className="font-semibold mt-4">

              Accepted

            </h3>


            <p className="text-3xl font-bold">

              {
                applications.filter(
                  (a)=>
                  a.status==="accepted"
                ).length
              }

            </p>


          </div>





          <div className="bg-white shadow rounded-xl p-6">


            <FaTimesCircle className="text-red-600 text-3xl"/>


            <h3 className="font-semibold mt-4">

              Rejected

            </h3>


            <p className="text-3xl font-bold">

              {
                applications.filter(
                  (a)=>
                  a.status==="rejected"
                ).length
              }

            </p>


          </div>



        </div>





        <div className="mt-8">

          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >

            Explore Jobs

          </Link>


        </div>



      </div>

    );

  }







  // =====================================================
  // EMPLOYER DASHBOARD
  // =====================================================


  return (

    <div className="max-w-7xl mx-auto">


      <h1 className="text-3xl font-bold">

        Welcome, {user?.name}

      </h1>


      <p className="text-gray-500 mt-2">

        Manage your company, jobs and applicants.

      </p>





      <div className="grid md:grid-cols-3 gap-6 mt-8">



        {/* CREATE COMPANY */}

        <Link
          to="/company/create"
          className="bg-orange-600 text-white rounded-xl p-6 hover:bg-orange-700"
        >

          <FaBuilding className="text-3xl"/>


          <h2 className="text-xl font-semibold mt-4">

            Create Company

          </h2>


          <p className="mt-2 text-sm">

            Create company profile before posting jobs.

          </p>


        </Link>






        {/* CREATE JOB */}

        <Link
          to="/jobs/create"
          className="bg-blue-600 text-white rounded-xl p-6 hover:bg-blue-700"
        >

          <FaBriefcase className="text-3xl"/>


          <h2 className="text-xl font-semibold mt-4">

            Post Job

          </h2>


          <p className="mt-2 text-sm">

            Create new job openings.

          </p>


        </Link>






        {/* MY JOBS */}

        <Link
          to="/jobs/my"
          className="bg-green-600 text-white rounded-xl p-6 hover:bg-green-700"
        >


          <FaBriefcase className="text-3xl"/>


          <h2 className="text-xl font-semibold mt-4">

            My Jobs

          </h2>


          <p className="mt-2 text-sm">

            Manage posted jobs.

          </p>


        </Link>






        {/* APPLICANTS */}

        <Link
          to="/dashboard/applicants"
          className="bg-purple-600 text-white rounded-xl p-6 hover:bg-purple-700"
        >

          <FaUsers className="text-3xl"/>


          <h2 className="text-xl font-semibold mt-4">

            Applicants

          </h2>


          <p className="mt-2 text-sm">

            Review candidate applications.

          </p>


        </Link>



      </div>


    </div>

  );

};


export default Dashboard;