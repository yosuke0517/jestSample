import { GetterTree } from 'vuex'
import { CommonState } from '~/types/common/state'
import { RootState } from '~/types/state'

const getters: GetterTree<CommonState, RootState> = {
  isLoading: (state) => state.isLoading
}

export default getters
