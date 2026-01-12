import { configureStore } from "@reduxjs/toolkit";
import vendorReducers from './slices/vendorSlice'

export const store:any = configureStore({
    reducer:{
        vendors: vendorReducers,
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
