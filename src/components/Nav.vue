<template>
  <header>
    <nav class="container">
      <div class="branding">
        <div class="nav-links">
          <ul v-show="!mobile">
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'AddTransaction' }"
              >Movies</router-link
            >
            <!-- <router-link v-if="admin" class="link" :to="{name: 'MoviesCreatePost'}">Create Post</router-link>
                      <router-link v-if="!user" class="link" :to="{name: 'Login'}">Login/Register</router-link> -->
          </ul>
        </div>
      </div>
    </nav>
    <nav name="mobile-nav" class="mobile-container">
      <div class="mobileNav">
        <ul class="mobile-nav" v-show="mobile">
          <router-link class="link" :to="{ name: 'Home' }"
            ><i class="fas fa-home"></i><h3>Home</h3></router-link
          >
          <router-link class="link" :to="{ name: 'AddTransaction' }"
            ><i class="fas fa-plus"></i><h3>Add</h3></router-link
          >
          <!-- <router-link @click="toggleMobileNav" v-if="admin" class="link" :to="{name: 'MoviesCreatePost'}">Create Post</router-link>
                      <router-link @click="toggleMobileNav" v-if="!user" class="link" :to="{name: 'Login'}">Login/Register</router-link> -->
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { onMounted, ref } from "vue";

const mobile = ref(false); // Initialize with a default value
const mobileNav = ref(false);
const windowWidth = ref(window.innerWidth); // Initialize with the current window width
const profileMenu = ref(null);

const checkScreen = () => {
  windowWidth.value = window.innerWidth; // Update window width

  if (windowWidth.value <= 750) {
    mobile.value = true;
  } else {
    mobile.value = false;
    mobileNav.value = false;
  }
};

onMounted(() => {
  window.addEventListener("resize", checkScreen); // Correctly reference the checkScreen function
  checkScreen(); // Call the function to initialize the state
});
</script>

<style scoped>
.mobile-container {
  position: fixed;
  bottom: 0;
  box-shadow: 200px 400px 0px -1px rgba(31, 30, 30, 0.753),
    0 2px 4px -1px rgba(0, 0, 0, 0.86);
    width: 100%;
    background-color: #ffffff;
    z-index: 9999999;
    border-radius: 10px 10px 0 0;
}
.mobileNav{
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
}
.mobileNav ul{
  display: flex;
  justify-content: space-evenly;
  align-content: space-between;
  width: 100%;
  height: 60%;
}

.link{
  text-decoration: none;
  cursor: pointer;
  color: #88a6b8;
  margin-right: 50px;
}
h3{
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-top: 0px;
}
</style>
