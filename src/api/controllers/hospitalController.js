import {
    findNearestHospital as findNearestHospitalService,
  } from '../../services/serverFunctionService.js';
  import { geocodeAddress as geocodeAddressService } from '../../services/geoService.js';
  
  export async function findNearestHospital(req, res) {
    try {
      const { location, requiredSpecialty, isPriority, excludedHospitalId } = req.body;
      const hospital = await findNearestHospitalService(location, requiredSpecialty, isPriority, excludedHospitalId);
      res.json(hospital);
    } catch (error) {
      console.error('findNearestHospital error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  
  export async function geocodeAddress(req, res) {
    try {
      const { address } = req.body;
      const location = await geocodeAddressService(address);
      res.json(location);
    } catch (error) {
      console.error('geocodeAddress error:', error);
      res.status(500).json({ message: error.message });
    }
  }
  