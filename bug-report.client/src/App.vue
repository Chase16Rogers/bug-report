<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view v-slot="{Component}">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.bug-border{
  border-bottom: 1px solid rgb(82, 82, 82);
}
.pointer:hover{
  cursor: pointer;
}
input.nice{
  background-color: rgba(255, 255, 255, 0);
  border-bottom: 1px solid black !important;
}
input.wide{
  min-width: 80%;
  min-height: 20em;
}

.container-color{
background-color: rgba(239, 247, 255, 0.781);
}
.text-shadow{
  text-shadow: 1px 1px 5px black;
}
.light{
  background-color: rgba(0, 0, 0, 0);
}
.dark{
  background-color: rgba(15, 6, 111, 0.125);
}
</style>
