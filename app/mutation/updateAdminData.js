export const UPDATE_ADMIN_DATA_MUTATION = `
mutation  updateAdminData( $z_id: String, $name: String, $email: String, $age: String) {
     updateAdminData( z_id: $z_id, name: $name, email: $email, age: $age) {
      z_id
      name
      email
      age
    }
  }
    `;