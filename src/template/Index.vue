<template>
  <div class="page">
    <page-footer>
      <footer-item v-bind:class="{ 'active' : currentView === 'home' }" v-on:click="changeView('home')">
        <span class="icon demo-icon-home"></span>
        <label>Home</label>
      </footer-item>
      <footer-item v-bind:class="{ 'active' : currentView === 'about' }" v-on:click="changeView('about')">
        <span class="icon demo-icon-me"></span>
        <label>About</label>
      </footer-item>
    </page-footer>
    <component :is="currentView" keep-alive></component>
  </div>
</template>

<script>
import Page from '../components/page'
import { Footer, Item } from '../components/footer'
import Home from './Home'
import About from './About'

export default {
  components: {
    Page,
    'page-footer': Footer,
    'footer-item': Item,
    'home': Home,
    'about': About
  },
  data () {
    return {
      currentView: 'home'
    }
  },
  methods: {
    changeView (view) {
      this.currentView = view
    }
  }
}
</script>

<style lang="less">
.demo-icon-home {
  background-image: url("../assets/images/home/home.png");
  background-size: 100%;
}
.demo-icon-search {
  background-image: url("../assets/images/home/search.png");
  background-size: 100%;
}
.demo-icon-noti {
  background-image: url("../assets/images/home/button.png");
  background-size: 100%;
}
.demo-icon-me {
  background-image: url("../assets/images/home/person.png");
  background-size: 100%;
}
</style>
