
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'
import edit from '../../assets/images/edit.svg'
import trash from '../../assets/images/trash.svg'

import LoadingBar from 'react-top-loading-bar'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { confirmAlert} from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

import { useEffect, useState , useRef } from 'react'
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
    const loading = useRef(null)
    
    async function listar(){
        let r = await api.listar();
        console.log(r)
        setAlunos(r)
        loading.current.complete();
    }

    async function inserir(){
        if(idAlterar == 0){
            let r = await api.inserir(nome,chamada,curso,turma)
            if(r.erro)
                toast.error(`${r.erro}`)
            else
                toast.success('aluno inserirdo')
        } else{
            let r = await api.alterar(idAlterar,nome,chamada,curso,turma);
            if(r.erro)
                toast.error(`${r.erro}`)
            else
                toast.success('aluno alterado');
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
        confirmAlert({
            title: 'Remover aluno',
            message: `Tem certeza de que deseja remover o aluno ${id}`,
            buttons:[
                {
                    label: 'Sim',
                    onClick: async () => {
                        let r = await api.remover(id)
                        if(r.erro)
                            toast.error(`${r.erro}`)
                        else
                            toast.warn('aluno removido')
                        listar()
                    }
                  },
                  {
                    label: 'Não',
                  }
            ]
        })
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
            <ToastContainer/>
            <LoadingBar color='purple' ref={loading}/>
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
                                        <td> {item.nm_aluno != null && item.nm_aluno.length >= 14 ? item.nm_aluno.substring(0,14) + "..." : item.nm_aluno}</td>
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
