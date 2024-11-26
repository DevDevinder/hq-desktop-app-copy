export async function handleApiRequest(apiCall) {
    try {
      const response = await apiCall();
      return response;
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  }
   