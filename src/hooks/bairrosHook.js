import http from '@/services/http.js'
import { useAuth } from '@/stores/auth';

async function getBairros(id_cidade, bairros) {
    try {
        const { data } = await http.get(`a/bairro/?cidade_id=${id_cidade}`, {
            headers: {
                'Authorization': `Token ${useAuth().token}`
            }
        })
        bairros.value = data;
    } catch (error) {
        console.log(error.response?.data);
    }
}

export default getBairros