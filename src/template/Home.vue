<template>
  <page-header>
    <header-title>CUOne (Beta)</header-title>
  </page-header>
  <content>
    <header class='demos-header'>
      <h3 class="demos-title">University 本部</h3>
      <div class="grids">
        <a v-link="{ name: 'digest' }" v-on:click="itemOnClick('https://6ijwt2j6v5.execute-api.us-east-1.amazonaws.com/dev/getdata/digest', $event)" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/menu.png" alt="">
          </div>
          <p class="grid_label">
            Mass Mail Digest
          </p>
        </a>
      </div>
      <h3 class="demos-title">Collage 書院</h3>
      <div class="grids">
        <a v-link="{ name: 'na'}" v-on:click="itemOnClick('https://6ijwt2j6v5.execute-api.us-east-1.amazonaws.com/dev/getdata/na?lang=en', $event)" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/menu.png" alt="">
          </div>
          <p class="grid_label">
            New Asia Collage
          </p>
        </a>
        <a v-link="{ name: 'na'}" v-on:click="itemOnClick('https://6ijwt2j6v5.execute-api.us-east-1.amazonaws.com/dev/getdata/na?lang=zh', $event)" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/menu.png" alt="">
          </div>
          <p class="grid_label">
            新亞書院
          </p>
        </a>
      </div>
    </header>

  </content>
</template>
<script>
import Grid from '../components/grid'
import { Header, HeaderLink, HeaderTitle } from '../components/header'
import Content from '../components/content'

export default {
  localStorage: {
    apiURL: {
      type: String
    }
  },
  components: {
    'page-header': Header,
    HeaderLink,
    HeaderTitle,
    Content,
    Grid
  },
  methods: {
    itemOnClick: function (url, e) {
      this.$localStorage.remove('apiURL')
      this.$localStorage.set('apiURL', url)
    }
  }
}
</script>
