import { ADD_NOTE, EDIT_NOTE, REMOVE_NOTE, RESTORE_NOTE, ACTIVE, DELETED } from '../actions/actions'

let notesInLocalStorage = JSON.parse(localStorage.getItem("notes"))
let newNotes = []

function notesReducer(notes = notesInLocalStorage ? notesInLocalStorage : [], action) {
  switch (action.type) {
    case ADD_NOTE:
      newNotes = [
        ...notes,
        {
          id: action.id,
          title: action.title,
          content: action.content,
          status: action.status,
          tags: action.tags,
          due_date: action.due_date,
          created_at: action.created_at
        }
      ]
      localStorage.setItem("notes", JSON.stringify(newNotes))
      return newNotes
    case EDIT_NOTE:
      newNotes = notes.filter((note) => {
        if (note.id === action.id) {
          note.title = action.title
          note.content = action.content
          note.tags = action.tags
          note.due_date =  action.due_date
        }
        return true
      })
      // newNotes = [
      //   ...notes,
      //   {
      //     id: action.id,
      //     title: action.title,
      //     content: action.content,
      //     status: action.status,
      //     tags: action.tags,
      //     due_date: action.due_date,
      //     created_at: action.created_at
      //   }
      // ]
      localStorage.setItem("notes", JSON.stringify(newNotes))
      return newNotes
    case REMOVE_NOTE:
      newNotes = notes.map(note => note.id === action.id ? { ...note, status: DELETED } : note)
      localStorage.setItem("notes", JSON.stringify(newNotes))
      return newNotes
    case RESTORE_NOTE:
      newNotes = notes.map(note => note.id === action.id ? { ...note, status: ACTIVE } : note)
      localStorage.setItem("notes", JSON.stringify(newNotes))
      return newNotes

    default:
      return notes
  }
}

export default notesReducer