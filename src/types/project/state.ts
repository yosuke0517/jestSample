import { ProjectData, ProjectDetail } from '~/types'

export interface ProjectState {
  projectData: ProjectData[]
  projectDetail: ProjectDetail
  loadingIndex: number
  isLast: boolean
}
