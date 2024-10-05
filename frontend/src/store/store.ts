import { configureStore } from "@reduxjs/toolkit";
import indexReducer from "./slices";

export const store = configureStore({
    reducer: {
        index: indexReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ReturnType<typeof store.dispatch>