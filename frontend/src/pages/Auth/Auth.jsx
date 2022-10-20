import React from 'react'
import './Auth.css'
import Logo from '../../img/logo.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthAction'

const Auth = () => {

    const dispatch = useDispatch()
    const loading = useSelector((state) => state.authReducer.loading)
    //console.log(loading)
    const [isSignUp, setIsSignUp] = useState(false)
    const [data, setData] = useState({firstname: "", lastname: "", username: "", password: "", confirmpassword: ""})
    const [passMatch, setPassMatch] = useState(true)

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(isSignUp) {
            data.password === data.confirmpassword ? dispatch(signUp(data)) : setPassMatch(false)
        } else {
            dispatch(logIn(data))
        }
    }

    const resetForm = () => {
        setPassMatch(true)
        setData({firstname: "", lastname: "", username: "", password: "", confirmpassword: ""})
    }

  return (
    <div className='Auth'>
        {/* Left Side */}
        <div className='a-left'>
            <img src={Logo} alt="" />
            <div className='Webname'>
                <h1>Social Platform</h1>
                <h6>Explore the ideas throughout the world</h6>
            </div>
        </div>
        {/* Right Side <SignUp /> */}
        <div className='a-right'>
            <form className='infoForm authForm' onSubmit = { handleSubmit }>

                <h3>{ isSignUp ? "Sign Up" : "Log In"}</h3>
                { isSignUp &&
                    <div>
                        <input type="text" placeholder='First Name' className='infoInput' name='firstname' value={data.firstname} onChange={handleChange} />
                        <input type="text" placeholder='Last Name' className='infoInput' name='lastname' value={data.lastname} onChange={handleChange} />
                    </div>
                }
                <div>
                    <input type="text" placeholder='User Name' className='infoInput' name='username' value={data.username} onChange={handleChange} />
                </div>
                <div>
                    <input type="password" placeholder="Password" className="infoInput" name="password" value={data.password} onChange={handleChange} />
                    { isSignUp &&
                        <input type="password" placeholder="Confirm Password" className="infoInput" name="confirmpassword" value={data.confirmpassword} onChange={handleChange} />
                    }
                </div>
                { !passMatch &&
                    <span style={{color: "red", fontSize: "12px", alignSelf: "flex-end", margin: "5px"}}>* Passwords do not match!</span>
                }
                <div>
                    <span style={{fontSize: "12px", cursor: "pointer"}} onClick={ () => {setIsSignUp( (prev) => !prev ); resetForm() }}>
                        { isSignUp ? "Already have an account? Login!" : "Don't have an account? Sign up" }
                    </span>
                </div>
                <button className='button infoButton' type="submit" disabled={loading}>{ loading ? "Loading..." : isSignUp ? "Signup" : "Log In" }</button>
            </form>
        </div>
    </div>
  )
}

export default Auth