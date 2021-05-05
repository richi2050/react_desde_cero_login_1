import React, {useState, useCallback} from 'react'
import { withRouter } from "react-router-dom";
import {auth} from '../firebase'


const Reset = (props) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            console.log('Datos vacíos email!')
            setError('Datos vacíos email!')
            return
        }
      
        setError(null)
        recuperar()
        
    }


    const recuperar = useCallback(
        async () => {
            try {
                await auth.sendPasswordResetEmail(email)
                props.history.push('/login')
            } catch (error) {
                console.log(error)
                setError(error.message)
            }
        },
    [email, props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                Recuperar Contraseña
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange={ e => setEmail(e.target.value) }
                            value={email}
                        />
                       
                        <div className="d-grid gap-2">
                            <button 
                                className="btn btn-lg btn-dark"
                                type="submit">
                                 Recuperar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Reset)