<template>
  <div class="project">
    <div class="pageTitle">
      <h1>Project Mails</h1>
      <el-autocomplete
        v-model="input"
        class="inline-input"
        :fetch-suggestions="querySearch"
        placeholder="please input"
        @select="handleSelect"
      ></el-autocomplete>
      <!-- <el-input
        v-model="input"
        class="mt3"
        placeholder="Please input"
      ></el-input> -->
      <el-button class="search" icon="el-icon-search" @click="search"
        >Search</el-button
      >
    </div>
    <el-row type="flex" class="cap-row--project">
      <el-col :span="16" class="cap-col--prjtable">
        <div class="table">
          <el-table
            border
            :data="projectData"
            :default-sort="{ prop: 'date', order: 'descending' }"
            style="width: 100%"
            @row-dblclick="rowdbclick"
            @row-click="rowclick"
          >
            <el-table-column
              prop="favorite"
              label="お気に入り"
              sortable
              width="180"
            >
              <!-- <div v-if="tableDatas.favorite | favoriteFilter">
            <i class="far fa-star" @click="favoriteToggle"></i>
          </div>
          <div v-else>
            <i class="fas fa-star" @click="favoriteToggle"></i>
          </div> -->
              <!-- <template :v-slot="tableDatas.favorite">
            <i class="far fa-star" @click="favoriteToggle"></i>
            <span>{{ tableDatas.favorite }}</span>
          </template> -->
            </el-table-column>
            <el-table-column prop="date" label="Date" sortable width="180">
            </el-table-column>
            <el-table-column prop="from" label="From" width="180">
            </el-table-column>
            <el-table-column prop="subject" label="Subject" width="300">
            </el-table-column>
            <el-table-column prop="keyword" label="Keyword"> </el-table-column>
            <el-table-column prop="station" label="最寄り駅"> </el-table-column>
          </el-table>
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalprojectData"
            :page-size="5"
            :current-page.sync="currentPage"
            @current-change="page"
          >
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="8" :offset="1" class="cap-col--prjdetail"
        ><span>Subject：</span>
        <el-input v-model="detailSub" :disabled="true"></el-input
        ><el-input v-model="detailBody" :disabled="true"></el-input
      ></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
// import { i18n } from '~/plugins/nuxt-i18n'
import { ProjectData } from '~/types/project/project-data'

export interface Item {
  favorite: any
  date: string
  from: string
  subject: string
  keyword: string
  station: string
}

export interface Values {
  value: string
}

@Component({})
export default class IndexPage extends Vue {
  /** 初期表示情報 */
  @Getter('project/projectData') projectData: ProjectData[]

  /** constant */
  static readonly KEYWORDS: { [key: string]: string } = {
    vue: 'vue',
    react: 'react',
    ruby: 'ruby',
    java: 'java',
    php: 'php',
    golang: 'golang',
    python: 'python',
    nuxt: 'nuxt',
    next: 'next',
    spring: 'spring',
    laravel: 'laravel',
    echo: 'echo',
    django: 'django',
    aws: 'aws',
    gcp: 'gcp'
  }

  input: string = ''

  currentPage: number = 1

  autocompleteVlues: Values[] = []

  item: Item

  tableDatas: Item[]

  isFavorite: boolean = true

  detailSub: string = ''

  detailBody: string = ''

  async fetch({ store }) {
    await store.dispatch('project/getProjectsData')
  }

  mounted() {
    this.autocompleteVlues = this.loadAll()
  }

  favoriteToggle() {
    // uuidをポストする
    this.isFavorite = !this.isFavorite
  }

  // TODO ページングはポストしていいのか、クライアントで完結させるのか。。。
  page() {
    console.log('this.currentPage')
    console.log(this.currentPage)
  }

  search() {
    alert('ダミー！！TODO：' + this.input + 'をキーワードに検索する')
  }

  // 検索フィールドauto complite
  querySearch(queryString, cb) {
    const values = this.autocompleteVlues
    const results = queryString
      ? values.filter(this.createFilter(queryString))
      : values
    // call callback function to return suggestions
    cb(results)
  }

  createFilter(queryString) {
    return (link) => {
      return link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
  }

  handleSelect() {
    // TODO 補完から選択した場合にも検索が走るようにする
  }

  rowclick(row: ProjectData) {
    this.$store.dispatch('project/search', row.uuid)
  }

  // clickでもいいかも
  rowdbclick(row, column, event) {
    console.log(row)
    console.log(column)
    console.log(event)
  }

  // TODO 共通定数から読み込む
  loadAll() {
    return [
      { value: IndexPage.KEYWORDS.vue },
      { value: IndexPage.KEYWORDS.react },
      { value: IndexPage.KEYWORDS.java },
      { value: IndexPage.KEYWORDS.python },
      { value: IndexPage.KEYWORDS.golang },
      { value: IndexPage.KEYWORDS.php },
      { value: IndexPage.KEYWORDS.ruby },
      { value: IndexPage.KEYWORDS.rails },
      { value: IndexPage.KEYWORDS.django },
      { value: IndexPage.KEYWORDS.aws },
      { value: IndexPage.KEYWORDS.gcp }
    ]
  }

  get totalprojectData() {
    return this.projectData.length
  }
}
</script>

<style>
.project {
}

.el-input {
  margin-top: 20px;
  width: 300px;
}

.pageTitle {
  display: flex;
}

.inline-input {
  margin-left: 20px;
}

.search {
  color: #ffffff;
  background-color: #00bfa5;
  height: 42px;
  margin-top: 19px;
  margin-bottom: 1px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

.fa-star.active {
  cursor: pointer;
  color: #000000;
}
</style>
