import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      const data = req.body
      data.creatorId = req.userInfo.id
      data.creator = req.userInfo
      res.send(await notesService.create(data))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const data = req.body
      data.creatorId = req.userInfo.id
      const query = { _id: req.params.id, creatorId: req.userInfo.id }
      res.send(await notesService.edit(query, data))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const query = { _id: req.params.id, creatorId: req.userInfo.id }
      res.send(await notesService.delete(query))
    } catch (error) {
      next(error)
    }
  }
}
