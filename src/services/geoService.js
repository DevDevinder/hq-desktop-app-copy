export async function geocodeAddress(address) {
    const controller = new AbortController(); // Used for timeout
    const timeout = setTimeout(() => controller.abort(), 10000); // 10-second timeout
  
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`,
        { signal: controller.signal }
      );
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.length > 0 && data[0].lat && data[0].lon) {
        const location = { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
        return location;
      } else {
        throw new Error('Address not found or invalid response structure.');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error('Geocoding request timed out.');
      }
      throw new Error(`Geocoding error: ${error.message}`);
    } finally {
      clearTimeout(timeout);
    }
  }
  