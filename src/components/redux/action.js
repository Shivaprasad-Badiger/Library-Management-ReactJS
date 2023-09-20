export const homeAction = () => ({
  type: "isLibrary",
  payload: true,
});
export const libraryAction = () => ({
  type: "isLibrary",
  payload: false,
});

// Search Action
export const searchAction = (val) => ({
  type: "search",
  payload: val,
});

//Router Index 
export const routerIndexAction = (index) => ({
  type: "routeIndex",
  payload: index,
});