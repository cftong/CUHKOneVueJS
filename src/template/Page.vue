<template>
  <div class="page">
    <simple-header title="Details" :back-link="true"></simple-header>
    <content>
      <div class="content-padded" :details="details">
        <p>{{details.date}}</p>
        <h3>{{details.title}}</h3>
        <div v-html="details.content"></div>
      </div>
    </content>
    <preloader :show.sync="show"></preloader>
  </div>
</template>

<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import Preloader from '../components/preloader'

export default {
  components: {
    SimpleHeader,
    Preloader,
    Content
  },
  data: function () {
    return {
      show: false,
      details: []
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      this.show = true
      let self = this
      var url = 'https://6ijwt2j6v5.execute-api.us-east-1.amazonaws.com/dev/getdata/details?url=' + this.$localStorage.get('url')
      this.$localStorage.remove('url')
      // console.log(url)
      this.$http.get(url).then(function (response) {
        this.$set('details', response.body)
        self.show = false
      })
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
