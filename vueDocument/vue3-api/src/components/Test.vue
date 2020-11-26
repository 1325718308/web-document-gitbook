<template>
  <div style="color: red">
      hello: {{attrs.title}}
      <span class="text" style="color: green">{{age}}</span>
  </div>
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