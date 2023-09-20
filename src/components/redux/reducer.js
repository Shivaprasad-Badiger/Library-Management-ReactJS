const initialState = {
  isLibrary: true,
  searchValue: "",
  indexValue: 0
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case "isLibrary":
      return {
        ...state,
        isLibrary: action.payload,
      };
    case "search":
      return {
        ...state,
        searchValue: action.payload,
      };
      case "routeIndex":
      return {
        ...state,
        indexValue: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
