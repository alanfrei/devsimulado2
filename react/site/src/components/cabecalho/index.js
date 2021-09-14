import refresh from '../../assets/images/refresh.svg'
import log_out from '../../assets/images/log-out.svg'
import usuario from '../../assets/images/usuario.jpeg'
import { Container } from './styled'


export default function Cabecalho(){
    return(
        <Container>
            <div class="reader-right-box">
                <div class="box-user"> 
                    <div class="user-image">
                        <img src={usuario} alt="" />
                        <div class="absolute">3</div>
                    </div>
                    <div class="user-name"> Olá, <b>Bruno de Oliveira</b> </div>
                </div>
                
                <div class="box-image">
                    <div class="refresh-button"> <button> <img src={refresh} alt = "" />  </button> </div>
                    <div class="left-button"> <button> <img src={log_out} alt = "" />  </button> </div>
                </div>
            </div>
            <div class="bottom-bar-right-header" />
        </Container>
    )
}