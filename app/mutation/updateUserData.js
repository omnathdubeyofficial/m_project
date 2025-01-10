
export const UPDATE_USER_DATA_MUTATION = `
   mutation updateUserData($id: ID!, $name: String!, $email: String!, $age: Int!) {
    updateUserData(id: $id, name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }

`;
