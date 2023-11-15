import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useUser } from '../UserContext';

function Login(props) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const { currUser } = useUser();
    let navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Handle form submission based on the login or signup state
        if (isLogin) {
            // Handle login
            signInWithEmailAndPassword(auth, email, password)
                .then((userCred) => {
                    console.log(userCred)
                    const user = userCred.user;
                    currUser(user);
                    props.showAlert("Logged In", "success");
                    navigate('/');
                }).catch((error) => {
                    console.log(error);
                    props.showAlert("Wrong Credentials!", "danger");
                })
            console.log('Login:', email, password);
            
        } else {
            // Handle signup
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCred) => {
                    console.log(userCred)
                    const user = userCred.user;
                    currUser(user);
                    props.showAlert("Logged In", "success");
                    navigate('/');
                }).catch((error) => {
                    console.log(error);
                    props.showAlert("User Already Exist!", "danger");
                })
            console.log('Signup:', email, password);
            
        }
    };


    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className='my-4 text-primary'>{isLogin ? 'Login' : 'Signup'}</h2>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">

                            <input
                                type="email"
                                className="form-control rounded-0"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                className="form-control rounded-0"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                            />
                        </div>

                        <button type="submit" className="btn btn-primary rounded-0">
                            {isLogin ? 'Login' : 'Signup'}
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline-secondary rounded-0 mx-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </form>
                    <div className="mt-3">
                        {isLogin ?
                            <div>
                                <span>Don't have an account ?</span>
                                <button className="btn btn-link rounded-0" onClick={() => setIsLogin(!isLogin)}>SignUp</button>
                            </div>
                            :
                            <div>
                                <span>Already have an account?</span>
                                <button className="btn btn-link rounded-0" onClick={() => setIsLogin(!isLogin)}>Login</button>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
