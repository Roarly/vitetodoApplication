<script setup>
import { ref, computed } from "vue";

const newTodo = ref("");
const todos = ref([]);

const pending = computed(() => {
  return todos.value.filter((todo) => !todo.done);
});

const Completed = computed(() => {
  return todos.value.filter((todo) => todo.done);
});

const addTodo = () => {
  if(newTodo.value.trim()){
    todos.value.push({
      id: todos.value.length,
      content: newTodo.value,
      done: false,
    });
    newTodo.value = "";
  }

};

const changeStatus = (id) => {
  const todo = todos.value.find((todo) => todo.id === id);
  todo.done = !todo.done;
}

</script>

<template>
<div class="min-h-screen bg-blue-100">
  <div class="container flex flex-col pt-8 mx-auto space-y-12">
  <h1 class="pb-4 text-6xl font-thin tracking-tighter text-center text-gray-800">My Todo App</h1>
  <input
    @change="addTodo"
   v-model="newTodo" type="text" class="px-4 py-2 text-xl text-center rounded-lg" placeholder="New Todo"/>
  <div class="flex justify-around">
    <div class="w-1/3">
      <h3 class="text-2xl text-center text-yellow-300">Pending</h3>
      <ul class="pt-8 space-y-4">
        <li
        v-for="todo in pending"
        :key="todo.id"
        @click="changeStatus(todo.id)"
         class="w-full px-4 py-2 font-bold text-center transition-colors duration-300 bg-yellow-200 rounded-lg hover:cursor-pointer hover:bg-gray-400 hover:text-yellow-400">
         
         {{todo.content}}
         </li>
        
      </ul>
    </div>
    <div class="w-1/3">
      <h3 class="text-2xl text-center text-green-500">Completed</h3>
      <ul class="pt-8 space-y-4">
        <li
        v-for="todo in Completed"
        :key="todo.id"
        @click="changeStatus(todo.id)"
         class="w-full px-4 py-2 font-bold text-center transition-colors duration-300 bg-green-200 rounded-lg hover:cursor-pointer hover:bg-gray-400 hover:text-green-400">
          {{todo.content}}</li>
      </ul>
    </div>
  </div>
</div>
</div>
</template>


