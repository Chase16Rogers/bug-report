import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAll(query = {}) {
    const res = await dbContext.Bugs.find(query)
    if (!res) {
      throw new BadRequest('ERROR 404 BUG COULD NOT BE FOUND')
    }
    return res
  }

  async getOne(query) {
    const res = await dbContext.Bugs.find(query)
    if (!res) {
      throw new BadRequest('ERROR 404 BUG COULD NOT BE FOUND')
    }
    return res
  }

  async create(data) {
    const res = await dbContext.Bugs.create(data)
    if (!res) {
      throw new BadRequest('ERROR 404 BUG COULD NOT BE FOUND')
    }
    return res
  }

  async edit(query, data) {
    const res = await dbContext.Bugs.findOneAndUpdate(query, data, { new: true })
    if (!res) {
      throw new BadRequest('ERROR 404 BUG COULD NOT BE FOUND')
    }
    return res
  }

  async delete(query) {
    const res = await dbContext.Bugs.findOneAndDelete(query)
    if (!res) {
      throw new BadRequest('ERROR 404 BUG COULD NOT BE FOUND')
    }
    return 'It done been deleted boss'
  }
}
export const bugsService = new BugsService()
