import axios from "axios";

export const fetchLocation = async (address?: string) => {
    const apiKey = 'a225fe80e865411cbcf7de42cc45d59f';
    const url = `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        return response.data.features[0].geometry.coordinates
    } catch (error) {
        console.error(error)
        throw new Error('Error in fetching coordinates.')
    }
};