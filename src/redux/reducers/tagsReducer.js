import { ADD_TAG, REMOVE_TAG } from '../actions/actions'

let tagsInLocalStorage = JSON.parse(localStorage.getItem("tags"))
let newTags = []

function tagsReducer(tags = tagsInLocalStorage ? tagsInLocalStorage : [{
  id: 0,
  tagname: "Untagged"
}], action) {
  switch (action.type) {
    case ADD_TAG:
      newTags = [
        ...tags,
        {
          id: action.id,
          tagname: action.tagname,
        }
      ]
      localStorage.setItem("tags", JSON.stringify(newTags))
      return newTags
    case REMOVE_TAG:
      newTags = tags.filter(note => note.id !== action.id)
      localStorage.setItem("tags", JSON.stringify(newTags))
      return newTags

    default:
      return tags
  }
}

export default tagsReducer