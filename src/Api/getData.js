import axios from 'axios';

export const getData = async () => {
    try {
        const response = await axios.get('https://back-dragon-ballzs-mwfw-dev.fl0.io/api');
        return response.data;
    } catch (error) {
        console.error(error);
    }
}


export const getDetection = async (file) => {
    try {
        const endpoint = 'https://sambraulio.cognitiveservices.azure.com/customvision/v3.0/Prediction/20709e24-3cd5-456b-b4c5-e3501881575b/detect/iterations/deteccionAdsoV2/image';
        const key = "609bcbd8f70d4b89aad75513331eb05e";
        const headers = {
            'Prediction-Key': key, 
        };

        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(endpoint, formData, { headers }); 
        return response.data;
    } catch (error) {
        console.error(error);
    }
}