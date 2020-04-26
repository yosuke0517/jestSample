import { MutationTree } from 'vuex'
import { ProjectState } from '~/types/project/state'

const mutations: MutationTree<ProjectState> = {
  projectsDataMutation(state, { projectData }) {
    if (!state.projectData) {
      state.projectData = projectData
    } else {
      projectData.forEach((item) => {
        state.projectData.push(item)
      })
    }
  },
  projectsDetailMutation(state, { projectDetail }) {
    state.projectDetail = projectDetail
  },
  loadingIndexMutation(state) {
    state.loadingIndex++
  },
  isLastMutation(state, { value }) {
    state.isLast = value
  }
}

export default mutations
