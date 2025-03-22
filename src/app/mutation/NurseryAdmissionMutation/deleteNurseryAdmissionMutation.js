export const DELETE_NURSERY_ADMISSION_LIST_MUTATION = `
   mutation deleteNurseryAdmissionList($z_id: String) {
    deleteNurseryAdmissionList(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;