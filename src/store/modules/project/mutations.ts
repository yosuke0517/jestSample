import { MutationTree } from 'vuex'
import { ProjectState } from '~/types/project/state'

const mutations: MutationTree<ProjectState> = {
  projectsDataMutation(state, { projectData }) {
    state.projectData = projectData
  }
}

export default mutations
