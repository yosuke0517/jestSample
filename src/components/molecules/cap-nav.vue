<template>
  <div class="template__side">
    <el-menu
      default-active="2"
      class="el-menu-vertical-side"
      :collapse="isCollapse"
      text-color="#fff"
      background-color="#545c64"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="1" @click="collapse">
        <i
          :class="[
            isCollapse
              ? 'fas fa-angle-double-right'
              : 'fas fa-angle-double-left'
          ]"
        ></i>
        <!-- <i
          class="el-icon-arrow-right"
          :class="[isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left']"
        ></i> -->
      </el-menu-item>
      <el-menu-item index="2" @click="projects">
        <i class="fas fa-th-large"></i>
        <span slot="title">案件</span>
      </el-menu-item>
      <el-menu-item index="3" @click="resource">
        <i class="fas fa-male"></i>
        <span slot="title">人材</span>
      </el-menu-item>
      <el-menu-item index="4" @click="matched">
        <i class="far fa-handshake"></i>
        <span slot="title">マッチング</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class CapNav extends Vue {
  @Prop()
  isCollapse: boolean

  handleOpen(key, keyPath) {
    console.log(key, keyPath)
  }

  handleClose(key, keyPath) {
    console.log(key, keyPath)
  }

  collapse() {
    // this.isCollapse = !this.isCollapse
    this.$emit('commitIsCollapse', !this.isCollapse)
  }

  projects() {
    this.$router.push('/projects')
  }

  resource() {
    this.$router.push('/resource')
  }

  matched() {
    this.$router.push('/matched')
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical-side {
  background-color: #545c64;
}
.fas {
  text-align: center;
  margin: 5px;
}
.fa-male {
  margin: 10px;
}
.fa-handshake {
  margin: 4px;
}
.el-menu-vertical-side:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}
.el-menu--collapse {
  height: 100%;
}
</style>
