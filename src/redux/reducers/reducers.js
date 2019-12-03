import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import tagsReducer from './tagsReducer';
import visibilityReducer from './visibilityReducer';

const reducers = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
  visibility: visibilityReducer
});

export default reducers