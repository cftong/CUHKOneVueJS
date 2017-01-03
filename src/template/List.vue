<template>
  <div class="page">
    <simple-header title="Digest" :back-link="true"></simple-header>
    <content>
      <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
        <list id="list">
          <list-item :link="true" v-link="{ name: 'details'}" v-on:click="itemOnClick(item.link, $event)" v-for="item in items">
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-title">{{item.title}}</div>
                <div class="item-after"></div>
              </div>
              <div class="item-subtitle">
                {{item.type}}
              </div>
              <div class="item-text">
                {{item.date}}
              </div>
            </div>
          </list-item>
        </list>
      </scroll>
    </content>
    <preloader :show.sync="show"></preloader>
  </div>
</template>

<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { List, ListItem } from '../components/list'
import Switch from '../components/switch'
import Preloader from '../components/preloader'
import Scroll from '../components/scroll'

export default {
  localStorage: {
    url: {
      type: String
    }
  },
  components: {
    SimpleHeader,
    Content,
    List,
    ListItem,
    Switch,
    Preloader,
    Scroll
  },
  data () {
    return {
      items: [],
      item: null,
      show: false,
      lastdate: null,
      page: 1,
      year: (new Date()).getFullYear()
    }
  },
  created: function () {
    this.fetchData()
  },
  methods: {
    validateNA: function () {
      this.year = this.year - 1
      this.page = 1
      this.$localStorage.set('apiURL', this.$localStorage.get('apiURL') + '&year=' + this.year)
      var apiURL = this.$localStorage.get('apiURL') + '&page=' + this.page
      return apiURL
    },
    fetchURL: function (apiURL) {
      var jsonurl = /^https:\/\/6ijwt2j6v5.execute-api\.us-east-1\.amazonaws\.com\/dev\/getdata\/(\w+)/
      return jsonurl.exec(apiURL)
    },
    fetchData: function () {
      this.show = true
      let self = this
      var apiURL = this.$localStorage.get('apiURL')
      this.$http.get(apiURL).then(function (response) {
        if (response.body.titles.length === 0) {
          if (this.fetchURL(apiURL)[1] === 'na' && (this.year >= 2012)) {
            this.validateNA()
            this.fetchData()
          // } else if (this.fetchURL(apiURL)[1] === 'digest') {
          } else {
            self.show = false
            return
          }
        } else {
          this.$set('items', response.body.titles)
          this.lastdate = response.body.titles[0]['date']
          self.show = false
          // console.log(response.body.titles)
          // console.log(this.lastdate)
        }
      })
    },
    onRefresh: function (done) {
      this.fetchData()
      done()
    },
    onInfinite: function (done) {
      var apiURL = this.$localStorage.get('apiURL')
      // console.log(apiURL)
      if (this.fetchURL(apiURL)[0] === 'digest' || this.fetchURL(apiURL)[1] === 'digest') {
        var splitDate = this.lastdate.split('/')
        var year = splitDate[2]
        var month = splitDate[1]
        var day = splitDate[0]
        var oneWeekAgo = new Date(year, month - 1, day)
        // console.log(oneWeekAgo)
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        var dateFormat = require('dateformat')
        apiURL = apiURL + '?date=' + dateFormat(oneWeekAgo, 'yyyymmdd')
        this.lastdate = dateFormat(oneWeekAgo, 'dd/mm/yyyy')
      } else if (this.fetchURL(apiURL)[1] === 'na') {
        this.page = this.page + 1
        apiURL = apiURL + '&page=' + this.page
      }
      // console.log(apiURL)
      this.show = true
      let self = this

      // Validate
      this.$http.get(apiURL).then(function (response) {
        // console.log(response.body.titles)
        if (response.body.titles.length === 0) {
          if (this.fetchURL(apiURL)[1] === 'na' && (this.year >= 2012)) {
            apiURL = this.validateNA()
          } else {
          // } else if (this.fetchURL(apiURL)[1] === 'digest') {
            self.show = false
            done()
            return
          }
        }
        // read and fetech
        this.$http.get(apiURL).then(function (response) {
          if (response.body !== []) {
            for (var i = 0; i < response.body.titles.length; i++) {
              this.items.push(response.body.titles[i])
            }
          } else {
            this.enableInfinite = false
          }
          self.show = false
          done()
        })
      })
    },
    itemOnClick: function (url, e) {
      this.$localStorage.set('url', url)
    }
  }
}
</script>
