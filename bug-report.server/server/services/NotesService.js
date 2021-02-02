import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getAll(query = {}) {
    const res = await dbContext.Notes.find(query)
    if (!res) {
      throw new BadRequest('ERROR 404 Note COULD NOT BE FOUND')
    }
    return res
  }

  async getOne(query) {
    const res = await dbContext.Notes.find(query)
    if (!res) {
      throw new BadRequest('ERROR 404 Note COULD NOT BE FOUND')
    }
    return res
  }

  async create(data) {
    const res = await dbContext.Notes.create(data)
    if (!res) {
      throw new BadRequest('ERROR 404 Note COULD NOT BE FOUND')
    }
    return res
  }

  async edit(query, data) {
    const res = await dbContext.Notes.findOneAndUpdate(query, data, { new: true })
    if (!res) {
      throw new BadRequest('ERROR 404 Note COULD NOT BE FOUND')
    }
    return res
  }

  async delete(query) {
    const res = await dbContext.Notes.findOneAndDelete(query)
    if (!res) {
      throw new BadRequest('ERROR 404 Note COULD NOT BE FOUND')
    }
    return 'It done been deleted boss'
  }
}
export const notesService = new NotesService()
