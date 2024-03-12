import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "../Redux/UserRedux";

// const rootReducer = combineReducers({ UserReducer, QuizReducer, QuesReducer, AllQuizReducer, RankingReducer, ReloadReducer })

export const store = configureStore({
    reducer: {UserReducer}
});