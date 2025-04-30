import axios from 'axios';

const api = axios.create({
    baseURL: 'https://exercisedb.p.rapidapi.com',
    headers: {
        'X-RapidAPI-Key': '0c68c44b11mshdf22afc5753038dp1741b7jsna706f6bbaa4a',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
        'Accept': 'application/json',
    },
    timeout: 10000,
});

export const getBodyParts = async () => {
    try {
        const { data } = await api.get('/exercises/bodyPartList');
        return data;
    } catch (err) {
        console.error('Failed to fetch body parts:', err.message);
        // Return default body parts if API fails
        return ['back', 'cardio', 'chest', 'lower arms', 'lower legs',
            'neck', 'shoulders', 'upper arms', 'upper legs', 'waist'];
    }
};

export const searchExercises = async (query = '', bodyPart = 'all') => {
    try {
        const { data } = await api.get('/exercises');
        let filtered = data;

        if (bodyPart && bodyPart !== 'all') {
            filtered = filtered.filter(exercise =>
                exercise.bodyPart.toLowerCase() === bodyPart.toLowerCase()
            );
        }

        if (query) {
            filtered = filtered.filter(exercise =>
                exercise.name.toLowerCase().includes(query.toLowerCase())
            );
        }

        return filtered;
    } catch (err) {
        console.error('Search failed:', err.message);
        throw err;
    }
};