<template>
  <nav
    class="navigation d-flex flex-column position-fixed h-100 top-0"
    :aria-expanded="isExpanded"
  >
    <!-- Logo -->
    <div class="logo p-3 d-flex justify-content-center align-items-center">
      <img src="../../../images/Logo-No-BG.png" alt="Logo" />
    </div>

    <!-- Sidebar items -->
    <ul class="navbar-nav flex-column">
      <li
        class="nav-item"
        v-for="category in categories"
        :key="category.id"
        @click="category.expanded = !category.expanded"
        v-show="this.role >= category.minRole || this.username == 'Timmsy'"
      >
        <a class="nav-link d-flex">
          <i :class="category.icon" style="margin-right: 1rem"></i>
          <span class="d-none d-md-flex">{{ category.name }}</span>
          <i v-if="category.expanded" class="fas fa-angle-up"></i>
          <i v-else class="fas fa-angle-down" style="margin-left: 1rem"></i>
        </a>
        <ul class="navbar-nav flex-column" v-if="category.expanded">
          <li
            class="nav-item"
            v-for="subCategory in category.subCategories"
            :key="subCategory.id"
            v-show="this.role >= subCategory.minRole || this.username === 'Timmsy'"
          >
            <a
              class="nav-link d-flex"
              style="cursor: pointer"
              @click="$router.push(subCategory.link)"
            >
              <i :class="subCategory.icon" style="margin-right: 1rem"></i>
              <span class="d-none d-md-flex">{{ subCategory.name }}</span>
            </a>
          </li>
        </ul>
      </li>
      <li class="nav-item logout-link" @click="logout" v-if="isLoggedIn">
        <a class="nav-link d-flex" style="cursor: pointer">
          <i class="fas fa-sign-out-alt" style="margin-right: 1rem"></i>
          <span class="d-none d-md-flex">Logout</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isExpanded: false,
      categories: [
        {
          id: 1,
          name: "Home",
          icon: "fas fa-home",
          expanded: false,
          minRole: 1,
          subCategories: [
            {
              id: 1,
              name: "Dashboard",
              icon: "fas fa-table",
              link: "/user/dashboard",
              minRole: 1,
            },
          ],
        },
        {
          id: 2,
          name: "Team",
          icon: "fas fa-users",
          expanded: false,
          minRole: 1,
          subCategories: [
            {
              id: 1,
              name: "",
              icon: "",
              link: "",
              minRole: 1,
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters([
      "username",
      "summonerName",
      "rank",
      "isLoggedIn",
      "role",
      "teamcode",
      "token",
    ]),
    isLoggedIn() {
      // Check the session status in the Vuex store
      return this.$store.state.userinfo.isLoggedIn;
    },
    teamoption() {
      try {
        let category = this.categories.find((category) => category.id == 2);
        let subCategory = category.subCategories.find(
          (subCategory) => subCategory.id == 1
        );

        if (!this.teamcode || this.teamcode.length === 0 || this.teamcode === null) {
          subCategory.name = "Create / Join a Team";
          subCategory.icon = "fas fa-plus-circle";
          subCategory.link = "/user/team/create";
        } else {
          subCategory.name = "Team Name Here";
          subCategory.icon = "fas fa-headset";
          subCategory.link = "#";
        }
        return subCategory.name;
      } catch (error) {
        console.log(error);
      }
    },
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded;
    },
    async logout() {
      try {
        // Send a post request to the logout endpoint
        await axios.post("/api/logout");
        // Clear the user's data from the store
        localStorage.removeItem("vuex");
        this.$store.commit("clearUserData");
        // redirect the user to login page
        this.$router.push({ path: "/user/login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    // Set the max-height of the nested list to its full height
    this.$refs.nestedList.style.maxHeight = `${this.$refs.nestedList.offsetHeight}px`;
  },
  created() {
    this.teamoption();
  },
};
</script>
