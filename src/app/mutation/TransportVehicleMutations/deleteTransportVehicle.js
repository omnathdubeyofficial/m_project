export const DELETE_TRANSPORT_VEHICLE_MUTATION = `
   mutation deleteTransportVehicleRegistration($z_id: String) {
    deleteTransportVehicleRegistration(z_id: $z_id) {
      z_id
      success_msg
      error_msg
    }
  }
`;