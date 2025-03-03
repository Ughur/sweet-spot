import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (): Promise<T[]> => {
    return axiosInstance
      .get<T[]>(this.endpoint)
      .then((res) => res.data);
  };

  create = (data: T): Promise<T> => {
    return axiosInstance
      .post<T>(this.endpoint, data)
      .then((res) => res.data);
  };

  update = (id: number, data: Partial<T>): Promise<T> => {
    return axiosInstance
      .patch<T>(`${this.endpoint}/${id}`, data)
      .then((res) => res.data);
  };

  delete = (id: number): Promise<T> => {
    return axiosInstance
      .delete<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}

export default ApiClient;
