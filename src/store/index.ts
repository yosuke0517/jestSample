import Vuex, { StoreOptions } from 'vuex'
import { RootState } from '~/types/state'
import project from '~/store/modules/project'

const storeOptions: StoreOptions<RootState> = {
  modules: {
    project
  }
}

const store = () => new Vuex.Store<RootState>(storeOptions)
export default store
