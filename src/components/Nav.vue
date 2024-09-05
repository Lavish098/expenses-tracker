<template>
  <header>
    <!-- <nav class="container">
      <div class="branding">
        <div class="nav-links">
          <ul v-show="!mobile">
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
            <router-link class="link" :to="{ name: 'AddTransaction' }"
              >Movies</router-link
            >
           <router-link class="link" :to="{name: 'AllTransactions'}">Transaction History</router-link>
                      <router-link v-if="!user" class="link" :to="{name: 'Login'}">Login/Register</router-link>
          </ul>
        </div>
      </div>
    </nav> -->
    <nav name="mobile-nav" class="mobile-container">
      <div class="mobileNav">
        <ul class="mobile-nav" v-show="mobile">
          <router-link class="link" :to="{ name: 'Home' }" @click="falseBubble"
            ><i class="fas fa-home"></i><h3>Home</h3></router-link
          >
          <div class="link" @click="showBubble"
            ><i class="fas fa-plus"></i><h3>Add</h3></div
          >
          <router-link class="link" :to="{name: 'AllTransactions'}" @click="falseBubble">
            <i class="fas fa-receipt"></i><h3>History</h3>
          </router-link>
           <router-link class="link" :to="{name: 'Overview'}" @click="falseBubble">
            <i class="fas fa-chart-pie"></i><h3>Overview</h3>
          </router-link>
                      <!-- <router-link @click="toggleMobileNav" v-if="!user" class="link" :to="{name: 'Login'}">Login/Register</router-link> -->
        </ul>
      </div>
    </nav>
    <AddBubble v-if="bubble" @showBubble="showBubble"/>
  </header>
</template>

<script setup>
import { onMounted, ref } from "vue";
import AddBubble from './addBubble.vue'

const mobile = ref(false); // Initialize with a default value
const mobileNav = ref(false);
const windowWidth = ref(window.innerWidth); // Initialize with the current window width
const profileMenu = ref(null);
const bubble = ref(false)

const checkScreen = () => {
  windowWidth.value = window.innerWidth; // Update window width

  if (windowWidth.value <= 750) {
    mobile.value = true;
  } else {
    mobile.value = false;
    mobileNav.value = false;
  }
};

const falseBubble = () => {
  if(bubble){
    bubble.value = false
  }
}

const showBubble = () => {
  bubble.value = !bubble.value
}
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
    padding-top: 10px;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 10%;
  text-decoration: none;
  cursor: pointer;
  color: #88a6b8;
  margin-right: 50px;
}
h3{
  font-family: "Lato", sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin-top: 3px;
}
</style>
