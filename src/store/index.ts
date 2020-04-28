import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '~/types/state'
import project from '~/store/modules/project'
import common from '~/store/modules/common'

const storeOptions: StoreOptions<RootState> = {
  modules: {
    project,
    common
  }
}

const store = () => new Vuex.Store<RootState>(storeOptions)
export default store
