import { useEffect, useState } from "react";
import CompanyCard from "../../components/Company/CompanyCard";
import { getCompanies } from "../../api/companyApi";
import type { Company } from "../../types/company.types";

const CompanyList = () => {

  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {

    const fetchCompanies = async () => {

      try {

        const response = await getCompanies();


        console.log("COMPANY RESPONSE:", response);


        // Handle API response format
        const companyData =
          response.data?.data ||
          response.data ||
          response;


        setCompanies(
          Array.isArray(companyData)
            ? companyData
            : []
        );


      } catch (error) {

        console.error(
          "Failed to fetch companies",
          error
        );


        setCompanies([]);


      } finally {

        setLoading(false);

      }

    };


    fetchCompanies();


  }, []);





  if (loading) {

    return (
      <div className="flex justify-center py-10">
        Loading companies...
      </div>
    );

  }




  if (companies.length === 0) {

    return (

      <div className="text-center py-10 text-gray-500">

        No companies found.

      </div>

    );

  }





  return (

    <div className="container mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-8">
        Companies
      </h1>


      <div className="grid md:grid-cols-3 gap-6">


        {companies.map((company) => (

          <CompanyCard

            key={company._id}

            company={company}

          />

        ))}


      </div>


    </div>

  );

};


export default CompanyList;