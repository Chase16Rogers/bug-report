<template>
  <div class="modal fade"
       :id="create.name"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <form @submit.prevent="createBug()">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Create a new {{ create.name }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>Title</h3>
            <input type="text"
                   class="border-0 nice"
                   id="title"
                   name="title"
                   v-model="state.title"
                   required
                   placeholder="title..."
            >
            <h3>Bug Description</h3>
            <input type="text"
                   class="wide"
                   id="description"
                   name="description"
                   v-model="state.description"
                   required
                   placeholder="description..."
            >
          </div>
          <div class="modal-footer">
            <button type="button" @click="cancel()" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'CreateComponent',
  props: {
    create: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      title: '',
      description: ''
    })
    return {
      state,
      async createBug() {
        const data = { title: state.title, description: state.description }
        $('#bug').modal('hide')
        this.cancel()
        try {
          await bugsService.createBug(data)
        } catch (error) {
          logger.error(error)
        }
      },
      cancel() {
        state.title = ''
        state.description = ''
      }
    }
  }
}
</script>

<style>

</style>
