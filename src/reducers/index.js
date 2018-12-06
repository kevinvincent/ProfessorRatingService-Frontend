import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

import Prss from './Prss';
import Errs from './Errs';
import Pcs from './Pcs';
import Ratings from './Ratings';

const rootReducer = combineReducers({Prss, Errs, Pcs, Ratings});

export default rootReducer;
