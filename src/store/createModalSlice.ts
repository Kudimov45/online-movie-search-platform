import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
}

const initialState: ModalState = {
  isLoginOpen: false,
  isRegisterOpen: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openLoginModal: (state) => {
      state.isLoginOpen = true;
      state.isRegisterOpen = false;
    },
    closeLoginModal: (state) => {
      state.isLoginOpen = false;
    },
    openRegisterModal: (state) => {
      state.isRegisterOpen = true;
      state.isLoginOpen = false;
    },
    closeRegisterModal: (state) => {
      state.isRegisterOpen = false;
    },
  },
});

export const { openLoginModal, closeLoginModal, openRegisterModal, closeRegisterModal } = modalSlice.actions;

export default modalSlice.reducer;