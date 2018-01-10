<template>
<div class="hello" @listenToConfig="changeConfigVisible">
  <h1>{{ msg }}</h1>
  <h2>Essential Links</h2>

  <h2 @click="toggleSeeDialog">点击打开弹窗-查看模式</h2>
  <h2 @click="toggleEditDialog">点击打开弹窗-编辑模式</h2>
  <!-- @listenToConfig="changeConfigVisible"  -->
  <config-checkbox :visible="dialogConfigVisible" :sourceData="result" :logisMerchId='logisMerchId' :onlyRead='isCheckServer'> </config-checkbox>




  <config-checkbox
    :visible="dialogConfigVisible"
    :sourceData="result"
    :onlyRead='isCheckServer'
    :levels="defaultLevals"
    @listenToConfig="changeConfigVisible"
  > </config-checkbox>
</div>
</template>

<script>
import configCheckbox from "./configCheckbox";
export default {
  name: 'HelloWorld',
  componentName: 'HelloWorld',
  components: {
    configCheckbox,
  },
  data() {
    this.rect = "ddd"
    return {
      defaultLevals:2,
      dialogConfigVisible: false,
      result: {},
      logisMerchId: -1,
      isCheckServer: true,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.ttt = "<img :src='"+this.src+ "'>"
    var _this = this;
  },
  watch: {
    '$route': function(to, from) {
    }
  },
  methods: {
    changeConfigVisible(flag) {
      this.dialogConfigVisible = !!flag;
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
