export interface IUserReducer {
  type: string;
  isLoading: boolean;
  errorMessage: string;
}
const initialState: IUserReducer = {
  type: '',
  isLoading: false,
  errorMessage: '',
};

export default (state = initialState, action: any) => {
  state.type = action.type;
  if (action.type.includes('_REQUEST')) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type.includes('_FAILED')) {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.error,
    };
  }

  return {
    ...state,
    isLoading: false,
  };
};
