import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast"

const URL = import.meta.env.VITE_BACKEND_URL

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async (videoId) => {
        const res = await axios.get(
            `${URL}/api/youtube/fetch-existing-comments`, {
            params: { videoId }
        });
        console.log("1st")
        const response = res.data?.comments;
        if (response.length > 0) {
            return response;
        } else {
            console.log("2nd")
            const fetchingComments = await axios.get(`${URL}/api/youtube/fetch-comments`, {
                params: { videoId }
            });

            const fetchedComments = fetchingComments.data?.comments;
            if (!fetchedComments.length) {
                console.log(fetchingComments.data?.error);
                return fetchingComments.data?.error;
            } else {
                console.log("3rd")
                const finalResponse = await axios.post(`${URL}/api/analysis/analyze-comments`, { videoId });

                const result = finalResponse.data?.comments;
                return result;
            }
        }
    }
);

const commentSlice = createSlice({
    name: "comments",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                toast.success("Comments fetched successfully")
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
                toast.error(`Error fetching comments: ${action.error.message}`)
            });
    },
});

export default commentSlice.reducer;
