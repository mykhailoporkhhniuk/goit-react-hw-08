import { createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";

export const instance = axios.create({
    baseURL: "https://connections-api.goit.global/",
});

const setAuthHeaders = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const { data } = await instance.post("users/signup", userData);
            setAuthHeaders(data.token);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            const { data } = await instance.post("users/login", userData);
            setAuthHeaders(data.token);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            const { data } = await instance.post("users/logout");
            setAuthHeaders(null);
            return;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const refreshUser = createAsyncThunk(
    "auth/refresh",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const token = state.auth.token;
            setAuthHeaders(token);
            const { data } = await instance.get("users/current");
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    },
    {
        condition: (_, thunkAPI) => {
            const state = thunkAPI.getState();
            const token = state.auth.token;

            if (token) return true;

            return false;
        },
    }
);