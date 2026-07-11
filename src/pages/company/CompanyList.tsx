import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";
import { Company } from "../../types/job.types";

const CompanyList = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get("/companies");
        
        // Ensure data is always an array regardless of API response wrapper
        const list = Array.isArray(data) ? data : (data.companies || data.data || []);
        setCompanies(list);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to load companies.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-950">Companies</h1>
        <p className="text-slate-500 mt-1">Explore top companies hiring now</p>
      </div>

      {companies.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      )}
    </div>
  );
};

const CompanyCard = ({ company }: { company: Company }) => (
  <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-6 hover:shadow-lg transition-all flex flex-col group">
    <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl p-2 flex items-center justify-center mb-4">
      <img
        src={company.logo || "/placeholder.png"}
        alt={`${company.companyName} logo`}
        className="max-w-full max-h-full object-contain"
        onError={(e) => { e.currentTarget.src = "/placeholder.png"; }}
      />
    </div>

    <h2 className="text-xl font-bold text-slate-950 truncate">{company.companyName}</h2>
    
    <div className="text-sm text-slate-500 mt-1 space-y-0.5">
      {company.industry && <p>🏢 {company.industry}</p>}
      {company.location && <p>📍 {company.location}</p>}
    </div>

    <p className="text-slate-600 text-sm mt-3 line-clamp-3 leading-relaxed flex-grow">
      {company.description || "No description available."}
    </p>

    <Link
      to={`/companies/${company._id}`}
      className="w-full text-center mt-5 bg-blue-600 text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-blue-700 transition"
    >
      View Details
    </Link>
  </div>
);

const LoadingState = () => (
  <div className="flex flex-col justify-center items-center py-20 gap-3 text-blue-600">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    <span className="font-bold uppercase text-xs tracking-widest">Loading...</span>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="max-w-md mx-auto text-center py-12 px-4 bg-red-50 border border-red-100 rounded-2xl my-8">
    <p className="text-red-700 font-bold">{message}</p>
    <button onClick={() => window.location.reload()} className="mt-4 text-xs font-bold uppercase bg-red-600 text-white px-4 py-2 rounded-lg">
      Retry
    </button>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
    <p className="text-slate-500 font-medium">No registered companies found.</p>
  </div>
);

export default CompanyList;