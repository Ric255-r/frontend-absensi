import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { UserContext } from "../../context/Index";
import LayoutRoot from "../../layouts/RootLayout";
import Homepage from "../Index";


function Login(){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const submit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        }).then(function(response) {
            console.log(response);
            localStorage.setItem('token', response.data.authorization.token);
            window.location.href='/home';
            // this.props.history.push('/home');

        }).catch(function(error){
            console.log(error)
            alert("Username / Password Salah");
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        }); 
    }
    
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                    <h3 className="text-2xl font-bold text-center">Login to your account</h3>
                    <form action="" method="POST" onSubmit={submit}>
                        <div className="mt-4">
                            <div>
                                <label className="block" >Email</label>
                                <input name="email" type="text" placeholder="Email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                    onChange={(e) => setEmail(e.target.value)} id="email" />
                            </div>
                            <div className="mt-4">
                                <label className="block">Password</label>
                                <input name="password" type="password" placeholder="Password"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                    onChange={(e) => setPassword(e.target.value)} id="password" />
                            </div>
                            <div className="flex items-baseline justify-between">
                                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" type="submit">Login</button>
                                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;