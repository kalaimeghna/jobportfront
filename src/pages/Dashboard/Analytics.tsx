import React, { useEffect, useMemo, useState } from "react";

import {
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import {
  Loader2
} from "lucide-react";

import axiosInstance from "../../api/axios";



// ================= TYPES =================


interface Application {

  _id:string;

  job?:{

    _id:string;

    title:string;

    status?:string;

  } | null;


  status:
  | "pending"
  | "reviewed"
  | "interview"
  | "accepted"
  | "rejected";

}





interface AnalyticsData {

  stats:{

    totalJobs:number;

    totalApplications:number;

    acceptedApplications:number;

    rejectedApplications:number;

  };


  topJobs:Array<{

    _id:string;

    title:string;

    applicationsCount:number;

    status:string;

  }>;

}





const Analytics:React.FC = ()=>{


const [data,setData]=
useState<AnalyticsData|null>(null);


const [loading,setLoading]=
useState(true);


const [error,setError]=
useState("");





useEffect(()=>{


const fetchAnalytics=async()=>{


try{


setLoading(true);



const response =

await axiosInstance.get(
"/applications/employer/dashboard"
);



const applications:Application[] =

response.data?.applications ||

response.data?.data ||

[];





const jobMap:Record<string,any>={};



applications.forEach((app)=>{


if(!app.job)
return;



if(!jobMap[app.job._id]){


jobMap[app.job._id]={

_id:app.job._id,

title:app.job.title,

applicationsCount:0,

status:
app.job.status || "active"

};


}



jobMap[app.job._id].applicationsCount++;



});







setData({

stats:{


totalJobs:
Object.keys(jobMap).length,


totalApplications:
applications.length,


acceptedApplications:
applications.filter(
a=>a.status==="accepted"
).length,


rejectedApplications:
applications.filter(
a=>a.status==="rejected"
).length,

},


topJobs:
Object.values(jobMap)


});




}
catch(err:any){


setError(

err.response?.data?.message ||

"Failed to load analytics"

);


}
finally{


setLoading(false);


}



};



fetchAnalytics();



},[]);







const statCards = useMemo(()=>{


if(!data)
return [];



return [


{

title:"Total Jobs",

value:data.stats.totalJobs,

icon:<FaBriefcase/>,

color:"text-blue-600",

bg:"bg-blue-50"

},


{

title:"Applications",

value:data.stats.totalApplications,

icon:<FaUsers/>,

color:"text-indigo-600",

bg:"bg-indigo-50"

},


{

title:"Accepted",

value:data.stats.acceptedApplications,

icon:<FaCheckCircle/>,

color:"text-emerald-600",

bg:"bg-emerald-50"

},


{

title:"Rejected",

value:data.stats.rejectedApplications,

icon:<FaTimesCircle/>,

color:"text-rose-600",

bg:"bg-rose-50"

},


];



},[data]);








if(loading)

return (

<div className="
min-h-[40vh]
flex
justify-center
items-center
">


<Loader2
className="
animate-spin
text-blue-600
"
/>


</div>

);







if(error)

return (

<div className="
p-8
bg-red-50
text-red-700
rounded-xl
">

{error}

</div>

);







return (


<div className="
space-y-8
">


<header>

<h1 className="
text-3xl
font-black
">

Analytics Dashboard

</h1>


<p className="
text-gray-500
">

Hiring pipeline performance overview

</p>


</header>






<div className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
">


{
statCards.map(
(item,index)=>(


<div

key={index}

className="
bg-white
rounded-3xl
p-6
shadow-sm
border
"

>


<div
className={`
w-12
h-12
rounded-xl
flex
items-center
justify-center
${item.bg}
${item.color}
`}
>

{item.icon}


</div>



<p className="
text-gray-400
text-xs
font-bold
mt-4
uppercase
">

{item.title}

</p>



<h2 className="
text-3xl
font-black
">

{item.value}

</h2>



</div>



))
}



</div>







<div className="
bg-white
rounded-3xl
p-6
border
">


<h2 className="
text-xl
font-black
mb-5
">

Top Jobs

</h2>




<table className="
w-full
text-sm
">


<thead>

<tr className="
text-left
text-gray-400
uppercase
text-xs
">


<th className="pb-4">
Job
</th>


<th>
Applications
</th>


<th>
Status
</th>


</tr>


</thead>





<tbody>


{
data?.topJobs.map(job=>(


<tr
key={job._id}
className="
border-t
"
>


<td className="
py-4
font-bold
">

{job.title}

</td>



<td>

{job.applicationsCount}

</td>



<td>

<StatusBadge
status={job.status}
/>


</td>


</tr>


))
}


</tbody>


</table>


</div>




</div>


);


};







const StatusBadge=
({
status
}:{
status:string
})=>{


const styles:any={

active:
"bg-green-50 text-green-700",

closed:
"bg-gray-100 text-gray-600"

};



return (

<span className={`
px-3
py-1
rounded-full
text-xs
font-bold
${styles[status] || styles.active}
`}>

{status}

</span>

);


};





export default Analytics;