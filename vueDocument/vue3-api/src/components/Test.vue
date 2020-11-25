<template>
  <h1>
      {{attrs.title}}
  </h1>
</template>

<script>
import {toRefs} from 'vue'
export default {
    setup(props, context) {
        return {
           attrs:context.attrs
        }
    }
}
</script>

<style>

</style>