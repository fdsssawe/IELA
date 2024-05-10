import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AuthService from '../services/AuthService.ts';
import { API_URL } from '../http/index.ts';

export interface AuthState {
  user: User; 
  isAuth: boolean;
  isLoading: boolean;
  isOpen: boolean;
}

interface User {
  email?: string;
  password?: string;

}

const initialState: AuthState = {
  user: {},
  isAuth: false,
  isLoading: false,
  isOpen: false,
};

const authServices = new AuthService();

export const login = createAsyncThunk<User, { email: string; password: string }>('auth/login', async ({ email, password }) => {
  try {
    const response = await authServices.executeCommand('login', email, password);

    localStorage.setItem('token', response.data.accessToken);
    setAuth(true);
    setUser(response.data.user);
    window.location.href = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return response.data.user;
  } catch (e : any) {
    throw new Error(e.response?.data?.message);
  }
});

export const registration = createAsyncThunk<User, { email: string; password: string }>('auth/registration', async ({ email, password }) => {
  try {
    const response = await authServices.executeCommand('registration', email, password);

    localStorage.setItem('token', response.data.accessToken);
    setAuth(true);
    setUser(response.data.user);
    window.location.href = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return response.data.user;
  } catch (e : any) {
    throw new Error(e.response?.data?.message);
  }
});

export const googleAuthHandle = createAsyncThunk<User, { email: string; password: string }>('auth/googleAuthHandle', async ({ email, password }) => {
  try {
    const response = await authServices.executeCommand('googleAuthHandle', email, password);

    if (response.job === 'registration') {
      localStorage.setItem('token', response.response.data.accessToken);
      setAuth(true);
      setUser(response.response.data.user);
      window.location.href = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      return response.response.data.user;
    } else {
      localStorage.setItem('token', response.response.data.accessToken);
      setAuth(true);
      setUser(response.response.data.user);
      window.location.href = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      return response.response.data.user;
    }
  } catch (e : any) {
    throw new Error(e.response?.data?.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authServices.executeCommand('logout');
  localStorage.removeItem('token');
  setAuth(false);
  setUser({});
});

export const checkAuth = createAsyncThunk<User, void>('auth/checkAuth', async () => {
  setLoading(true);
  const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
  localStorage.setItem('token', response.data.accessToken);
  setLoading(false);
  return response.data.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.pending, (state) => {
          state.isLoading = true;
        })
      .addCase(logout.pending, (state) => {
          state.isLoading = true;
        })
      .addCase(registration.fulfilled, (state, action) => {
          state.isAuth = true;
          state.user = action.payload;
        })
      .addCase(logout.fulfilled, (state) => {
          state.isAuth = false;
          state.user = {};
        })
      .addCase(checkAuth.fulfilled, (state, action) => {
          state.isAuth = true;
          state.user = action.payload;
        })
      .addCase(login.rejected, () => {
          console.log('Error logging in');
        })
      .addCase(registration.rejected, () => {
          console.log('Error registering');
        })
      .addCase(logout.rejected, () => {
          console.log('Error logging out');
        })
      .addCase(checkAuth.rejected, () => {
          console.log('Error checking authentication');
        });
    },
  });
  
  export const { setAuth, setUser, setLoading, setIsOpen } = authSlice.actions;
  export default authSlice.reducer;