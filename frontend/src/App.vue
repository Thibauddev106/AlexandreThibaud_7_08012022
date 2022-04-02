<template>
  <div id="app" class="container-fluid">
    <NavLink />
    <router-view />
  </div>
</template>

<script>
import NavLink from "./components/NavLink.vue";
export default {
  components: {
    NavLink,
  },
};
</script>
