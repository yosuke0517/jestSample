<template>
  <el-button :type="type">
    <fas v-if="icon" :icon="icon" />
    <slot />
  </el-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class CasButton extends Vue {
  @Prop({ type: String, default: 'default' }) type!: string
  @Prop({ type: String, default: 'button' }) nativeType!: string
}
</script>

<style lang="scss">
.cas-button {
}
</style>
