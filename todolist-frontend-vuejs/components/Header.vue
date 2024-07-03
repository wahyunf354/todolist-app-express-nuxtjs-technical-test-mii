<script lang="ts" setup>
import { ref } from "vue";

const accessToken = useCookie("accessToken");
const user = useCookie("user");
const router = useRouter();

const handleLogout = () => {
  console.log("Logout initiated");
  user.value = null;
  accessToken.value = null;
  router.push({ path: "/auth/login" });
};
</script>

<template>
  <div class="flex justify-between w-full">
    <div class="mb-3">
      <h1 class="text-3xl font-bold uppercase">TODOLIST {{ user }}</h1>
    </div>

    <div>
      <AtomsButtonLink
        v-if="!accessToken"
        label="LOGIN"
        to="/auth/login"
        bgColor="bg-yellow-300"
      />

      <button
        v-else
        class="group relative inline-block focus:outline-none focus:ring mr-3"
        @click="handleLogout"
      >
        <span
          :class="`absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300
           transition-transform group-hover:translate-x-0 group-hover:translate-y-0`"
        ></span>

        <span
          class="relative inline-block border-2 border-current px-6 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
        >
          LOGOUT
        </span>
      </button>
    </div>
  </div>
</template>
