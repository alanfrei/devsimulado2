
import { BrowserRouter, Switch, Route} from 'react-router-dom'

import Alunos from './pages/alunos'

export default function Router(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Alunos}/>
            </Switch>
        </BrowserRouter>
    )
}
