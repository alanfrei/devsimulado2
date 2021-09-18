import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json());

app.get('/matricula', async(req,resp) => {
    try{
        let alunos = await
            db.tb_matricula.findAll({
                order:[
                    ['id_matricula', 'desc']
                ]
            })
        resp.send(alunos)
    } catch(e){
        resp.send({erro: e.toString()})
    }
})

app.post('/matricula', async(req,resp) => {
    try{
        let { nome, chamada, curso, turma} = req.body;
        if(nome == '' || chamada <= 0 || curso == '' || turma == ''){
            resp.send({erro: 'Campo não inserido ou caracter invalido'} )}
        if(isNaN(Number(chamada))){
            resp.send({erro: 'Campo não inserido ou caracter invalido'} )
        }

        let s = await db.tb_matricula.findOne({ where: { nm_turma: turma, nr_chamada: chamada} });
        if (s != null){return resp.send({ erro: 'Aluno ja Cadastrado' }); }

        if(Math.sign(chamada) == Math.sign(-1)){
            resp.send({erro: 'Campo não inserido ou caracter invalido'} )
        }
        else{
            let ins = await
            db.tb_matricula.create({
                nm_aluno: nome,
                nr_chamada: chamada,
                nm_curso: curso,
                nm_turma: turma
            });
        resp.send(ins);
        }
    } catch(e){
        resp.send('erro')
    }
})

app.put('/matricula/:id', async(req,resp) => {
    try{
        let {nome, chamada, curso, turma} = req.body;
        let{id} = req.params;
        if(nome == '' || chamada <= 0 || curso == '' || turma == ''){
            resp.send({erro: 'Campo não inserido ou caracter invalido'} )}
        if(isNaN(Number(chamada))){
            resp.send({erro: 'Campo não inserido ou caracter invalido'} )
        }
        if(Math.sign(chamada) == Math.sign(-1)){
            resp.send({erro: 'Campo não inserido ou caracter invalido'} )
        }else{
            let up = await
            db.tb_matricula.update(
                {
                    nm_aluno: nome,
                    nr_chamada: chamada,
                    nm_curso: curso,
                    nm_turma: turma
                },
                {
                    where:{id_matricula: id}
                }
            )
        resp.sendStatus(200);
        }
        
    } catch(e){
        resp.send({erro: e.toString()})
    }
})

app.delete('/matricula/:id', async(req,resp) => {
    try{
        let{id} = req.params;
        let de = await
            db.tb_matricula.destroy(
                {
                    where: {id_matricula: id}
                }
            )
        resp.sendStatus(200);
    } catch(e){
        resp.send({erro: e.toString()})
    }
})


app.listen(process.env.PORT,
    x => console.log(`Server up at port ${process.env.PORT}`))