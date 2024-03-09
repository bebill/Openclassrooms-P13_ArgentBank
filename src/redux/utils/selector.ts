import store from "./store";

export type RootState = ReturnType<typeof store.getState>;

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.profile.user;
