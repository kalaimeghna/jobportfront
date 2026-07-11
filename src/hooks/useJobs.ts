import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../app/store"; // Ensure this matches your file path
import { fetchJobs } from "../redux/jobs/jobThunk";

export const useJobs = (keyword: string = "") => {
  const dispatch = useAppDispatch();
  const { jobs, loading, error } = useAppSelector((state) => state.jobs);

  const loadJobs = useCallback(() => {
    // Optionally: handle loading state or check cache before dispatching
    dispatch(fetchJobs(keyword));
  }, [dispatch, keyword]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return {
    jobs,
    loading,
    error,
    refetch: loadJobs,
  };
};