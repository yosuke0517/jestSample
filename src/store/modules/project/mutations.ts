import { MutationTree } from 'vuex'
import { ProjectState } from '~/types/project/state'

const mutations: MutationTree<ProjectState> = {
  projectsDataMutation(state, { projectData }) {
    state.projectData = projectData
  },
  projectsDetailMutation(state, { projectDetail }) {
    state.projectDetail = projectDetail
  },
  loadingIndexMutation(state) {
    state.loadingIndex++
  }
}

export default mutations
