export default function Errs(state = [], action) {
   console.log("Errs reducing action " + action.type);
   switch (action.type) {
      case 'ERROR':
         return state.concat(action.details);
      case 'LOGIN_ERR':
         return state.concat(action.details);
      case 'REGISTER_ERR':
         return state.concat(action.details);
      case 'CLEAR_ERRS':
         return [];
      default:
         return state;
   }
}
