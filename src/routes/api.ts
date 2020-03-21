export const ROUTES = {
  GET: {
    PROJECTS: '/api/projects',
    DETAIL: '/api/detail/:id',
    FAVORITE: '/api/favorite'
  },
  POST: {
    ENTRY: '/api/entry/:id/',
    TOGGLE_FAVORITE: '/api/favorite/:id/toggle'
  }
}
export default ROUTES
