import { ActionTree } from 'vuex'
import { ProjectData, ProjectDetail } from '~/types/project'
import { ProjectState } from '~/types/project/state'
import { RootState } from '~/types/state'
import ROUTES from '~/routes/api'
import '@nuxtjs/axios'

const actions: ActionTree<ProjectState, RootState> = {
  async getProjectsData({ commit }, filter) {
    let url
    if (process.env.NODE_ENV === 'development') {
      if (filter === 0) {
        url = ROUTES.GET.PROJECTLIST
      } else {
        url = ROUTES.GET.PROJECTLIST + filter
      }
      const response = await this.$axios.$get<ProjectData>(url)
      commit('projectsDataMutation', { projectData: response })
    } else {
      const response = await this.$axios.$get<ProjectData>(
        ROUTES.GET.PROJECTLIST,
        filter
      )
      commit('projectsDataMutation', { projectData: response })
    }
  },
  async getProjectsDetail({ commit }, id) {
    const response = await this.$axios.$get<ProjectDetail>(
      '/projects/detail/' + id
    )
    // TODO 現状モック用のためパスパラメータでgetするように修正が必要
    commit('projectsDetailMutation', { projectDetail: response })
  }
}

export default actions
