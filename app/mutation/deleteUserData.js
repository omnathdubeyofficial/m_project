export const DELETE_USER_DATA_MUTATION = `
   mutation deleteUserData($id: ID!) {
    deleteUserData(id: $id) {
      id
    }
  }

`;