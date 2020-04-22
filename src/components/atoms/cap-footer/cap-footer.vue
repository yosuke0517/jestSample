<template>
  <footer class="footer">
    <p class="footer__copyright">
      Copyright ROSSO INC. All rights reserved.
    </p>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CapFooter extends Vue {}
</script>

<style lang="scss" scoped>
.footer {
  // border-top: 1px solid #eaeaea;
  background-color: #fff;
  text-align: center;
  position: fixed;
  bottom: 0;

  &__copyright {
    font-size: 1.2rem;
    padding: 15px 20px;
  }
}
</style>
