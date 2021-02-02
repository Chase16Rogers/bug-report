import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  bugs: [],
  activeBug: [],
  notes: [],
  allBugs: [],
  show: false,
  skip: 0
})
