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
  Apply subSelector op to an object of selectors.

  ```
  import {compose} from 'redux';
  import myReducer, * as mySelectors from './myReducer';
  // other reducers

  const reducer = compose({
    myReducer,
    // other reducers
  });

  export const selectors = {
    myReducer: subSelectors(mySelectors, 'myReducer'),
    // selectors for other reducers
  };

  export default reducer;
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
