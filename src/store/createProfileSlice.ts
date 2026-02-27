import { type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfile } from "../api/user";
import { createAppSlice } from "./createAppSlice";

export interface ProfileState {
    profile: UserProfile | null;
}

const initialState: ProfileState = {
    profile: null,
};

export const profileSlice = createAppSlice({
    name: 'profile',
    initialState,
    reducers: create => ({
        setProfile: create.reducer(
            (state, action: PayloadAction<UserProfile>) => {
                state.profile = action.payload;
            },
        ),
    }),
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer
