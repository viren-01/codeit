import { createSlice } from "@reduxjs/toolkit";

export const Index = createSlice({
    name: 'index',
    initialState: {
        connection: false,
        terminalVisibilty: false
    },
    reducers: {
        updateConnection: (state: any, action) => {
            state.connection = action.payload
        },

        updateTerminalVisibility: (state: any, action) => {
            state.terminalVisibilty = action.payload
        }

    }
})

export const { updateConnection, updateTerminalVisibility } = Index.actions

export default Index.reducer


export const setTerminalVisibility = (flag: boolean) => async (dispatch: any) => {
    dispatch(updateTerminalVisibility(flag))
}