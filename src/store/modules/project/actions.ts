import { ActionTree } from 'vuex'
import { ProjectData, ProjectDetail } from '~/types/project'
import { ProjectState } from '~/types/project/state'
import { RootState } from '~/types/state'
import ROUTES from '~/routes/api'
import '@nuxtjs/axios'

const actions: ActionTree<ProjectState, RootState> = {
  async getProjectsData({ commit }, filter) {
    console.log(filter)
    const response = await this.$axios.$get<ProjectData>(ROUTES.GET.PROJECTLIST)
    commit('projectsDataMutation', { projectData: response })
  },
  async getProjectsDetail({ commit }, id) {
    const response = await this.$axios.$get<ProjectDetail>(
      '/projects/detail/' + id
    )
    // TODO 現状モック用のためパスパラメータでgetするように修正が必要
    commit('projectsDetailMutation', { projectDetail: response })
  },
  incrementLoadingIndex({ commit }) {
    commit('loadingIndexMutation')
  }
}

export default actions
