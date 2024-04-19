import http from '@/services/http.js'
import { useAuth } from '@/stores/auth';

async function adicionaUsuarios(usuarios) {
    try {
        const { data } = await http.get('a/colaborador/?text=', {
            headers: {
                'Authorization': `Token ${useAuth().token}`
            }
        })
        usuarios.value = data.results;
    } catch (error) {
        console.log(error.response?.data);
    }
}

export default adicionaUsuarios