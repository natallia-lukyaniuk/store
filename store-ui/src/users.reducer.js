export function users(state = [], action) {
  if (action.type === 'FETCH_USERS_SUCCESS') {
    return [];
  }
  return state;
}

export default users;
