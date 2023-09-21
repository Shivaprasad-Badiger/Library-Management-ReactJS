const initialState = {
  isLibrary: true,
  searchValue: "",
  indexValue: 0,
  isEdit: false
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
      case "isEditType":
        return {
          ...state,
          isEdit: action.payload,
        };
    default:
      return state;
  }
};

export default Reducer;
