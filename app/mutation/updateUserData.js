
export const UPDATE_USER_DATA_MUTATION = `
   mutation updateUserData($id: String!, $name: String!, $email: String!, $age: Int!) {
    updateUserData(id: String!, name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }

`;
