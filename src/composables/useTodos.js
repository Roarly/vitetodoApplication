import "../utils/config";
import { ref, computed } from "vue";
import axios from "axios";
//not working still getting process "Uncaught reference : process is not defined."
const todos = ref([]);

// const URL = process.env.API_URL;
// const Username = process.env.API_USER;
// const Password = process.env.API_PASS;

const api = axios.create({
  baseURL: process.env.API_URL,
  params: {
    username: process.env.API_USER,
    password: process.env.API_PASS,
  },
});

const useTodos = () => {
  const getAll = async () => {
    const { data } = await api.get();
    todos.value = data;
  };

  const pending = computed(() => {
    return todos.value.filter((todo) => !todo.completed);
  });

  const Completed = computed(() => {
    return todos.value.filter((todo) => todo.completed);
  });

  const addTodo = async (newTodo) => {
    if (newTodo.trim()) {
      await api.post("", {
        text: newTodo,
        completed: false,
      });
      await getAll();
    }
  };

  const changeStatus = async (id) => {
    const todo = todos.value.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    const { id: _id, ...todoToUpdate } = todo;
    await api.put(`/${id}`, todoToUpdate);
    await getAll();
  };

  getAll();

  return {
    todos,
    pending,
    Completed,
    addTodo,
    changeStatus,
  };
};

export default useTodos;
