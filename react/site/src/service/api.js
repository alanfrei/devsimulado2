import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3030/'
})

export default class Api{
    async listar(){
        let r = api.get('/matricula');
        return (await r).data;
    }

    async inserir(nome, chamada, curso, turma){
        let po = api.post('/matricula', {nome, chamada, curso, turma});
        return (await po).data;
    }

    async alterar(id, nome, chamada, curso, turma){
        let pu = api.put('/matricula/' + id,{nome, chamada, curso, turma});
        return (await pu).data;
    }

    async remover(id){
        let del = api.delete('/matricula/' + id);
        return (await del).data;
    }
}