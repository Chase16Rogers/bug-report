import { AppState } from '../AppState'
import { api } from './AxiosService'
import router from '../router'
class BugsService {
  async getAllBugs() {
    const res = await api.get('api/bugs')
    AppState.bugs = res.data
  }

  async getActiveBug(id) {
    // console.log(id)
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async createBug(data) {
    const res = await api.post('api/bugs', data)
    AppState.bugs.push(res.data)
    router.push({ name: 'ActiveBug', params: { id: res.data._id } })
  }

  async editBug(id, data) {
    const res = await api.put('api/bugs/' + id, data)
    AppState.activeBug = []
    AppState.activeBug.push(res.data)
  }

  async closeBug(id) {
    const data = { closed: true }
    AppState.activeBug[0].closed = true
    await api.put('api/bugs/' + id, data)
  }
}
export const bugsService = new BugsService()
