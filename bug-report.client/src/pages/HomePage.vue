<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body d-flex flex-column">
            <div class="d-flex align-items-end">
              <h2 class="mb-0">
                Report a bug
              </h2>
              <i class="fa fa-plus-square-o fa-2x ml-3 pointer" aria-hidden="true" data-toggle="modal" data-target="#bug"></i>
            </div>
            <button v-if="state.hide" class="btn btn-outline-secondary align-self-end" @click="hideClosed()">
              Hide Closed
            </button>
            <button v-else class="btn btn-outline-secondary align-self-end" @click="showClosed()">
              Show Closed
            </button>
          </div>
        </div>
        <create-component :create="{name: 'bug'}" />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="row bug-border">
              <div class="col-3">
                <h4>Title</h4>
              </div>
              <div class="col-3">
                <h4>Reported By</h4>
              </div>
              <div class="col-3">
                <h4>Status</h4>
              </div>
              <div class="col-3">
                <h4>Last Modified</h4>
              </div>
            </div>
            <div v-if="state.spin">
              <bug-component v-for="bug in state.bugs" :key="bug._id" :bug="bug" />
            </div>
            <div class="mt-5" v-else>
              <h3>Make sure you're logged in if you want to see any bugs</h3>
              <i class="fa fa-circle-o-notch fa-spin ml-2" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, watch } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
export default {
  name: 'Home',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account),
      spin: false,
      hide: true
    })
    watch(() => state.account, async() => {
      try {
        await bugsService.getAllBugs()
        state.spin = true
      } catch (error) {
        logger.error(error)
      }
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
        state.spin = true
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      hideClosed() {
        AppState.allBugs = AppState.bugs
        AppState.bugs = AppState.bugs.filter(b => b.closed !== true)
        state.hide = false
      },
      showClosed() {
        AppState.bugs = AppState.allBugs
        state.hide = true
      }
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
