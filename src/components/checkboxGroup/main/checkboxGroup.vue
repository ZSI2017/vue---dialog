<template type="html">
<div class="boxGroup-class">
  <slot>
  </slot>
</div>
</template>

<script type="text/javascript">
export default {
  name:"checkboxGroup",
  model: {

  },
  props: {
    value: {
      type: Array,
      require: true
    }
  },
  watch: {
    value: (newValue, oldValue) => {}
  },
  mounted() {
    this.$on("fromCheck", (value) => {})
  },
  data() {
    return {}
  }
}
</script>
