import * as api from '../api';

export function signIn(credentials, cb) {
   console.log("signIn action creator");
   return (dispatch, prevState) => {
      api.signIn(credentials)
         .then((userInfo) => dispatch({ user: userInfo, type: "SIGN_IN" }))
         .then(() => { if (cb) cb(); })
         .catch((error) => {
            dispatch({ type: 'LOGIN_ERR', details: error });
         });
      // setTimeout(() => dispatch({user: credentials, type: "SIGN_IN"}), 2000);
   };
}

export function register(data, cb) {
   console.log("register action creator");
   return (dispatch, prevState) => {
      api.register(data)
         .then(() => { if (cb) cb(); })
         .catch(error => {
            console.log("Registration error" + error);
            dispatch({ type: 'REGISTER_ERR', details: error });
         });
   };
}

export function signOut(cb) {
   return (dispatch, prevState) => {
      api.signOut()
         .then(() => dispatch({ type: 'SIGN_OUT' }))
         .then(() => { if (cb) cb(); })
         .catch((err) => {
            console.log("Sign out error!");
            dispatch({ type: "ERROR", err });
         });
   };
}

export function postError(type, details, cb) {
   return (dispatch, prevState) => {
      dispatch({ type, details });
      if (cb)
         cb();
   };
}

export function clearErrors(cb) {
   return (dispatch, prevState) => {
      dispatch({ type: "CLEAR_ERRS" });
      if (cb)
         cb();
   };
}

export function loadProfs(cb) {
   return (dispatch, prevState) => {
      api.loadProfs()
         .then((pcs) => {
            console.log("loadProfs Pcs", pcs)
            dispatch({ type: "CLEAR_PCS", pcs: pcs })
            dispatch({ type: "SET_PCS", pcs: pcs })
         })
         .then(() => { if (cb) cb(); })
         .catch((err) => {
            console.log("getLoadProfs Error");
            dispatch({ type: "ERROR", details: err });
         });
   };
}

export function loadRatings(pcId, cb) {
   return (dispatch, prevState) => {
      api.loadRatings(pcId)
         .then((ratings) => {
            dispatch({ type: "SET_RATINGS", pcId: pcId, ratings: ratings })
         })
         .then(() => { if (cb) cb(); })
         .catch((err) => {
            console.log("loadRatings Error");
            dispatch({ type: "ERROR", details: err });
         });
   };
}


export function postRating(pcId, rating, cb) {
   return (dispatch, prevState) => {
      api.postRating(pcId, rating)
         .then((resp) => {
            let location = resp.headers.get("Location").split('/');
            let rId = location[location.length - 1];
            return api.getRating(rId)
         })
         .then((rating) => {
            console.log("postRating Rating", rating)
            dispatch({ type: "NEW_RATING", pcId: pcId, rating: rating })
         })
         .then(() => { if (cb) cb(); })
         .catch((err) => {
            console.log("postRating Error");
            dispatch({ type: "ERROR", details: rating + ": " + err });
         });
   };
}

export function postProfCourse(pc, cb) {
   return (dispatch, prevState) => {
      let pcId = null;
      api.postProfCourse(pc)
         .then((resp) => {
            let location = resp.headers.get("Location").split('/');
            pcId = location[location.length - 1];
            return api.getProfCourse(pcId)
         })
         .then((pc) => {
            console.log("postProfCourse pc", pc)
            dispatch({ type: "NEW_PC", pc: pc })
         })
         .then(() => { if (cb) cb(pcId); })
         .catch((err) => {
            console.log("postProfCourse Error");
            dispatch({ type: "ERROR", details: pc + ": " + err });
         });
   };
}

export function deleteProfCourse(pcId, cb) {
   return (dispatch, prevState) => {
      api.delProfCourse(pcId)
         .then(() => {
            console.log("Deleted ProfCourse", pcId)
            dispatch({ type: "REMOVE_PC", pcId: pcId })
         })
         .then(() => { if (cb) cb(); })
         .catch((err) => {
            console.log("Del Error");
            dispatch({ type: "ERROR", err });
         });
   };
}

export function deleteRating(pcId, ratingId, cb) {
   return (dispatch, prevState) => {
      api.delRating(ratingId)
         .then(() => {
            console.log("Deleted Rating", ratingId)
            dispatch({ type: "REMOVE_RATING", pcId: pcId, ratingId: ratingId })
         })
         .then(() => { if (cb) cb(); })
         .catch((err) => {
            console.log("Del Error");
            dispatch({ type: "ERROR", err });
         });
   };
}