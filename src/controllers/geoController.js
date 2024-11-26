import { geocodeAddress } from '../services/geoService.js';

export async function geocodeAndFormatAddress(address) {
  return await geocodeAddress(address);
}
