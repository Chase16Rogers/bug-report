<template>
  <div class="modal fade"
       :id="'ed' + edit.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <form @submit.prevent="editor(edit.name)">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              {{ drawEdit(edit.name) }}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <h3>Edit Text Below</h3>
            <input type="text"
                   class="wide text-wrap"
                   id="editIn"
                   name="editIn"
                   v-model="state.editData"
                   required
                   textarea
            >
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">
              Save changes
            </button>
            <button type="button" @click="cancel()" class="btn btn-secondary" data-dismiss="modal">
              Close
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
import { notesService } from '../services/NotesService'
import { bugsService } from '../services/BugsService'
import { AppState } from '../AppState'
import $ from 'jquery'
export default {
  name: 'EditComponent',
  props: {
    edit: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      editData: props.edit.body
    })
    return {
      state,
      drawEdit(name) {
        switch (name) {
          case 'bug':
            return 'Edit bug'
          case 'note':
            return 'Edit note'
        }
      },
      async editor(name) {
        switch (name) {
          case 'bug':
            try {
              console.log('here')
              $('#ed' + props.edit.id).modal('hide')
              const data = { description: state.editData }
              await bugsService.editBug(props.edit.id, data)
              AppState.show = true
              this.cancel()
            } catch (error) {
              logger.error(error)
            }
            break
          case 'note':
            try {
              await notesService.deleteNote(props.confirm.id)
            } catch (error) {
              logger.error(error)
            }
        }
      },
      cancel() {
        state.edit = ''
      }
    }
  }
}
</script>

<style>

</style>
