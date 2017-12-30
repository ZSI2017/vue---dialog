<template>
<div class="hello">
  <h1>{{ msg }}</h1>
  <h2>Essential Links</h2>
  <ul>
    <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
    <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
    <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
    <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    <br>
    <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
  </ul>
  <h2>Ecosystem</h2>
  <ul>
    <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
    <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
    <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
    <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    <!-- <span :class="{}">{{scope.row.status | formatOrderStatus}}</span> -->
  </ul>
  <h2 @click="toggleSeeDialog" >点击打开弹窗-查看模式</h2>
  <h2 @click="toggleEditDialog">点击打开弹窗-编辑模式</h2>

  <config-checkbox :visible="dialogConfigVisible" :sourceData="result" :logisMerchId='logisMerchId' :onlyRead='isCheckServer' @listenToConfig="changeConfigVisible"> </config-checkbox>
</div>
</template>

<script>
import configCheckbox from "./configCheckbox";
export default {
  name: 'HelloWorld',
  components: {
    configCheckbox
  },
  data() {
    return {
      activeName: "second",
      array: [22, 33, 44],
      dialogConfigVisible: false,
      result: {},
      logisMerchId: -1,
      isCheckServer: true,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    console.log(this.$http)
    var _this = this;
  },
  watch: {
    '$route': function(to, from) {
      'aaabbbbcdddd'.match(/(.)\1+/gi);
      alert("hhh")
    }
  },
  methods: {

    changeConfigVisible(flag) {
      this.dialogConfigVisible = flag;
    },
    toggleSeeDialog() {
      this.$http.get('/list1', (data) => {
        this.result = data.data;
        this.isCheckServer = true;
        this.dialogConfigVisible = !this.dialogConfigVisible;
      })
    },
    toggleEditDialog() {
      this.$http.get("/list1", (data) => {
        this.result = data.data;
        this.isCheckServer = false;
        this.dialogConfigVisible = !this.dialogConfigVisible;
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
