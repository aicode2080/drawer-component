import { useReducer } from 'react';

export default function reducer(state: any, action: any) {
  // ...
  return { ...state, ...action };
}
