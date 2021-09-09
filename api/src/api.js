import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {
    async listardados(idMatricula) {
        let r = await api.get(`/matricula/${idMatricula}`);
        return r.data;
    }
    async inserirMensagem(matricula){
        let json = {
            matricula: matricula,
        }

    let x = await api.post('/matricula',json)
    return x.data;
    }
}