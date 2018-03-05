# sub-selectors

Transform redux sub-selectors for use higher in the state tree

```
import {combineReducers} from 'redux';
import subSelectors from 'sub-selectors';
import myReducer, * as mySelectors from './myReducer';
// other reducers

export default combineReducers({
  myReducer,
  // other reducers
});

export const selectors = {
  myReducer: subSelectors(mySelectors, 'myReducer'),
  // selectors for other reducers
};
```
