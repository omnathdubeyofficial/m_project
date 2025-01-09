
export const CREATE_USER_DATA_MUTATION = `
  mutation CreateUserData($name: String!, $email: String!, $age: Int!) {
    createUserData(name: $name, email: $email, age: $age) {
      id
      name
      email
      age
    }
  }
`;
