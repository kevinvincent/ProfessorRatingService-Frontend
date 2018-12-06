export default function Pcs(state = [], action) {
   console.log("Pcs reducing action " + action.type);
   switch (action.type) {
      case 'SET_PCS':
         return action.pcs;
      case 'CLEAR_PCS':
         return [];
      case 'NEW_PC':
         return state.concat(action.pc)
      case 'REMOVE_PC':
         return state.filter((pc) => pc.id !== action.pcId)
      default:
         return state;
   }
}
