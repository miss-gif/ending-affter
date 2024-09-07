import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userNickname?: string;
  accessToken?: string;
  // 필요에 따라 추가적인 상태를 정의합니다.
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
