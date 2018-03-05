import subSelectors, { subSelector } from '.';

test('maps to the appropriate state branch', () => {

  const someState = {
    key1: { value : 'value1'},
    key2: { value : 'value2'},
  }

  const getValue = (state) => {
    return state.value;
  }

  expect(subSelector(getValue, 'key1')(someState))
  .toBe('value1');
  expect(subSelector(getValue, 'key2')(someState))
  .toBe('value2');
});

test('passes arguments', () => {

  const someState = {
    key1: { value : 1 },
    key2: { value : 3 },
  }

  const adder = (state, i) => (
    state.value + i
  );
  const newAdder = subSelector(adder, 'key1');
  expect(newAdder(someState, 1)).toBe(2);
});

test('applies state to all selectors', () => {

  const someState = {
    key1: { value : 1 },
    key2: { value : 3 },
  }

  const selectors = {
    adder : (state, i) => {
      return state.value + i;
    },
    getValue : (state) => {
      return state.value;
    }
  };

  const newSelectors = subSelectors(selectors, 'key1');

  expect(newSelectors.adder(someState, 3)).toBe(4);
  expect(newSelectors.getValue(someState)).toBe(1);
});
