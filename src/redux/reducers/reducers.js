
import { combineReducers } from 'redux';
import notesReducer from './notesReducer';
import visibilityReducer from './visibilityReducer';


const reducers = combineReducers({
  notes: notesReducer,
  visibility: visibilityReducer
});


export default reducers