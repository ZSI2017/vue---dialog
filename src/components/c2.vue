
<template type="html">
<!--  这里自定义的 checkBox 只能配合 boxgroup  一起使用  -->
<section class="myCheckBox">
  <button type="button" name="button" @click="dispatchTest">点击一下，就可以</button>
</section>
</template>

<script type="text/javascript">
import Emitter from "../mixins/emitter";
export default {
  name: "c2",
  mixins: [Emitter],
  optionsVue: "222"
  model: {
    prop: 'mychecked',
    event: 'change'
  },
  props: {
    label: String,
    mychecked: Boolean,
    checked: Boolean,
    myMessage: String,

  },
  data() {
    return {
      defaultParent: {}
    }
  },
  created() {
    // 这里设置 默认的checkbox  和 boxGroup 的嵌套层级是两级自定义组件嵌套
    this.defaultParent = this.$parent;
  },
  computed: {

    model: {
      set(val) {
        //  console.log("**************");
        //  console.log(val);
        //   将父组件的 value 值作为 model的 全局中转站，保存所有checkbox的选择状态
        this.defaultParent.$emit('input', val)
      },
      get() {
        // console.log(this.store);
        return this.store;
      }
    },
    store() {
      return this.defaultParent.value;
    }
  },
  methods: {
    updataValue(event) {
      //  这里设置 在checkbox中 触发的change 事件
      this.$emit('change', event);
      console.log(this.defaultParent);
      //  在 checkbox 中触发了 change 事件，就会在相应的boxGroup 中触发对应的change 事件
      // if(this.parent.$options._componentTag === "box-group") {
      this.defaultParent.$emit('change', this.defaultParent.value);
    },
    dispatchTest() {
      this.dispatch('f1', 'listenerToC1', false);
    }
  },
  mounted() {


  },

}
</script>
<style lang="scss">
.myCheckBox {
    input[type="checkbox"] {
        list-style: none;
    }
    label {
        float: left;
        margin-top: 3px;
        font-weight: normal;
    }
}
</style>
