import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeUser } from "./user.type";

interface UsersState {
    users: TypeUser[];
}

function loadUsers(): TypeUser[] {
    const data = localStorage.getItem("users");
    if (data) return JSON.parse(data);
    return [
        { name: "Dima", symbol: "X", wins: 0, totalTime: 0 },
        { name: "Vova", symbol: "O", wins: 0, totalTime: 0 }
    ];
}

const initialState: UsersState = {
    users: loadUsers()
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        incrementWins: (state, action: PayloadAction<string>) => {
            const user = state.users.find(u => u.symbol === action.payload);
            if (user) user.wins += 1;
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        incrementTime: (state, action: PayloadAction<string>) => {
            const user = state.users.find(u => u.symbol === action.payload);
            if (user) user.totalTime += 1;
        },
        resetTime: (state) => {
            state.users.forEach(u => u.totalTime = 0);
        }
    }
})

export const { incrementWins,
                incrementTime,
                resetTime} = usersSlice.actions;
export default usersSlice.reducer;