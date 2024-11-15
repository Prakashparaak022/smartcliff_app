// authUtils.js
export function generateAuthToken(user) {
  const tokenPayload = {
    userId: user.id,
    username: user.username,
    // Add any other necessary data to the payload
  };

  const authToken = btoa(JSON.stringify(tokenPayload)); // Encode the payload
  return authToken;
}

export function isValidAuthToken(authToken) {
  try {
    const decodedToken = JSON.parse(atob(authToken)); // Decode the token
    console.log("Decoded Token:", decodedToken); // Log the decoded token for debugging
    // Add any validation logic here
    // For example, check if userId and username exist
    return decodedToken.userId && decodedToken.username;
  } catch (error) {
    console.log("Invalid Token:", error); // Log the error for debugging
    return false; // Return false if token is invalid or cannot be decoded
  }
}

