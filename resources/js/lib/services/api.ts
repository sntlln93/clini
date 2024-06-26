import axios from "axios";
import { getStorageItem } from "./storage";
import { AuthenticatedUser } from "@/types/auth";

const API_URL = "api";
const auth = getStorageItem<AuthenticatedUser>("auth");

const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth?.token}`,
    },
});

export default api;
