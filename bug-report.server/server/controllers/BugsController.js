import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id/notes', this.getNotes)
      .get('/:id', this.getOne)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      res.send(await bugsService.getAll())
    } catch (error) {
      next(error)
    }
  }

  async getNotes(req, res, next) {
    try {
      const search = { bugId: req.params.id }
      res.send(await notesService.getAll(search))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const search = { _id: req.params.id }
      res.send(await bugsService.getOne(search))
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const data = req.body
      data.creatorId = req.userInfo.id
      data.creator = req.userInfo
      res.send(await bugsService.create(data))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const data = req.body
      data.creatorId = req.userInfo.id
      console.log('edit req' + req.body)
      const query = { _id: req.params.id, creatorId: req.userInfo.id }
      res.send(await bugsService.edit(query, data))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const query = { _id: req.params.id, creatorId: req.userInfo.id }
      res.send(await bugsService.delete(query))
    } catch (error) {
      next(error)
    }
  }
}
