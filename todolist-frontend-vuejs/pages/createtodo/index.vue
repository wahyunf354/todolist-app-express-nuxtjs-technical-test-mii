<script lang="ts" setup>
const accessToken = useCookie("accessToken");
const config = useRuntimeConfig();

const router = useRouter();

const title = useState("title", "");
const description = useState("description", "");

const user_device = window?.navigator?.userAgent;
console.log(user_device);

const handleSubmitTodo = async () => {
  await $fetch(`${config.public.apiBase}/api/todos`, {
    method: "POST",
    body: {
      title: title.value,
      body: description.value,
    },
    headers: {
      "x-access-token": accessToken.value,
    },
  })
    .then(() => {
      description.value = "";
      title.value = "";
      router.push({ path: "/" });
    })
    .catch((error) => {
      console.log(error.data);
    });
};
</script>
<template>
  <div>
    <form @submit.prevent="handleSubmitTodo()" class="py-5">
      <div class="mb-3">
        <label for="UserEmail" class="block text-md font-medium text-gray-300">
          TITLE TODO
        </label>

        <input
          v-model="title"
          type="text"
          id="title"
          name="title"
          placeholder="Enter You Todo"
          class="mt-1 w-full border-gray-200 shadow-sm sm:text-md p-3 text-slate-700"
        />
      </div>
      <div class="mb-3">
        <textarea
          v-model="description"
          id="desc"
          name="desc"
          class="mt-2 w-full border-gray-200 align-top shadow-sm sm:text-sm p-3 text-slate-700"
          rows="10"
          placeholder="Enter any additional todo..."
        ></textarea>
      </div>

      <div class="flex gap-2">
        <AtomsButtonLink label="Back" to="/" bgColor="bg-gray-300" />

        <button
          type="submit"
          class="group relative inline-block focus:outline-none focus:ring mr-3"
        >
          <span
            class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
          ></span>

          <span
            class="relative inline-block border-2 border-current px-6 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
          >
            SUBMIT
          </span>
        </button>
      </div>
    </form>
  </div>
</template>
