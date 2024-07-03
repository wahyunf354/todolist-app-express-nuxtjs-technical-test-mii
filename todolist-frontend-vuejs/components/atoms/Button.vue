<template>
  <div>
    <button
      class="group relative inline-block focus:outline-none focus:ring mr-3"
      :onclick="onclick"
    >
      <span
        :class="`absolute inset-0 translate-x-1.5 translate-y-1.5 ${
          bgColor || 'bg-yellow-300'
        } transition-transform group-hover:translate-x-0 group-hover:translate-y-0`"
      ></span>

      <span
        class="relative inline-block border-2 border-current px-6 py-2 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75"
      >
        {{ label }}
      </span>
    </button>
  </div>
</template>
<script>
export default {
  props: ["label", "onclick", "bgColor"],
};
</script>

<style></style>
