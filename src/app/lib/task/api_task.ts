import axios from "axios";

interface Task {
    title: string;
    description?: string;
    category?: string;
    createdAt?: string;
    dueDate?: string;
    priority: boolean;
    completed: boolean;
}

interface TaskProps {
    attribute: string | null,
    value: string | null,
    limit: number | null,
}

const obtenerTasks = async ({ attribute, value, limit }: TaskProps): Promise<any> => {
    try {
      let url: string = `http://localhost:3000/api/tasks?attribute=${attribute}&value=${value}`;
      if (limit) url += `&limit=${limit}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error(String(error));
    }
  };

  const crearTask = async (task: Task): Promise<any> => {
    try {
      const url: string = "http://localhost:3000/api/tasks";
      const response = await axios.post(url, task);
      return response.data;
    } catch (error) {
      throw new Error(String(error));
    }
  };

  const actualizarTask = async (id: number): Promise<any> => {
    try {
      const url: string = `http://localhost:3000/api/tasks?id=${id}`;
      const response = await axios.put(url);
      return response.data;
    } catch (error) {
      throw new Error(String(error));
    }
  };

  const eliminarTask = async (id: number): Promise<any> => {
    try {
      const url: string = `http://localhost:3000/api/tasks?id=${id}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw new Error(String(error));
    }
  };
  

export {
    obtenerTasks,
    crearTask,
    actualizarTask,
    eliminarTask
}