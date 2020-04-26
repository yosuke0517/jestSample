import { MutationTree } from 'vuex'
import { CommonState } from '~/types/common/state'

const mutations: MutationTree<CommonState> = {
  isLoadingMutation(state, value) {
    state.isLoading = value
  }
}

export default mutations
