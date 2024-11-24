const axios = require('axios');
const ErrorResponse = require('../utils/errorResponse');

const findPointFunction = async (address) => {
    try {
        const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
                q: address,         
                format: 'json',     
                limit: 1,
                addressdetails: 1
            },
            headers: {
                'User-Agent': 'YourAppName/1.0 (your-email@example.com)'
            }
        });
        if (response.data && response.data.length > 0) {
            const location = response.data[0];
            return  `${location.lat},${location.lon}`
        } else {
            throw new ErrorResponse('address not found', 404);
        }
    } catch (error) {
        throw new ErrorResponse(error.message || 'Geocoding API xatosi', 500);
    }
};

module.exports = {
    findPointFunction
}