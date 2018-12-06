export default function Ratings(state = {}, action) {
   console.log("Ratings reducing action " + action.type);
   switch (action.type) {
      case 'SET_RATINGS':
         return {
            ...state,
            [action.pcId]: action.ratings
         };
      case 'NEW_RATING':
         let newState = {
            ...state
         }
         newState[action.pcId].push(action.rating)
         return newState;
      case 'REMOVE_RATING':
         let newState1 = {
            ...state
         }
         newState1[action.pcId] = newState1[action.pcId].filter((r) =>
            r.id !== action.ratingId)
         return newState1;
      default:
         return state;
   }
}