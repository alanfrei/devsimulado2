import db from './db.js';
import express from 'express'
import cors from 'cros'

const app = express();
app.use(cors());

app.get('/matricula/:matriculaId', async(req,resp) =>{
    try{
        let info = await
            db.tb_matricula.FindAll({
                where:{
                    id_matricula: req.params.matriculaId
                },
                include: ['tb_matricula'],
            });
        resp.send(info);
    } catch (e){
        resp.send(e.toString())
    }
});

app.post('/matricula', async(req,resp) =>{
    try{
        let matricula = req.body;

    } catch{

    }
})

app.listen(process.env.PORT,
    x => console.log(`Server up${process.env.PORT}`))