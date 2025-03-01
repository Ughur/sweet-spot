import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/api',
});

class ApiClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAll = (): Promise<T[]> => {
        return axiosInstance.get<T[]>(this.endpoint)
            .then(res => res.data)
    }
}

export default ApiClient;