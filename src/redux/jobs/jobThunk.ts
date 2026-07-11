import { createAsyncThunk } from "@reduxjs/toolkit";
import { Job, JobsResponse } from "../../types/job.types";

export const fetchJobs = createAsyncThunk<
  Job[],
  string | undefined,
  { rejectValue: string }
>(
  "jobs/fetchAll",
  async (keyword = "", { rejectWithValue }) => {
    try {
      const url = keyword
        ? `/api/jobs?keyword=${encodeURIComponent(keyword)}`
        : "/api/jobs";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to fetch jobs`);
      }

      const result: JobsResponse = await response.json();

      if (!result.success) {
        throw new Error(result.message ?? "Failed to fetch jobs");
      }

      return result.data;
    } catch (err) {
      return rejectWithValue(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred"
      );
    }
  }
);