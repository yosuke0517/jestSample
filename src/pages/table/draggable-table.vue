<template>
  <div class="app-container">
    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table
      ref="draggableTable"
      v-loading="listLoading"
      :data="list"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Date">
        <template slot-scope="scope">
          <span>{{ scope.row.timestamp | parseTime }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="Title">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="Author">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column width="105px" label="Importance">
        <template slot-scope="scope">
          <svg-icon
            v-for="n in +scope.row.importance"
            :key="n"
            name="star"
            class="icon-star"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" label="Readings" width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.pageviews }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="Status" width="110">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | articleStatusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column align="center" label="Drag" width="80">
        <template slot-scope="{}">
          <svg-icon
            class="draggable-handler"
            name="drag"
            width="20"
            height="20"
          />
        </template>
      </el-table-column>
    </el-table>
    <!-- $t is vue-i18n global function to translate lang (lang in @/lang)  -->
    <div class="show-d">
      <el-tag style="margin-right:12px;">
        {{ $t('table.dragTips1') }} :
      </el-tag>
      {{ oldList }}
    </div>
    <div class="show-d">
      <el-tag>{{ $t('table.dragTips2') }} :</el-tag> {{ newList }}
    </div>
  </div>
</template>

<script lang="ts">
import Sortable from 'sortablejs'
import { Component, Vue } from 'nuxt-property-decorator'
import { ProjectData } from '~/types/project'

@Component({})
export default class DraggableTable extends Vue {
  private list: ProjectData[] = []
  private listLoading = true
  private total = []
  private oldList: number[] = []
  private newList: number[] = []
  private listQuery = {
    page: 1,
    limit: 10
  }

  private sortable: Sortable | null = null

  created() {
    this.getList()
  }

  private async getList() {
    this.listLoading = true
    await this.$store.dispatch('')
    const data = [
      {
        uuid: 0,
        status: 'deleted',
        title: 'Sint tempora ut voluptate repellat est.',
        abstractContent:
          'Quasi maxime quaerat excepturi aut cum et suscipit doloremque optio. Ut quam totam odit quia architecto et repellat.',
        fullContent:
          '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
        sourceURL: 'https://americo.org',
        imageURL: 'http://lorempixel.com/640/480',
        timestamp: 1554296069672,
        platforms: ['c-platform'],
        disableComment: false,
        importance: 3,
        author: 'Jamar Upton',
        reviewer: 'Minerva Lubowitz',
        type: 'EU',
        pageviews: 326
      }
    ]

    this.list = data
    // Just to simulate the time of the request
    setTimeout(() => {
      this.listLoading = false
    }, 0.5 * 1000)
    // this.total = data.length
    this.oldList = this.list.map((v) => v.uuid)
    this.newList = this.oldList.slice()
    this.$nextTick(() => {
      this.setSort()
    })
  }

  private setSort() {
    const el = (this.$refs.draggableTable as Vue).$el.querySelectorAll(
      '.el-table__body-wrapper > table > tbody'
    )[0] as HTMLElement
    this.sortable = Sortable.create(el, {
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder
      onEnd: (evt) => {
        if (
          typeof evt.oldIndex !== 'undefined' &&
          typeof evt.newIndex !== 'undefined'
        ) {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)
          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
        }
      }
    })
  }
}
</script>

<style lang="scss">
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style lang="scss" scoped>
.icon-star {
  margin-right: 2px;
}

.draggable-handler {
  cursor: pointer;
}

.show-d {
  margin-top: 15px;
}
</style>
