import { SHOW_ACTIVE, SHOW_DELETED, ACTIVE, DELETED } from '../actions/actions'

function visibilityReducer(visibility = ACTIVE, action) {
  switch (action.type) {
    case SHOW_ACTIVE:
      return ACTIVE
    case SHOW_DELETED:
      return DELETED

    default:
      return visibility
  }
}

export default visibilityReducer