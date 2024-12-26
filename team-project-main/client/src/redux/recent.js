const initialState = {
    activities: [],
  };
  
  const recentActivityReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_RECENT_ACTIVITY":
        return {
          ...state,
          activities: [action.payload, ...state.activities], // Add new activity at the top
        };
      default:
        return state;
    }
  };
  
  export default recentActivityReducer;
  