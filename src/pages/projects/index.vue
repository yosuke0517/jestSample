<template>
  <div class="projectList">
    <div class="projectList__pageTitle">
      <i class="fas fa-th-large" />
      <h1>Project Mails</h1>
      <div class="projectList__buttons"></div>
      <!--TODO レスポンシブ対応-->
      <el-button class="plain" @click="search">お気に入り一覧</el-button>
      <el-button class="plain" icon="el-icon-search" @click="search"
        >絞り込み</el-button
      >
      <el-autocomplete
        v-model="input"
        class="inline-input"
        :fetch-suggestions="querySearch"
        placeholder="please input"
        @select="handleSelect"
      ></el-autocomplete>
      <el-button class="plain" icon="el-icon-search" @click="search"
        >検索</el-button
      >
    </div>
    <el-row type="flex" class="cap-row--project">
      <el-col
        :xs="8"
        :sm="12"
        :md="12"
        :lg="17"
        :xl="17"
        class="cap-col--prjtable"
      >
        <div class="table">
          <el-table
            v-infinite-scroll="load"
            border
            height="800"
            :data="projectData"
            :default-sort="{ prop: 'date', order: 'descending' }"
            @row-dblclick="rowdbclick"
            @row-click="rowclick"
            @click="click"
          >
            <el-table-column
              prop="favorite"
              label="お気に入り"
              sortable
              width="180"
            >
              <template v-slot="{ row }">
                <span
                  :class="row.favorite | favoriteFilter"
                  @click="toggleFavorite"
                ></span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="Date" sortable width="180">
            </el-table-column>
            <el-table-column prop="from" label="From" width="180">
            </el-table-column>
            <el-table-column prop="subject" label="Subject" width="300">
            </el-table-column>
            <el-table-column prop="keyword" label="Keyword"> </el-table-column>
            <el-table-column prop="station" label="最寄り駅"> </el-table-column>
            <el-table-column prop="id" label="id" sortable> </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col
        :offset="1"
        :xs="2"
        :sm="2"
        :md="2"
        :lg="2"
        :xl="2"
        class="cap-col--prjdetail"
      >
        <span>Date</span><el-input v-model="date" :readonly="true"></el-input>
        <span>Subject</span>
        <el-input v-model="subject" :readonly="true"></el-input
        ><span>Sender</span
        ><el-input v-model="sender" :readonly="true"></el-input>
        <span>Body</span
        ><el-input v-model="body" type="textarea" :readonly="true"></el-input>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
// import { i18n } from '~/plugins/nuxt-i18n'
import { ProjectData, ProjectDetail } from '~/types/project'

export interface Item {
  favorite: any
  date: string
  from: string
  subject: string
  keyword: string
  station: string
  id: string
}

export interface Values {
  value: string
}

@Component({})
export default class IndexPage extends Vue {
  /** 初期表示情報 */
  @Getter('project/projectData') projectData: ProjectData[]

  @Getter('project/projectDetail') projectDetail: ProjectDetail

  /** constant */
  // TODO APIから取得するようにする
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

  subject: string = ''

  sender: string = ''

  body: string = ''

  date: string = ''

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
  page() {}

  load() {
    alert('TODO load')
    // ローディングスタート
    // APIアクセス
    // テーブルデータ追加
    // ローディング終了
  }

  toggleFavorite() {
    alert('TODO:toggle favorite')
  }

  click(event) {
    console.log(event)
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

  // TODO 詳細検索
  async rowclick(row: ProjectData) {
    await this.$store.dispatch('project/getProjectsDetail', row.id)
    this.date = this.projectDetail.date
    this.subject = this.projectDetail.subject
    this.sender = this.projectDetail.sender
    this.body = this.projectDetail.body
    // if (event.property === 'favorite') {
    //   alert('TODO:toggle favorite')
    // }
  }

  // TODO clickでもいいかも
  rowdbclick(row, column, event) {
    console.log(row)
    console.log(column)
    console.log(event)
  }

  // TODO 共通定数から読み込む // 不要かも
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

<style lang="scss">
.projectList {
  &__pageTitle {
    display: flex;
  }
  .fa-th-large {
    margin-top: 13px;
    margin-right: 5px;
  }
  &__buttons {
    margin-left: 200px;
    margin-bottom: 10px;
  }
}

.cap-col--prjtable {
  overflow-y: scroll;
  overflow-x: scroll;
  max-height: 771px;
}
.cap-col--prjdetail {
  .el-input {
    margin-bottom: 20px;
    width: 300px;
  }

  .el-textarea {
    margin-bottom: 20px;
    width: 300px;
    height: 300px;

    &__inner {
      height: 300px;
    }
  }
}

.inline-input {
  margin-left: 20px;
  margin-top: 20px;
  width: 15%;
}

.plain {
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

.fa-star {
  cursor: pointer;
  color: #000000;
}

.favo {
  color: #fcc603;
}
</style>
