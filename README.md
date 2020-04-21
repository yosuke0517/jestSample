# caprese_ui

> My glorious Nuxt.js project

## ローカルで動作確認（サーバレスポンス含む）する場合はモックを起動（`npm run mock:api`）する必要有り。

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# start mock server
$ npm run mock:api

# 規約違反のコードを自動的に修正（コミットする前に必ず実施する）←CIで実施するようにする
$ npm run lintfix

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

# フロントエンド開発ガイド

### ※本ガイドはマークダウン形式で記述しています。

### このドキュメントの目的

- 本書ではプロジェクトにおけるフロントエンド開発における詳細設計および実装方法に関する指針を示します。 基本設計担当者や実装担当者が、高い一貫性と論理性を備えた設計、実装をできるようにすることが本書の目的です。

### このドキュメントから得られるメリット

- 実装の統一性を高める

- 本書の内容に準じて設計を行うことで、実装の個人差を抑えることができ、システム全体で統一性の高いものにできます

# 設計の考慮抜けを抑える

- 設計者に対して、設計を行う上で考慮しておかなければならない留意点を喚起することで、考慮漏れを抑えられます

# 対象読者

- 以下を理解している。

  - [Vue.js ガイド ](https://jp.vuejs.org/v2/guide/index.html)
  - [Vuex ガイド ](https://vuex.vuejs.org/ja/)
  - [Nuxt.js ガイド ](https://ja.nuxtjs.org/guide/)

# アーキテクチャ

- Nuxt.js の SPA モードをベースとします。
- [全体図](https://drive.google.com/drive/folders/1aR6K3WKKSDHvnJ9IIc8Qm2z__NN-pjbk)参照

# コーディング規約

- [Vue 公式スタイルガイド](https://jp.vuejs.org/v2/style-guide/index.html)をベースとします。

# コンポーネント名

- プレフィックスとして`Cap`を付与します。

```javascript
@Component
export default class CapButton extends Vue {
  // ...
}
```

# コンポーネントのファイル名

- ファイル名はすべて`ケバブケース (kebab-case)` とします

```bash
components/
|- cap-button.vue
```

# コンポーネントの宣言

- コンポーネントの宣言は TypeScript(nuxt-property-decorator) デコレータによる class-style Vue components を用いることとします。

```HTML
<template>
  <button class="btn-primary" @click.prevent="handleClick">
    <slot></slot> (clicked - {{ count }})
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CapButton extends Vue {
  count = 0

  handleClick() {
    this.count++
  }
}
</script>

<style lang="scss">
.btn-primary {
  font-size: 1.2rem;
}
</style>
```

# テンプレート内でのコンポーネント名の形式

- テンプレート内でのコンポーネント名はすべてケバブケース (kebab-case) とします。

```HTML
<my-component></my-component>
```

# コンポーネント設計

- コンポーネントはその責務に分けて`Container Component` と `Presentational Component` に別けて設計します。

|                    | Presentational Components          | Container Components             |
| ------------------ | ---------------------------------- | -------------------------------- |
| 目的               | 見た目（マークアップ, スタイル）   | 動作（データの取得、状態の更新） |
| Store へのアクセス | できない                           | できる                           |
| データの読込       | Props                              | Vuex の State の Getter を呼ぶ   |
| データの変更       | Props から取得した Callback を呼ぶ | Vuex の Action を Dispatch する  |

### コンポーネント作成時の粒度

- `Atomic Design`を使用し、粒度を分けます。

| Category 　　　　　　 | Directory                | State 　　　　　 | Store へのアクセス | 責務 &nbsp;&nbsp;           |
| --------------------- | ------------------------ | ---------------- | ------------------ | --------------------------- |
| Atoms                 | src/components/atoms     | 持たない         | NG                 | Presentational 　 Component |
| Molecules             | src/components/molecules | 持つ             | NG                 | Presentational 　 Component |
| Organisms             | src/components/organisms | 持つ             | NG                 | Presentational 　 Component |
| Templates             | src/layouts              | 持つ             | OK                 | Container <br>Component     |
| Pages                 | src/pages                | 持つ             | OK                 | Container <br>Component     |

- 例）atoms(原子)
  - ボタンなどの UI 上の最小単位
- 例）molecules(分子)
  - 原子を複数持つもの
- 例）organisms(生体)
  - 複数の分子を組み合わせたもの

# 振る舞いの共通化

- `Presentational Components`内で API 呼び出しのための store へのアクセスをしてしまうと`Container Component`の役割も担うことになってしまいメンテナンスがしにくい。
- そんな場合は`対象のAPI呼び出し専用のContainer Component`を作成し、それを親コンポーネントとして配置することでイベントとプロパティの受け渡しが可能になる。

- 例）検索用ダイアログで動的に検索処理を走らせたい場面

  - ダイアログとしての見た目（Presentational）と検索処理（Container）を分ける

- こんなことがしたい時があると思います（`APIアクセスし検索すると仮定`）
  ![検索ダイアログ.gif](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/303093/ea328e3f-c499-a544-30df-19c46b41aa27.gif)

- こんな時は**<font color="Salmon">画面の描画部分と API コール(state への set）部分を分ける。</font>**

### ダイアログコンポーネント（Presentational）

- こちらは見た目の部分なので検索イベントを Emit するだけ、結果は Prop から受け取るようにする。

```HTML:src/components/organisms/dialog.vue
<template>
  <el-dialog
    title="得意先選択"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <cap-client-search-form
      :query="query"
      @search="search"
    ></cap-client-search-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hide">閉じる</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
//import 省略
@Component({
  components: {
    ClientSearchForm,
    ClientList
  }
} as ComponentOptions<Vue>)
export default class ClientSelectDialog extends Vue {
  /**
   * 表示フラグ
   */
  @Prop()
  visible

  /**
   * 検索結果
   */
  @Prop()
  result: PagedResources<Client[]> //2．

  resources = this.result

  query = {
    keyword: ''
  } as ClientFilter

  page = 0
  size = 10

  search(form: ClientFilter) {
    /**
     * 検索イベント
     * @type {object}
     */
    // eslint-disable-next-line
    this.$emit('search', form, { //1．
      page: 0
    } as PageRequest)
  }

  @Watch('result')
  handleResultChange() {
    this.resources = this.result
  }

}
</script>
```

- 1. Container へ検索 API のコールをしている（正しくは`お父さん、検索APIをコールしてね`というメソッド）
- 2. 検索結果がここに入ってくる

### API コール部分の Container コンポーネントを用意

```HTML:src/containers/search-container.vue

<template>
  <div>
    <!-- eslint-disable-next-line -->
    <slot :search="search" :result="result"></slot> 　//3．
  </div>
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import { ClientFilter } from '~/store/domain/clients/actions'
import { Client, PagedResources, PageRequest } from '~/types'

@Component({})
export default class Search extends Vue {
  @Getter('domain/clients/search') result: PagedResources<Client[]> //4．

  async search(filter: ClientFilter, pageRequest: PageRequest) {
    // eslint-disable-next-line
    await this.$store.dispatch('domain/clients/search', { //5．
      filter,
      pageRequest
    })
  }
}
</script>

```

- 3. <slot> 要素を使用して子コンポーネントにイベントとプロパティを受け渡しができるようにする
- 4. 検索結果を取得する getter
- 5. 検索 API を呼び出すためのアクションを`store`へディスパッチする

# 使いたい場所へ配置する

- 検索ダイアログを配置するとしたら何かのフォーム部品とかになるかと思うのでそんなイメージ
- コンテナでラップする
- v-slot で定義した名前を利用して親コンポーネントからスロットプパティを受け取る

```HTML:src/components/organisms/なんとかform.vue
<search-container v-slot="scope">
  <dialog
    :visible.sync="clientSelectDialogVisible"
    :result="scope.result"
    @search="scope.search"
    @select="handleClientSelect"
  ></dialog>
</search-container>
```

# ページのローディング処理

- element ui のローディングを使用する

```javascript
import { Vue } from 'nuxt-property-decorator'
export default class CapOptions extends Vue {
  readonly searchRadioOptions: string[]
  readonly termRadioOptions: string[]
  readonly termSearchOptions: string[]
  /**
   * ローディングオプション
   */
  readonly loadingOptions: {
    lock: boolean
    text: string
    spinner: string
    background: string
  }
}

```

- 基本的には API 呼出し時に使用するが、その他処理待ちが発生する時にも使用すること
- 使用方法は以下

```
// CapOptionsをimport
import { CapOptions } from '~/components/atoms/cap-options'

// mixinsに登録
@Component({})
export default class IndexPage extends mixins(CapOptions) {
  // ローディングスタート
  const loading = this.$loading(this.loadingOptions)

  // APIアクセスのfinallyで閉じる
  await Promise.all([
    this.$store.dispatch('project/incrementLoadingIndex'),
    this.$store.dispatch(
      'project/getProjectsData',
      this.$store.state.project.loadingIndex
    )
  ])
  .catch((error: AxiosError) => {
    this.addError(error)
  })
  .finally(() => {
    loading.close()
  })
}
```

# スタイルシート

- Scoped CSS および SCSS 記法を使用します。

```HTML
<template>
  <button class="button button-close">X</button>
</template>

<style lang="scss" scoped>
.button {
  border: none;
  border-radius: 2px;
}

.button-close {
  background-color: red;
}
</style>
```

# URL 設計

- URL はリソース名、一意の識別子、アクション名を使用して組み立てます。

| 画面 　　　　　　　　 | URL 　　　　　　　　　　　                   | 備考　　　　　　                                             |
| --------------------- | -------------------------------------------- | ------------------------------------------------------------ |
| 一覧・検索            | /resources?q=sample&page=1&size=10&sort=name | 検索条件やページング、ソートはクエリーパラメータを使用します |
| 詳細                  | /resources/:id                               | 持つ                                                         | :id は一意の識別子を使用します |
| 新規登録              | /resources/:id/new                           | 持つ                                                         | アクション名として new を使用します |
| 編集                  | /resources/:id/edit                          | アクション名として edit を使用します                         |
| 削除                  | /resources/:id/delete                        | 削除の前の確認画面を準備する場合など                         |
| 子リソース            | /resources/:id/comments                      | 関連するコメント一覧を表示する場合など                       |

# 入力チェック

- 入力チェックは Element UI の フォームバリデーション を使用します。

```HTML
<template>
  <!--1.-->
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    label-width="120px"
    label-position="left"
  >
    <!--2.-->
    <el-form-item label="顧客名" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="説明" prop="description">
      <el-input v-model="form.description" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="loading" @click="save">
        作成
      </el-button>
      <el-button @click="cancel">
        キャンセル
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Form as ElForm } from 'element-ui'

/**
 * 顧客新規作成フォーム
 * @author Takeshi Ogawa
 */
@Component({})
export default class CapClientCreateForm extends Vue {
  /**
   * 処理中フラグ
   */
  @Prop()
  loading: boolean

  // see https://github.com/spt110/vue-typescript-element-ui/issues/1
  $refs!: {
    form: ElForm
  }

  form = {
    name: '',
    description: ''
  }

  // eslint-disable-next-line
  <!--3.-->
  rules = {
    name: [
      { required: true, message: '入力必須です', trigger: 'blur' },
      { max: 100, message: '100 文字以内で入力してください', trigger: 'blur' }
    ],
    description: [
      { required: true, message: '入力必須です', trigger: 'blur' },
      { max: 500, message: '500 文字以内で入力してください', trigger: 'blur' }
    ]
  }

  save() {
    // eslint-disable-next-line
    // 4.
    this.$refs.form.validate((valid: boolean) => {
      if (valid) {
        /**
         * 保存イベント
         * @type {object}
         */
        this.$emit('save', this.form)
      } else {
        return false
      }
    })
  }

  cancel() {
    this.$router.push('/clients')
  }
}
</script>
```

- 1. Form コンポーネントの rules 属性に検証ルールを指定します
- 2. 検証対象には Form-Item の prop 属性を指定します
- 3. 検証ルールを定義します
- 4. 送信時にルールを検証します

- Element UI のフォームバリデーションは async-validator を使用します。詳細は[github](https://github.com/yiminghe/async-validator)

# 相関チェック

- 複数の入力項目の相関関係によって検証が必要になるようなケースは検証用の関数をカスタマイズします。

```javascript
form = {
  newPassword: '',
  newPasswordConfirm: ''
}

rules = {
  newPassword: [
    { required: true, message: i18n.tc('err1'), trigger: 'blur' },
    {
      min: 8,
      max: 50,
      message: editMessage(i18n.tc('err3'), ['8', '50']),
      trigger: 'blur'
    }
  ],
  newPasswordConfirm: [
    { required: true, message: i18n.tc('err1'), trigger: 'blur' },
    { validator: this.matchPassword, trigger: 'blur' } // 1.
  ]
}

// 2.
matchPassword(rule, value, callback) {

  if (value !== this.form.newPassword) {
    callback(new Error(i18n.tc('err4')))
  } else {
    callback()
  }
}
```

- 1. `validator` に検証用の関数を指定します
- 2. 別の項目の入力内容に応じたチェック処理を記述します

# 非同期バリデーション

- API コールが必要な入力チェックはカスタマイズした検証用の関数で Store のアクションをディスパッチします。

```javascript
// eslint-disable-next-line
validateEmailExists(rule, value, callback) { // 1.
  this.$store
    .dispatch('users/search', { email: value }) // 2.
    .then(() => {
      // eslint-disable-next-line
      if (this.result.page.totalElements === 0) { // 3.
        callback()
      } else {
        callback(new Error('すでに使用されているメールアドレスです'))
      }
    })
    .catch(error => {
      callback(new Error(error))
    })
}
```

- 1. 検証用の関数をカスタマイズします
- 2. Store のアクションをディスパッチして API コールします
- 3. API の結果に応じて検証結果を判定します

```javascript
rules = {
  email: [
    { required: true, message: '入力必須です', trigger: 'blur' },
    {
      type: 'email',
      message: '正しいメールアドレスを入力してください',
      trigger: 'blur'
    },
    { max: 100, message: '100 文字以内で入力してください', trigger: 'blur' },
    { validator: this.validateEmailExists, trigger: 'blur' } // 4.
  ]
}
```

- 4. `validator` に検証用の関数を指定します

# Store

- 状態の分類
  - AppState: API から取得したデータ（案件情報など）
  - UIState: UI の状態を表すデータ（ダイアログが表示されているかなど）

### Store で管理する状態

- Store で管理する状態は前述の AppState とし、UIState は 各 Component で管理します。

### モジュール分割

- store は機能（ドメイン）ごとに分割し以下のファイルを作成します

```bash
actions.ts    // APIアクセス
getters.ts    // ゲッター
index.ts      // export用
mutations.ts  // ミューテーション
```

# 環境変数

- 開発環境、検証環境、本番環境などの実行環境ごとに異なる設定値は環境変数として定義します。 環境変数は /config 配下に`envファイル`を準備します。

```bash
config
├── env.development.ts
├── env.staging.ts
└── env.production.ts
```

- `envファイル`は以下のように定義します。

```javascript
module.exports = {
  LoginUrl: 'http://localhost:9000',
  apiBaseUrl: 'http://localhost:8080'
}
```

- 使用する際は以下のようにします

```HTML
process.env.apiBaseUrl
```

# エラーハンドリング

- API 呼び出し時のエラー
- `CapErrorMessageBase`を import し、mixins として登録します。
  // エラーハンドリングで使用する共通コンポーネントを作ります。
  // TODO 以下を作成
- atoms 配下
  - cap-error-message.vue
  - cap-error-message-base.ts

```

```

- `AxiosError`で受け取り、エラーメッセージを表示します。
- `this.addError(error)`の引数 error には基本的にサーバーから受け取ったエラーコードとエラーメッセージ ID が入る想定

```javascript
import { CapErrorMessageBase, CapErrorMessage } from '~/components/atoms'
export default class JuMove extends mixins(CapErrorMessageBase) {
  async hoge(){
    await this.$store
      .dispatch('hoge/update', this.treeData, form)
      .catch((error: AxiosError) => {
        // 各ページで行うエラーハンドリングはこれだけ
        this.addError(error)
      })
      .finally(() => {
        loading.close()
      })
```

# ユニットテスト

- 検討中（3 月中に執筆予定）
