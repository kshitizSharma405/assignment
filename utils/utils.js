// Function to create a standardized response structure
function createResult(message, data, error) {
  return {
    message: message || null, // Message to be included in the response
    data: data || null, // Data to be included in the response
    error: error, // Error message, if any
  };
}

// Export the function for use in other modules
module.exports = {
  createResult,
};
