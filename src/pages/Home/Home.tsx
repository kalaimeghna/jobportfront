import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Briefcase,
  UserCircle,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import axiosInstance from "../../api/axios";
import JobCard from "../../components/Jobs/JobCard";
import CompanyCard from "../../components/Company/CompanyCard";

const SectionHeading = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="mb-8">
    <h2 className="text-3xl font-black text-slate-950 tracking-tight">
      {title}
    </h2>

    <p className="text-slate-500 mt-2 font-medium">
      {subtitle}
    </p>
  </div>
);

const Home = () => {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const requests = [axiosInstance.get("/companies")];

      if (token) {
        requests.unshift(axiosInstance.get("/jobs/recommended"));
      }

      const responses = await Promise.all(requests);

      if (token) {
        const jobRes = responses[0];
        const companyRes = responses[1];

        if (jobRes.data?.success) {
          setRecommendations(jobRes.data.data || []);
        }

        if (companyRes.data?.success) {
          setCompanies(companyRes.data.data || []);
        }
      } else {
        const companyRes = responses[0];

        if (companyRes.data?.success) {
          setCompanies(companyRes.data.data || []);
        }

        setRecommendations([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-20">

      {/* Hero Section */}
      <section className="bg-slate-950 text-white rounded-[2.5rem] p-8 md:p-20 shadow-2xl relative overflow-hidden">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-6">

          <span className="bg-blue-600/20 text-blue-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2">
            <Sparkles size={14} />
            Powered by AI Matching
          </span>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95]">
            Find your next big opportunity.
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-lg">
            Upload your resume and let our engine pair your experience with
            top-tier companies.
          </p>

          <div className="bg-white p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-xl mt-8">

            <div className="flex items-center flex-1 px-4 text-slate-900">

              <Search
                size={20}
                className="text-slate-400"
              />

              <input
                className="w-full px-3 py-3 outline-none"
                placeholder="Job title or keywords..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(e.target.value)
                }
              />

            </div>

            <Link
              to={`/jobs?q=${encodeURIComponent(searchQuery)}`}
              className="bg-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition flex items-center justify-center text-white"
            >
              Search
            </Link>

          </div>

        </div>

      </section>

      {/* Quick Actions */}
      <section className="grid md:grid-cols-2 gap-8">

        {[
          {
            title: "For Employers",
            desc: "Manage your applicant pipelines and hire faster.",
            icon: <Briefcase className="text-blue-600" />,
            link: "/dashboard",
          },
          {
            title: "For Candidates",
            desc: "Build a standout profile to attract top recruiters.",
            icon: <UserCircle className="text-purple-600" />,
            link: "/profile",
          },
        ].map((item, index) => (

          <div
            key={index}
            className="p-8 rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
          >

            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
              {item.icon}
            </div>

            <h3 className="text-2xl font-bold mb-2">
              {item.title}
            </h3>

            <p className="text-slate-500 mb-6">
              {item.desc}
            </p>

            <Link
              to={item.link}
              className="font-bold text-sm flex items-center gap-2 text-blue-600 hover:gap-3 transition-all"
            >
              Explore
              <ArrowRight size={16} />
            </Link>

          </div>

        ))}

      </section>

      {/* Recommended Jobs */}

      <section>

        <SectionHeading
          title="Recommended For You"
          subtitle="Top matches based on your verified skills."
        />

        {loading ? (

          <div className="grid md:grid-cols-3 gap-6">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 rounded-3xl bg-slate-100 animate-pulse"
              />
            ))}

          </div>

        ) : recommendations.length > 0 ? (

          <div className="grid md:grid-cols-3 gap-6">

            {recommendations.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}

          </div>

        ) : (

          <div className="text-center py-20 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200">

            <h3 className="text-xl font-semibold text-slate-700">
              No recommendations available
            </h3>

            <p className="text-slate-500 mt-2">
              Complete your profile or check back later.
            </p>

            <Link
              to="/jobs"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Browse All Jobs
            </Link>

          </div>

        )}

      </section>

      {/* Featured Companies */}

      <section>

        <SectionHeading
          title="Featured Companies"
          subtitle="Top companies hiring now."
        />

        {companies.length > 0 ? (

          <>
            <div className="grid md:grid-cols-3 gap-6">

              {companies.map((company) => (

                <CompanyCard
                  key={company._id}
                  company={{
                    ...company,
                    jobCount: company.jobs?.length || 0,
                  }}
                />

              ))}

            </div>

            <div className="text-center mt-10">

              <Link
                to="/companies"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                View All Companies
                <ArrowRight size={18} />
              </Link>

            </div>

          </>

        ) : (

          <div className="text-center py-12 rounded-2xl bg-slate-50">

            <p className="text-slate-500">
              No companies available.
            </p>

          </div>

        )}

      </section>

    </div>
  );
};

export default Home;