<template>
  <div>
    <!-- <cap-header />
    <cap-nav /> -->
    <loading :active="isLoading" :is-full-page="true" :z-index="9999" />
    <cap-template :collapse="true">
      <nuxt />
    </cap-template>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
// import CapHeader from '~/components/molecules/cap-header.vue'
// import CapNav from '~/components/molecules/cap-nav.vue'
import Loading from 'vue-loading-overlay'
import CapTemplate from '~/components/organisms/cap-template.vue'
import 'vue-loading-overlay/dist/vue-loading.css'
@Component({
  components: {
    CapTemplate,
    Loading
  }
})
export default class Default extends Vue {
  get isLoading() {
    return this.$store.state.common.isLoading
  }
}
</script>

<style lang="scss"></style>
