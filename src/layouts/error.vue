<template>
  <div>
    <h1 class="error">Error:管理者へ連絡してください</h1>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
// import CapHeader from '~/components/molecules/cap-header.vue'
// import CapNav from '~/components/molecules/cap-nav.vue'
import CapTemplate from '~/components/organisms/cap-template.vue'
@Component({
  components: {
    CapTemplate
  }
})
export default class Error extends Vue {}
</script>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  margin: 0px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  margin: 0px;
  box-sizing: border-box;
  text-decoration: none;
  width: auto;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

.error {
  color: red;
}
</style>
