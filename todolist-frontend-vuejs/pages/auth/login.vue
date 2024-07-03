<script lang="ts" setup>
definePageMeta({
  layout: "auth",
});
const config = useRuntimeConfig();
const router = useRouter();
const accessToken = useCookie("accessToken");
const user = useCookie("user");

const username = useState("username", "");
const password = useState("password", "");

const handleSubmitTodo = async () => {
  await $fetch(`${config.public.apiBase}/api/auth/signin`, {
    method: "POST",
    body: {
      id: username.value,
      password: password.value,
    },
  })
    .then((result) => {
      console.log(result);
      accessToken.value = result.accessToken;
      user.value = result.user.id;
      username.value = "";
      password.value = "";
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
          LOGIN
        </label>

        <input
          v-model="username"
          type="text"
          id="username"
          name="username"
          placeholder="Username..."
          class="mt-1 w-full border-gray-200 shadow-sm sm:text-md p-3 text-slate-700"
        />
      </div>

      <div class="mb-3">
        <input
          v-model="password"
          id="passwor"
          name="password"
          type="password"
          class="mt-2 w-full border-gray-200 align-top shadow-sm sm:text-sm p-3 text-slate-700"
          placeholder="Password..."
        />
      </div>

      <div class="flex gap-2">
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
            Sign In
          </span>
        </button>
        <AtomsButtonLink
          label="Register"
          to="/auth/register"
          bgColor="bg-gray-300"
        />
      </div>
    </form>
  </div>
</template>
