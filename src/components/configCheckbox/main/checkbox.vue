
<template type="html">
<!--  这里自定义的 checkBox 只能配合 boxgroup  一起使用  -->
<section class="myCheckBox">
  <input type="checkbox" style="float:left" ref='input' :checked="mychecked" @change="updataValue" v-model="model" :value="label" :id="label" />
  <label :for="label">
        <slot>
        </slot>
    </label>
</section>
</template>

<script type="text/javascript">
export default {
  name: "checkbox",
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
        //   将父组件的 value 值作为 model的 全局中转站，保存所有checkbox的选择状态
        this.defaultParent.$emit('input', val)
      },
      get() {
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
      this.defaultParent.$emit('change', this.defaultParent.value);
    }
  },
  mounted() {},
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
