/**
  transforms a selector to be applied to a subtree of the state.

  ```
  let myNewSelector = subSelector(mySelector, 'myReducerKey');
  let value = myNewSelector(state, args);
  // is the same as
  let value = mySelector(state.myReducerKey, args);
  ```
*/
export const subSelector = (selector, stateKey) => (
  (state, ...rest) => (
    selector(state[stateKey], ...rest)
  )
);

/**
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
*/
const subSelectors = (selectors, stateKey) => {
  const result = {};
  Object.keys(selectors).forEach(key => {
    result[key] = subSelector(selectors[key], stateKey);
  });
  return result;
}

export default subSelectors;
