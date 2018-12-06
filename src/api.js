const baseURL = "http://localhost:3001/";
const headers = new Headers();
var cookie;

headers.set('Content-Type', 'application/json');

const reqConf = {
   headers: headers,
   credentials: 'include',
};

// Helper functions for the comon request types

/**
 * make a generic request
 * proxies to react's fetch method, while handling server errors
 */
function smartFetch(endpoint, params) {
   return fetch(endpoint, params)
      .catch(error => {
         console.log("Server Connect Error")
         return Promise.reject(["Server Connect Error"])
      })
      .then(resp => {
         if (!(resp && resp.status === 200)) {
            console.log("Creating error promise")
            return createErrorPromise(resp)
         }
         return resp;
      })
}

/**
 * make a post request
 * @param {string} endpoint
 * @param {Object} body
 * @returns {Promise}
 */
export function post(endpoint, body) {
   return smartFetch(baseURL + endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...reqConf
   })
}

/**
 * make a put request
 * @param {string} endpoint
 * @param {Object} body
 * @returns {Promise}
 */
export function put(endpoint, body) {
   return smartFetch(baseURL + endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...reqConf
   })
}

/**
 * make a get request
 * @param {string} endpoint
 * @returns {Promise}
 */
export function get(endpoint) {
   return smartFetch(baseURL + endpoint, {
      method: 'GET',
      ...reqConf
   })
}

export function del(endpoint) {
   return smartFetch(baseURL + endpoint, {
      method: 'DELETE',
      ...reqConf
   })
}

// Functions for performing the api requests

/**
 * Sign a user into the service, returns the user data
 * @param {{user: string, password: string}} cred
 */
export function signIn(cred) {
   console.log("API signin with " + cred);
   return post("Ssns", cred)
      .then((response) => {
         console.log(response)
         if (response.ok) {
            let location = response.headers.get("Location").split('/');
            cookie = location[location.length - 1];
            console.log("Got session " + cookie);
            return get("Ssns/" + cookie)
         }
         else
            return createErrorPromise(response);
      })
      .then(response => response.json())
      .then(rsp => get('Prss/' + rsp.prsId))
      .then(userResponse => userResponse.json())
      .then(rsp => rsp[0]);
}

// Handle response with non-200 status by returning a Promise that rejects,
// with reason: array of one or more error strings suitable for display.
function createErrorPromise(response) {
   if (response.status === 400)
      return Promise.resolve(response)
         .then(response => response.json())
         .then(errorList => Promise.reject(errorList.length ? errorList.map(
            err => errorTranslate(err.tag) + (err.params ?
               err.params.join(", ") : '')) : ["Unknown error"]));
   else if (response.status === 401)
      return Promise.reject(errorTranslate("noLogin"))
   else if (response.status === 403)
      return Promise.reject(errorTranslate("noPermission"))
   else
      return Promise.reject(["Unknown error"]);
}

/**
 * @returns {Promise} result of the sign out request
 */
export function signOut() {
   return del("Ssns/" + cookie);
}

/**
 * Register a user
 * @param {Object} user
 * @returns {Promise}
 */
export function register(user) {
   return post("Prss", user)
      .then(res => {
         return res.ok ? null : createErrorPromise(res);
      })
}

/**
 * @returns {Promise} json parsed data
 */
export function loadProfs() {
   return get(`Pcs`).then((res) => res.json())
}

export function loadRatings(id) {
   return get(`Pcs/${id}/Ratings`).then((res) => res.json())
}

export function postRating(id, body) {
   return post(`Pcs/${id}/Ratings`, body)
}

export function getRating(id) {
   return get(`Ratings/${id}`).then((res) => res.json())
}

export function postProfCourse(body) {
   return post(`Pcs/`, body)
}

export function getProfCourse(id) {
   return get(`Pcs/${id}`).then((res) => res.json())
}

export function delProfCourse(id) {
   return del(`Pcs/${id}`)
}

export function delRating(id) {
   return del(`Ratings/${id}`)
}

const errMap = {
   en: {
      noLogin: "There is no current login or active session",
      noPermission: "You have insufficient permissions to perform this action",
      missingField: 'Field missing from request: ',
      badValue: 'Field has bad value: ',
      notFound: 'Entity not present in DB',
      badLogin: 'Email/password combination invalid',
      dupEmail: 'Email duplicates an existing email',
      noTerms: 'Acceptance of terms is required',
      forbiddenRole: 'Role specified is not permitted.',
      noOldPwd: 'Change of password requires an old password',
      oldPwdMismatch: 'Old password that was provided is incorrect.',
      dupPcPair: 'ProfessorCourse duplicates an existing one',
      dupEnrollment: 'Duplicate enrollment',
      forbiddenField: 'Field in body not allowed.',
      queryFailed: 'Query failed (server problem).'
   },
   es: {
      noLogin: "[ES] There is no current login or active session",
      noPermission: "[ES] You have insufficient permissions to perform this action",
      missingField: '[ES] Field missing from request: ',
      badValue: '[ES] Field has bad value: ',
      notFound: '[ES] Entity not present in DB',
      badLogin: '[ES] Email/password combination invalid',
      dupEmail: '[ES] Email duplicates an existing email',
      noTerms: '[ES] Acceptance of terms is required',
      forbiddenRole: '[ES] Role specified is not permitted.',
      noOldPwd: '[ES] Change of password requires an old password',
      oldPwdMismatch: '[ES] Old password that was provided is incorrect.',
      dupPcPair: 'ProfessorCourse duplicates an existing one',
      dupEnrollment: '[ES] Duplicate enrollment',
      forbiddenField: '[ES] Field in body not allowed.',
      queryFailed: '[ES] Query failed (server problem).'
   },
   swe: {
      noLogin: "[SWE] There is no current login or active session",
      noPermission: "[SWE] You have insufficient permissions to perform this action",
      missingField: 'Ett fält saknas: ',
      badValue: 'Fält har dåligt värde: ',
      notFound: 'Entitet saknas i DB',
      badLogin: 'Email/lösenord kombination ogilltig',
      dupEmail: 'Email duplicerar en existerande email',
      noTerms: 'Villkoren måste accepteras',
      forbiddenRole: 'Angiven roll förjuden',
      noOldPwd: 'Tidiagre lösenord krav för att updatera lösenordet',
      oldPwdMismatch: 'Tidigare lösenord felaktigt',
      dupPcPair: 'ProfessorCourse duplicates an existing one',
      dupEnrollment: 'Duplicerad inskrivning',
      forbiddenField: 'Förbjudet fält i meddelandekroppen',
      queryFailed: 'Förfrågan misslyckades (server problem).'
   }
}

/**
 * TODO perhaps should return a Promise to conform with the
 * rest of the api functions
 *
 * @param {string} errTag
 * @param {string} lang
 */
export function errorTranslate(errTag, lang = 'en') {
   return errMap[lang][errTag] || 'Unknown Error!';
}
