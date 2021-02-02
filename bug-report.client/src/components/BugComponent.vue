<template>
  <div class="row bug-border" :class="colorSwitch()">
    <div class="col-3 d-flex align-items-center">
      <router-link class="text-dark" :to="{name: 'ActiveBug', params: {id: bug._id}}">
        <h4>{{ bug.title }}</h4>
      </router-link>
    </div>

    <div class="col-3 d-flex align-items-center">
      <h4>{{ bug.creator.name }}</h4>
    </div>

    <div class="col-3 d-flex align-items-center">
      <h4 :class="state.color">
        {{ closedToggle() }}
      </h4>
    </div>

    <div class="col-3 d-flex align-items-center">
      <h4>
        {{ update() }}
      </h4>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'BugComponent',
  props: {
    bug: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      color: '',
      skip: computed(() => AppState.skip)
    })
    onMounted(() => {

    })
    return {
      state,
      update() {
        const lastModArr = props.bug.updatedAt.split('T')
        const numsArr = lastModArr[0].split('-')
        const lastMod = (numsArr[1] + '/' + numsArr[2] + '/' + numsArr[0])
        return lastMod
      },
      closedToggle() {
        if (props.bug.closed) {
          state.color = 'red'
          return 'closed'
        } else {
          state.color = 'green'
          return 'open'
        }
      },
      colorSwitch() {
        const num = AppState.bugs.findIndex(b => b._id === props.bug._id)
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
.red{
  color: red;
}
.green{
  color:green;
}

</style>
