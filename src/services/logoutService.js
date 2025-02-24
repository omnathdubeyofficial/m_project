const logoutUser = async (req, res) => {
  try {
    // Clear the authToken cookie
    res.clearCookie("authToken");
    return { message: "Successfully logged out" };
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Logout failed");
  }
};
export { logoutUser };
