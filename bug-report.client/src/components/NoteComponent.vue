<template>
  <div class="row" :class="colorSwitch()">
    <div class="col-3">
      <h5>{{ note.creator.nickname }}</h5>
    </div>
    <div class="col-6">
      <h5>{{ note.content }}</h5>
    </div>
    <div class="col-3 text-center">
      <i class="fa fa-trash-o text-danger pointer" data-toggle="modal" :data-target="'#id' + note._id" aria-hidden="true"></i>
    </div>
  </div>
  <confirm-component :confirm="{name: 'note', id: note._id}" />
</template>

<script>
import { reactive } from 'vue'
import { AppState } from '../AppState'

export default
{
  name: 'NoteComponent',
  props: {
    note: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
    })
    return {
      state,
      colorSwitch() {
        const num = AppState.notes.findIndex(n => n._id === props.note._id)
        if (num % 2 === 0) {
          return 'dark'
        } else {
          return 'light'
        }
      }
    }
  }
}
</script>

<style>

</style>
