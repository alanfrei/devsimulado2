
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'
import edit from '../../assets/images/edit.svg'
import trash from '../../assets/images/trash.svg'
import { useEffect, useState } from 'react'
import { Container, Conteudo } from './styled'

import Api from '../../service/api'
const api = new Api()

export default function Index() {
    const [alunos,setAlunos] = useState([])
    const [nome, setNome] = useState('')
    const [chamada, setChamada] = useState('')
    const [curso, setCurso] = useState('')
    const [turma, setTurma] = useState('')
    const [idAlterar,setIdAlterar] = useState(0)
    
    async function listar(){
        let r = await api.listar();
        console.log(r)
        setAlunos(r)
    }

    async function inserir(){
        if(idAlterar == 0){
            let r = await api.inserir(nome,chamada,curso,turma);
            alert('aluno inserirdo')
        } else{
            let r = await api.alterar(idAlterar,nome,chamada,curso,turma);
            alert('aluno alterado')
        }
        limparCampos()
        listar()
    }

    async function limparCampos(){
        setNome('');
        setChamada('');
        setCurso('');
        setTurma('');
        setIdAlterar(0);
    }

    async function remover(id){
        let r = await api.remover(id)
        alert('aluno removido')
        listar()
        console.log(r)
    }

    async function editar(item) {
        setNome(item.nm_aluno);
        setChamada(item.nr_chamada);
        setCurso(item.nm_curso);
        setTurma(item.nm_turma);
        setIdAlterar(item.id_matricula);
    }

    useEffect(() =>{
        listar();
    }, [])

    return (
        <Container>
            <Menu />
            <Conteudo>
                <Cabecalho />
                <div className="body-right-box">
                    <div className="new-student-box">
                        
                        <div className="text-new-student">
                            <div className="bar-new-student"></div>
                            <div className="text-new-student">{idAlterar == 0 ? "Novo Aluno" : "Alterarando Aluno " + idAlterar}</div>
                        </div>
                        
                        <div className="input-new-student"> 
                            <div className="input-left">
                                <div className="agp-input"> 
                                    <div className="name-student"> Nome: </div>  
                                    <div className="input"> <input type="text" value={nome} onChange={e => setNome(e.target.value)} /> </div>  
                                </div> 
                                <div className="agp-input">
                                    <div className="number-student"> Chamada: </div>  
                                    <div className="input"> <input type="text" value={chamada} onChange={e => setChamada(e.target.value)}/> </div> 
                                </div>
                            </div>

                            <div className="input-right">
                                <div className="agp-input">
                                    <div className="corse-student"> Curso: </div>  
                                    <div className="input"> <input type="text" value={curso} onChange={e => setCurso(e.target.value)}/> </div>  
                                </div>
                                <div className="agp-input">
                                    <div className="class-student"> Turma: </div>  
                                    <div className="input"> <input type="text" value={turma} onChange={e => setTurma(e.target.value)}/> </div> 
                                </div>
                            </div>
                            <div className="button-create"> <button onClick={inserir}> {idAlterar == 0 ? "Cadastrar" : "Alterar"} </button> </div>
                        </div>
                    </div>

                    <div className="student-registered-box">
                        <div className="row-bar"> 
                            <div className="bar-new-student"> </div>
                            <div className="text-registered-student"> Alunos Matriculados </div>
                        </div>
                    
                        <table className ="table-user">
                            <thead>
                                <tr>
                                    <th> ID </th>
                                    <th> Nome </th>
                                    <th> Chamada </th>
                                    <th> Turma </th>
                                    <th> Curso </th>
                                    <th className="coluna-acao"> </th>
                                    <th className="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {alunos.map((item, i) =>
                                    <tr className={i % 2 == 0 ? "linha-alternada" : ""}>
                                        <td>{item.id_matricula}</td>
                                        <td> {item.nm_aluno}</td>
                                        <td> {item.nr_chamada}</td>
                                        <td> {item.nm_turma}</td>
                                        <td> {item.nm_curso}</td>
                                        <td className="coluna-acao"> <button onClick={() => editar(item)}> <img src={edit} alt="" /> </button> </td>
                                        <td className="coluna-acao"> <button onClick={() => remover(item.id_matricula)}> <img src={trash} alt="" /> </button> </td>
                                    </tr>
                                )}
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}
