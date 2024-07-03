<script lang="ts" setup>
const accessToken = useCookie("accessToken");
const config = useRuntimeConfig();

const user_device = window?.navigator?.userAgent;

const {
  pending,
  data: todolist,
  refresh,
} = await useFetch(`${config.public.apiBase}/api/todos`, {
  lazy: true,
  server: true,
  headers: {
    "x-access-token": accessToken,
  },
});

const handleCheckTodo = async (id) => {
  await $fetch(`${config.public.apiBase}/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      "x-access-token": accessToken.value,
    },
  })
    .then(async () => {
      //redirect
      await refresh();
      router.push({ path: "/" });
    })
    .catch((error) => {
      console.log(error.data);
    });
};
</script>
<template lang="">
  <div>
    <AtomsButtonLink
      label="ADD TODO"
      to="/createtodo"
      bgColor="bg-yellow-300"
    />

    <div v-if="pending" class="flex justify-center py-6">Loading ...</div>

    <div
      class="pt-6"
      v-else
      v-for="(todo, index) in todolist?.todo_list"
      :key="index"
    >
      <div class="p-5 ring ring-2 ring-gray-200 flex">
        <div class="flex-1">
          <h5 class="text-xl font-bold">{{ todo.title }}</h5>
          <p>{{ todo.body }}</p>
        </div>
        <div>
          <button
            @click="() => handleCheckTodo(todo.id)"
            class="group relative inline-block focus:outline-none focus:ring mr-3"
          >
            <span
              class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
            ></span>

            <span
              class="relative inline-block border-2 border-current px-4 py-1 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
            >
              Check
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
