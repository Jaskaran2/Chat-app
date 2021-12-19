import React,{createContext,useContext,useReducer} from "react";

//Prepairing Data layer
export const StateContext=createContext();


// Higher order component. It gives a state provider which helps us to wrap the app.
export const StateProvider=({reducer,initialState,children})=>(
  <StateContext.Provider value={useReducer(reducer,initialState)}>
  {children}
  </StateContext.Provider >
);


//For ulling something from the data.
export const useStateValue=() => useContext(StateContext);
