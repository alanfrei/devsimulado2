import book from '../../assets/images/book.svg'
import chevron_down from '../../assets/images/chevron-down.svg'
import { Container } from './styled'

export default function Menu(){
    return(
        <Container>
            <header className="header-left-box">
                <div className="svg-cabecalho-left-box"> <img src={book} alt="" /></div>
                <div className="devSchool"> <span>Dev</span>School</div>
            </header>
            <div className="black-box"></div>
            <div className="left-box-management">
                <div> Gerenciamento </div>
                <img src={chevron_down} alt="" />
            </div>
                <div className="left-box-aluno">
                <div> Alunos </div>
            </div> 
        </Container>
    )
}