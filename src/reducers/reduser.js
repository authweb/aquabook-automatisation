export const initialState = {
  today: '',
  rangeStart: '',
  // ...other states
};

export function reducer(state, action) {
  switch (action.type) {
    case 'SET_TODAY':
      return { ...state, today: action.payload };
    case 'SET_RANGE_START':
      return { ...state, rangeStart: action.payload };
    // ...other actions
    default:
      throw new Error();
  }
}
