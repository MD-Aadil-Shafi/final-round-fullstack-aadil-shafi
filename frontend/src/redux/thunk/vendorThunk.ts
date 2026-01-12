import { createAsyncThunk } from "@reduxjs/toolkit";
import { getVendors, addVendor } from "../apis/vendorAPI";
import type { VendorQueryParams } from "../types/vendor";
import type { VendorFormValues } from "@/utils/vendorFormSchema";

export const fetchVendors = createAsyncThunk(
  "vendors/fetch",
  async (params: VendorQueryParams, { rejectWithValue }) => {
    try {
      return await getVendors(params);
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);



export const createVendor = createAsyncThunk(
  "vendors/create",
  async (payload: VendorFormValues, { rejectWithValue, dispatch, getState }) => {
    try {
      await addVendor(payload);
      const state: any = getState();
      const { page, limit, search, sort_by, order } = state.vendors;

      dispatch(
        fetchVendors({
          page,
          limit,
          search,
          sort_by,
          order,
        })
      );
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);