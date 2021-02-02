<template>
  <div class="container container-color" v-if="state.show">
    <div class="row mt-3">
      <div class="col">
        <h5 class="mb-0">
          Title
        </h5>
        <h2>{{ state.active[0].title }}</h2>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6 d-flex align-items-center">
        <h5>Reported By:</h5>
        <h3 class="ml-3 mb-3">
          {{ state.active[0].creator.nickname }}
        </h3>
      </div>
      <div class="col-6 d-flex align-items-end">
        <h5>Status:</h5>
        <h3>{{ status(state.active[0].closed) }}</h3>
      </div>
    </div>
    <div class="row justify-content-end">
      <div v-if="!state.active[0].closed" class="col offset-6">
        <button data-toggle="modal" :data-target="'#id' + state.active[0]._id" class="btn btn-danger">
          Close
        </button>
        <confirm-component :confirm="{name: 'bug', id: state.active[0]._id}" />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col d-flex">
        <h3 class="mb-0">
          Description
        </h3>
        <i v-if="!state.active[0].closed" class="fa fa-pencil align-self-center fa-2x ml-2 pointer" data-toggle="modal" :data-target="'#ed' + state.active[0]._id" aria-hidden="true"></i>
      </div>
      <edit-component :edit="{name: 'bug', id: state.active[0]._id, body: state.active[0].description}" />
    </div>
    <div class="row">
      <div class="col m-2 border border-dark rounded p-2">
        <h5>{{ state.active[0].description }}</h5>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>Notes</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <h4>Name</h4>
      </div>
      <div class="col-6">
        <h4>Message</h4>
      </div>
      <div class="col-3 text-center">
        <h4>Delete</h4>
      </div>
    </div>
    <note-component v-for="note in state.notes" :key="note._id" :note="note" />
    <div class="row">
      <div class="col">
        <button class="btn btn-success" data-toggle="modal" data-target="#createNote">
          Add Note
        </button>
        <create-note-component :create="state.active[0]._id" />
      </div>
    </div>
  </div>
  <div class="container-fluid" v-else>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <i class="fa fa-circle-o-notch fa-spin mt-5" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import ConfirmComponent from '../components/ConfirmComponent.vue'

export default {
  components: { ConfirmComponent },
  name: 'ActiveBug',

  setup() {
    const route = useRoute()
    const state = reactive({
      active: computed(() => AppState.activeBug),
      notes: computed(() => AppState.notes),
      show: computed(() => AppState.show)
    })
    onMounted(async() => {
      try {
        console.log(route.params.id)
        await bugsService.getActiveBug(route.params.id)
        await notesService.getNotes(route.params.id)
        AppState.show = true
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      status(bool) {
        console.log(bool)
        if (bool) {
          return 'closed'
        } else {
          return 'open'
        }
      }

    }
  }
}
</script>

<style>

</style>
