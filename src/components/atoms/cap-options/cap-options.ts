import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CapOptions extends Vue {
  readonly options = {
    /** ローディングオプション */
    loading: {
      lock: true,
      text: '処理中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    }
  }

  // ---------------------------
  // computed
  // ---------------------------
  /**
   * ローディングオプション
   */
  get loadingOptions() {
    return this.options.loading
  }
}
