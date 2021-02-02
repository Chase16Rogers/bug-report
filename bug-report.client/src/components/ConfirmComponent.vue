<template>
  <!-- Modal -->
  <div class="modal fade"
       :id="'id' + confirm.id"
       tabindex="-1"
       role="dialog"
       aria-labelledby="exampleModalCenterTitle"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">
            {{ drawConfirm(confirm.name) }}
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button type="button" @click="affirmativeAction(confirm.name)" data-dismiss="modal" class="btn btn-primary">
            Confirm
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { useRoute } from 'vue-router'
import { logger } from '../utils/Logger'
import $ from 'jquery'
import { notesService } from '../services/NotesService'
export default {
  name: 'ConfirmComponent',
  props: {
    confirm: { type: Object, required: true }
  },
  setup(props) {
    const route = useRoute()
    const state = reactive({

    })
    return {
      state,
      drawConfirm(name) {
        switch (name) {
          case 'bug':
            return 'Are you sure you want to close this bug?'
          case 'note':
            return 'Are you sure you want to delete this note?'
        }
      },
      async affirmativeAction(name) {
        switch (name) {
          case 'bug':
            try {
              await bugsService.closeBug(route.params.id)
              $('#id' + route.params.id).modal('hide')
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
      }

    }
  }
}
</script>

<style>

</style>
