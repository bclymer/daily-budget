import { combineReducers } from 'redux';
import BudgetReducer from './BudgetReducer';
import NavReducer from './NavReducer';
import LoginReducer from './LoginReducer';

export default combineReducers({
  nav: NavReducer,
  budget: BudgetReducer,
  login: LoginReducer,
});
