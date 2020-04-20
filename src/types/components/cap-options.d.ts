import { Vue } from 'nuxt-property-decorator'
export default class CapOptions extends Vue {
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
