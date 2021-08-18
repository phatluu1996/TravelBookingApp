import axios from 'axios';
import { ROOT_URL } from '../config/api';


export const GET_TOTAL_AMOUNT_ADMIN_REQUEST = "GET_TOTAL_AMOUNT_ADMIN_REQUEST";
export const GET_TOTAL_AMOUNT_ADMIN_SUCCESS = "GET_TOTAL_AMOUNT_ADMIN_SUCCESS";
export const GET_TOTAL_AMOUNT_ADMIN_ERROR = "GET_TOTAL_AMOUNT_ADMIN_ERROR";

export const getAdminRPTotalAmount = () => async dispatch => {
    try {
        dispatch({ type: GET_TOTAL_AMOUNT_ADMIN_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer "+sessionStorage.getItem("userToken")
            }
        });

        const response = await httpAuth.get(`/admin/totalAmountReport`);
        const responseBody = await response.data;
        dispatch({
            type: GET_TOTAL_AMOUNT_ADMIN_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_TOTAL_AMOUNT_ADMIN_ERROR,
            message: error
        });
    }
}

export const GET_DAILY_INCOME_ADMIN_REQUEST = "GET_DAILY_INCOME_ADMIN_REQUEST";
export const GET_DAILY_INCOME_ADMIN_SUCCESS = "GET_DAILY_INCOME_ADMIN_SUCCESS";
export const GET_DAILY_INCOME_ADMIN_ERROR = "GET_DAILY_INCOME_ADMIN_ERROR";

export const getAdminRPDailyIncome = () => async dispatch => {
    try {
        dispatch({ type: GET_DAILY_INCOME_ADMIN_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer "+sessionStorage.getItem("userToken")
            }
        });

        const response = await httpAuth.get(`/admin/dailyIncomeAdmin`);
        const responseBody = await response.data;
        dispatch({
            type: GET_DAILY_INCOME_ADMIN_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_DAILY_INCOME_ADMIN_ERROR,
            message: error
        });
    }
}

export const GET_REPORT_MONTH_ADMIN_REQUEST = "GET_REPORT_MONTH_ADMIN_REQUEST";
export const GET_REPORT_MONTH_ADMIN_SUCCESS = "GET_REPORT_MONTH_ADMIN_SUCCESS";
export const GET_REPORT_MONTH_ADMIN_ERROR = "GET_REPORT_MONTH_ADMIN_ERROR";

export const getAdminRPMonth = () => async dispatch => {
    try {
        dispatch({ type: GET_REPORT_MONTH_ADMIN_REQUEST });
        const httpAuth = axios.create({
            baseURL:`${ROOT_URL}/api`,
            headers: {
                "Content-type": "application/json",
                "Authorization":"Bearer "+sessionStorage.getItem("userToken")
            }
        });

        const response = await httpAuth.get(`/admin/reportPerMonth`);
        const responseBody = await response.data;
        dispatch({
            type: GET_REPORT_MONTH_ADMIN_SUCCESS,
            payload: responseBody
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type: GET_REPORT_MONTH_ADMIN_ERROR,
            message: error
        });
    }
}


