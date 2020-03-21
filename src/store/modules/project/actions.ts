import { ActionTree } from 'vuex'
import { ProjectData } from '~/types/project'
import { ProjectState } from '~/types/project/state'
import { RootState } from '~/types/state'
import '@nuxtjs/axios'

const actions: ActionTree<ProjectState, RootState> = {
  async getProjectsData({ commit }) {
    const response = await this.$axios.$get<ProjectData>(`/project/list`)
    console.log('response')
    console.log(response)
    commit('projectsDataMutation', { projectData: response })
  }

  // async getdetail({ commit }) {
  //   const response = await this.$axios.$post<ProjectDetail>('/project/detail')
  // }
}

export default actions
