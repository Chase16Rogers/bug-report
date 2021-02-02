<template>
  <div class="modal fade"
       id="createNote"
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
              Create a new note
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>Write your note here</h3>
            <input type="text"
                   class="border-0 nice"
                   id="content"
                   name="content"
                   v-model="state.content"
                   required
                   placeholder="content..."
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
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { notesService } from '../services/NotesService'
export default {
  name: 'CreateNoteComponent',
  props: {
    create: { type: String, required: true }
  },
  setup(props) {
    const state = reactive({
      content: ''
    })
    return {
      state,
      async createBug() {
        const data = { content: state.content, bugId: props.create }
        $('#createNote').modal('hide')
        this.cancel()
        try {
          await notesService.createNote(data)
        } catch (error) {
          logger.error(error)
        }
      },
      cancel() {
        state.content = ''
      }
    }
  }
}
</script>

<style>

</style>
