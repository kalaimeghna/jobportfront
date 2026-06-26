import { useEffect, useCallback } from "react";
import API from "../api/axios";
import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/redux";
import {
  setJobs,
  setLoading,
  setError,
} from "../redux/jobs/jobSlice";

export const useJobs = () => {
  const dispatch = useAppDispatch();

  const { jobs, loading, error } = useAppSelector(
    (state) => state.jobs
  );

  const fetchJobs = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const { data } = await API.get("/jobs");

      dispatch(setJobs(data.jobs));
      dispatch(setError(null));
    } catch (err: any) {
      dispatch(
        setError(
          err?.response?.data?.message ||
            "Failed to fetch jobs"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  return {
    jobs,
    loading,
    error,
    refetch: fetchJobs,
  };
};