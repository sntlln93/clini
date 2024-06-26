import { queryToString, toPhpStrtotimeFormat } from "@/lib/utils";
import {
    type PaginatedResponse,
    type PaginationQueryString,
} from "@/types/api";
import { type Patient } from "@/types/entities";
import api from "./api";
import { CreatePatientForm } from "@/modals/patients/create/schema";

export const getPatients = async (queryString: PaginationQueryString) => {
    const qs = queryToString(queryString);

    const response = await api.get<PaginatedResponse<Patient>>(
        `/patients?${qs}`,
    );
    return response.data;
};

export const searchPatient = async (search: string) => {
    const response = await api.get<Patient[]>(
        `/patients/search?filter=${search}`,
    );

    return response.data;
};

export const createPatient = async (
    payload: CreatePatientForm,
): Promise<Patient> => {
    const { address_line, city, ...patient } = payload;

    const response = await api.post(`/patients`, {
        patient: {
            ...patient,
            date_of_birth: toPhpStrtotimeFormat(patient.date_of_birth),
        },
        address: { address_line, city },
    });

    return response.data;
};
