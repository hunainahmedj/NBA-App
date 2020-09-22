import {combineReducers} from 'redux';
import User from './user_reducer';
import News from './newsReducer';
import Games from './gamesReducer';

const rootReducer = combineReducers({
  User,
  News,
  Games,
});

export default rootReducer;
