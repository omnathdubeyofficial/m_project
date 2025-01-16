
export const CREATE_ADMIN_DATA_MUTATION = `
  mutation createAdminData($name: String, $email: String, $age: String) {
    createAdminData(name: $name, email: $email, age: $age) {
      z_id
      name
      email
      age
    }
  }
`;
