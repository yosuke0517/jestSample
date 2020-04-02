import { ActionTree } from 'vuex'
import { ProjectData } from '~/types/project'
import { ProjectState } from '~/types/project/state'
import { RootState } from '~/types/state'
import ROUTES from '~/routes/api'
import '@nuxtjs/axios'

const actions: ActionTree<ProjectState, RootState> = {
  async getProjectsData({ commit }) {
    const response = await this.$axios.$get<ProjectData>(ROUTES.GET.PROJECTLIST)
    commit('projectsDataMutation', { projectData: response })
  }
}

export default actions
