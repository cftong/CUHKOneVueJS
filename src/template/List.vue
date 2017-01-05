<template>
  <div class="page">
    <simple-header v-bind:title="this.$localStorage.get('headerTitle')" :back-link="true"></simple-header>
    <content>
      <list id="list">
        <list-item :link="true" v-link="{ name: 'details'}" v-on:click="itemOnClick(item.link, $event)"
                   v-for="item in items">
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
      <infinite-loading :on-infinite="onInfinite">
        <h3 slot="no-more">There is no more news :(</h3>
      </infinite-loading>
    </content>
  </div>
</template>
<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { List, ListItem } from '../components/list'
import Switch from '../components/switch'
import InfiniteLoading from 'vue-infinite-loading'

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
    InfiniteLoading
  },
  data () {
    return {
      items: [],
      item: null,
      lastdate: null,
      page: 0,
      year: (new Date()).getFullYear()
    }
  },
  methods: {
    validateNA: function () {
      this.year = this.year - 1
      this.page = 1
      var apiURL = this.$localStorage.get('apiURL') + '&page=' + this.page
      return apiURL + '&year=' + this.year
    },
    fetchURL: function (apiURL) {
      var jsonurl = /^https:\/\/6ijwt2j6v5.execute-api\.us-east-1\.amazonaws\.com\/dev\/getdata\/(\w+)/
      return jsonurl.exec(apiURL)
    },
    // onRefresh: function () {
    //   this.items = []
    //   this.item = null
    //   this.lastdate = null
    //   this.page = 0
    //   this.year = (new Date()).getFullYear()
    //   this.$broadcast('$InfiniteLoading:reset')
    // },
    onInfinite: function () {
      var apiURL = this.$localStorage.get('apiURL')
      // console.log(apiURL)
      if (this.fetchURL(apiURL)[0] === 'digest' || this.fetchURL(apiURL)[1] === 'digest') {
        if (this.lastdate !== null) {
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
        }
      } else if (this.fetchURL(apiURL)[1] === 'na') {
        if (this.page === 0) {
          this.page = 1
          apiURL = apiURL + '&year=' + this.year
        } else {
          this.page = this.page + 1
          apiURL = apiURL + '&page=' + this.page + '&year=' + this.year
        }
      }
      // console.log(apiURL)
      // Validate
      this.$http.get(apiURL).then(function (response) {
        // console.log(response.body.titles)
        if (response.body.titles.length === 0) {
          if (this.fetchURL(apiURL)[1] === 'na' && (this.year >= 2012)) {
            apiURL = this.validateNA()
          } else {
            this.$broadcast('$InfiniteLoading:complete')
            return
          }
        }
        // read and fetech
        this.$http.get(apiURL).then(function (response) {
          if (response.body !== []) {
            if (this.fetchURL(apiURL)[1] === 'digest' && this.lastdate === null) {
              this.lastdate = response.body.titles[0]['date']
            }
            this.items = this.items.concat(response.body.titles)
          } else {
            this.$broadcast('$InfiniteLoading:complete')
          }
          if (response.body.titles.length < 10) {
            this.$broadcast('$InfiniteLoading:reset')
          } else {
            this.$broadcast('$InfiniteLoading:loaded')
          }
        })
      })
    },
    itemOnClick: function (url, e) {
      this.lastdate = null
      this.page = 0
      this.year = (new Date()).getFullYear()
      this.$localStorage.set('url', url)
    }
  }
}

</script>
