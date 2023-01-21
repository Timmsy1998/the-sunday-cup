<template>
  <div class="user-layout">
    <Topbar />
    <navigation v-if="isAuthRoute" />
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="content-box">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../components/user/Navbar.vue";
import Topbar from "../components/user/Topbar.vue";
import { useRoute } from "vue-router";

export default {
  name: "UserLayout",
  components: {
    Navigation,
    Topbar,
  },
  data() {
    return {
      route: {},
    };
  },
  created() {
    this.$store.dispatch("loadUserInfo");
    this.route = useRoute();
  },
  computed: {
    isAuthRoute() {
      if (this.route.path.endsWith("/login") || this.route.path.endsWith("/register")) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style></style>
