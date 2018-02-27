<template>
<div
  class="hello"
>
<!-- @listenToConfig="changeConfigVisible" -->
  <h1>{{ msg }}</h1>
  <el-select
    v-model="selectValue"
    placeholder="多级联动"
    @change="handleSelect"
  >
    <el-option
      v-for="item in levelsOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
      </el-option>
      </el-select>

      <el-tag
        :key="tag"
        v-for="tag in tipArray"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
      >
        {{tag}}
        </el-tag>

        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
          </el-input>


          <el-button
            v-else-if="showNewTag"
            class="button-new-tag"
            size="small"
            @click="showInput"
          >+ New Tag(0或者2个,字符长度最多为2)</el-button>
            <el-button
              class="button-class"
              round
              @click="toggleSeeDialog"
              icon="el-icon-view"
            >点击打开弹窗-查看模式</el-button>
              <el-button
                class="button-class"
                round
                @click="toggleEditDialog"
                icon="el-icon-edit"
              >点击打开弹窗-编辑模式</el-button>


                <config-checkbox
                  :title="title"
                  :subTitle="subTitle"
                  :visible="dialogConfigVisible"
                  :sourceData="result"
                  :onlyRead='isCheckServer'
                  :levels="defaultLevals"
                  :tips="tipArray"
                  @listenToConfig="changeConfigVisible($event,2)"
                >
                  </config-checkbox>
                  </div>




</template>

<script>
// import configCheckbox from "./configCheckbox";
export default {
  name: 'HelloWorld',
  componentName: 'HelloWorld',
  data() {
    return {
      title: '选区',
      subTitle: ["省名", "城市", "地区"],
      defaultLevals: 1,
      dialogConfigVisible: false,
      result: {},
      logisMerchId: -1,
      isCheckServer: true,
      msg: 'Welcome to my dialog',
      tipArray: [],
      selectValue: "",
      levelsOptions: [{
        value: 1,
        label: "1级联动"
      }, {
        value: 2,
        label: '2级联动'
      }, {
        value: 3,
        label: '3级联动'
      }],
      tipArray: [],
      inputVisible: false,
      inputValue: '',
      showNewTag: false
    }
  },
  mounted() {
    this.$http.get("/list1", (data) => {
      localStorage.setItem("sourceData", JSON.stringify(data.data));
    })
  },
  methods: {
    handleClose(tag) {
      this.tipArray.splice(this.tipArray.indexOf(tag), 1);
      if (this.tipArray.length < 2) {
        this.showNewTag = true;
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue && inputValue.length <= 2) {
        this.tipArray.push(inputValue);
      }
      this.inputVisible = false;
      if (this.tipArray.length >= 2) {
        this.showNewTag = false;
      } else {
        this.showNewTag = true;
      }
      this.inputValue = '';
    },
    handleSelect(item) {
      if (item > 1 && this.tipArray.length < 2) {
        this.showNewTag = true;
      }
      this.defaultLevals = item;
    },
    changeConfigVisible(flag,ages) {
      console.log(ages)
      this.dialogConfigVisible = !!flag;
    },
    toggleSeeDialog() {
      if (!this.checkConfig()) return;
      this.result = JSON.parse(localStorage.getItem("sourceData"));
      this.isCheckServer = true;
      this.dialogConfigVisible = !this.dialogConfigVisible;
    },
    toggleEditDialog() {
      if (!this.checkConfig()) return;
      this.result = JSON.parse(localStorage.getItem("sourceData"));
      this.isCheckServer = false;
      this.dialogConfigVisible = !this.dialogConfigVisible;
    },
    checkConfig() {
      if (!this.selectValue) {
        this.$message.error('请先选择级数');
        return false;
      }
      if (this.tipArray.length === 1) {
        this.$message.error('标签只能为空或者2个');
        return false;
      }
      return true;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

.button-class {
  display: block;
  margin: 15px auto;
}

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
