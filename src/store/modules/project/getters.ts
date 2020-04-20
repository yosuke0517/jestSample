import { GetterTree } from 'vuex'
import { ProjectState } from '~/types/project/state'
import { RootState } from '~/types/state'

const getters: GetterTree<ProjectState, RootState> = {
  projectData: (state) => state.projectData,
  projectDetail: (state) => state.projectDetail
}

export default getters
