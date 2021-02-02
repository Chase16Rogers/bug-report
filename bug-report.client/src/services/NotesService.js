import { AppState } from '../AppState'
import { api } from './AxiosService'

class NotesService {
  async getNotes(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    AppState.notes = res.data
  }

  async createNote(data) {
    const res = await api.post('api/notes', data)
    AppState.notes.push(res.data)
  }

  async deleteNote(id) {
    await api.delete('api/notes/' + id)
    const index = AppState.notes.findIndex(n => n._id === id)
    AppState.notes.splice(index, 1)
  }
}
export const notesService = new NotesService()
