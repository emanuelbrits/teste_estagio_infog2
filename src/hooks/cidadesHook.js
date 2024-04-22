import http from '@/services/http.js'
import { useAuth } from '@/stores/auth';

export async function getCidades(cidades) {
    try {
        const { data } = await http.get('a/cidade/', {
            headers: {
                'Authorization': `Token ${useAuth().token}`
            }
        })
        cidades.value = data;
    } catch (error) {
        console.log(error.response?.data);
    }
}

export async function getCidadesUF(uf, cidades) {
    try {
        const { data } = await http.get('a/cidade/', {
            headers: {
                'Authorization': `Token ${useAuth().token}`
            }
        })  
        cidades.value = []
        for(let i = 0; i < data.length; i++ ) {
            if (data[i].uf === uf) {
                cidades.value.push(data[i])
            }
        }
    } catch (error) {
        console.log(error.response?.data);
    }
}