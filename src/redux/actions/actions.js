import moment from "moment"

export const ADD_NOTE = 'ADD_NOTE'
export const EDIT_NOTE = 'EDIT_NOTE'
export const REMOVE_NOTE = 'REMOVE_NOTE'
export const RESTORE_NOTE = 'RESTORE_NOTE'

export const ADD_TAG = 'ADD_TAG'
export const REMOVE_TAG = 'REMOVE_TAG'

export const ACTIVE = 'ACTIVE'
export const DELETED = 'DELETED'

export const SHOW_ACTIVE = 'SHOW_ACTIVE'
export const SHOW_DELETED = 'SHOW_DELETED'

export function addNote(title, content, tags, dueDate) {
  return {
    id: '_' + Math.random().toString(36).substr(2, 9),
    type: ADD_NOTE,
    title: title,
    content: content,
    status: ACTIVE,
    tags: tags.length > 0 ? tags : ["Untagged"],
    due_date: dueDate,
    created_at: moment().format("YYYY-MM-DD HH:mm")
  }
}

export function editNote(id, title, content, tags, due_date) {
  return { type: EDIT_NOTE, id, title, content, tags, due_date }
}

export function removeNote(id) {
  return { type: REMOVE_NOTE, id: id }
}

export function restoreNote(id) {
  return { type: RESTORE_NOTE, id: id }
}

export function showActiveNotes() {
  return { type: SHOW_ACTIVE }
}

export function showDeletedNotes() {
  return { type: SHOW_DELETED }
}

export function addTag(tagname) {
  return {
    id: '_' + Math.random().toString(36).substr(2, 9),
    type: ADD_TAG,
    tagname: tagname,
  }
}

export function removeTag(id) {
  return { type: REMOVE_TAG, id: id }
}