import React,{useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Admin from './components/Admin';
import Login from './components/Login';
import Navbar from './components/Navbar';
import {auth} from './firebase'

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
      auth.onAuthStateChanged(user => {
          if(user){
            console.log('usuario existe')
              setFirebaseUser(user)
          }else{
            console.log('usuario nulo ');
              setFirebaseUser(null)
          }
      })
    }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar firebaseUser={firebaseUser}></Navbar>
        <Switch>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <Route path="/" exact>
            Ruta de inicio
          </Route>
        </Switch>
      </div>
    </Router>
  ): (
        <div>Cargando...</div>
      )
}

export default App;
