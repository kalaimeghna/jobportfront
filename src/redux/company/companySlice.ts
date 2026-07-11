import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Company, CompanyState } from '../../types/company.types';
// Note: You will need to import your thunks (e.g., fetchCompanyById, updateCompany)
import { fetchCompanyById, updateCompany } from '../../redux/company/companyThunk'; 

const initialState: CompanyState = {
  companies: [],
  company: null,
  loading: false,
  error: null,
};

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    // Synchronous action to reset error
    clearCompanyError: (state) => {
      state.error = null;
    },
    // Synchronous action to manually set company data
    setCompany: (state, action: PayloadAction<Company>) => {
      state.company = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- Handle Fetching Company ---
      .addCase(fetchCompanyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyById.fulfilled, (state, action: PayloadAction<Company>) => {
        state.loading = false;
        state.company = action.payload;
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? 'Failed to load company';
      })

      // --- Handle Updating Company ---
      .addCase(updateCompany.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCompany.fulfilled, (state, action: PayloadAction<Company>) => {
        state.loading = false;
        state.company = action.payload; // Update the current view
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string ?? 'Failed to update company';
      });
  },
});

export const { clearCompanyError, setCompany } = companySlice.actions;
export default companySlice.reducer;