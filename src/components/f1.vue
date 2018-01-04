<template type="html">
<div class="outBox-class">
  <slot>
  </slot>
</div>
</template>

<script type="text/javascript">
export default {
  name: "f1",
  model: {

  },
  props: {

  },
  watch: {

  },
  mounted() {
    this.$on("listenerToC1", (value) => {
      alert(value);
    })
  },
  data() {
    return {
      // console.log("dasd");
    }
  },
  methods: {
    // this.$broadcast( 'addChildDataEvent', self.dataInput )
  }
}
</script>

<!-- // <style lang="scss">
// Error:Source sample is missing.
// </style> -->
