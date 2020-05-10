import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import Vuex from 'vuex'
import { createLocalVue } from '@vue/test-utils'
import { cloneDeep } from 'lodash'
import state from '~/store/modules/project/index'
import mutations from '~/store/modules/project/mutations'
import actions from '~/store/modules/project/actions'

// beforeEachで毎回Storeを生成するためにstoreを定義
const initStore = () => {
  return cloneDeep({
    state,
    mutations,
    actions
  })
}

describe('Project Modules Test', () => {
  let store
  let localValue

  beforeEach(() => {
    // eslint-disable-next-line
    localValue = createLocalVue()
    localValue.use(Vuex)
    store = new Vuex.Store(initStore())
    store.$axios = axios // @nuxtjs/axiosの代わりにaxiosを注入
  })

  const mock = new MockAdapter(axios)
  // テスト事にモックの内容をリセットするように登録する。
  // こうしないとモック内のレスポンスデータがク リアされないまま次のテストに引き継がれてしまう
  afterEach(() => {
    mock.reset()
  })

  it('get project：ID of the first data must be 1', async () => {
    const PROJECT_LIST = require('~/api/mocks/get-item.json')
    // mockを用意
    mock.onGet('/projects/list').reply(200, PROJECT_LIST['projects/list'])
    await store.dispatch('getProjectsData', 0)
    expect(store.state.projectData.data[0].id).toBe(1)
  })

  it('get projectDetail: ID must be 1', async () => {
    const PROJECT_DETAIL = require('~/api/mocks/get-detail.json')

    mock
      .onGet('/projects/detail/1')
      .reply(200, PROJECT_DETAIL['projects/detail'][0])
    await store.dispatch('getProjectsDetail', 1)
    expect(store.state.projectDetail.data.id).toBe(1)
  })
})
