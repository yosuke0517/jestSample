import { Module } from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import { ProjectState } from '~/types/project/state'
import { RootState } from '~/types/state'

const state: ProjectState = {
  projectData: null,
  projectDetail: null,
  loadingIndex: 0,
  isLast: false
}

const project: Module<ProjectState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

export default project
