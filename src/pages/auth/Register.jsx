import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Register(){
    const [nama, setnama] = useState();
    const [email, setemail] = useState();
    const [password, setpassword] = useState();
    const [dosen, setdosen] = useState();

    const [selected, setSelected] = useState('-');
    const [npm, setNpm] = useState('');
    const [kode_dosen, setKodeDosen] = useState('');
    const [hideNpm, setHideNpm] = useState(true);
    const [hideKode, setHideKode] = useState(true);

    const navigate = useNavigate();

    const handleChange = event => {
        // console.log(event.target.value);
        setSelected(event.target.value);

        if(event.target.value == 0){
            setHideNpm(!hideNpm);
            setHideKode(true);
        }else{
            setHideNpm(true);
            setHideKode(!hideKode);
        }
    }

    const register = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/register', {
            nama: nama,
            email: email,
            password: password,
            npm : npm,
            kode_dosen : kode_dosen,
            isDosen: parseInt(selected)
        }).then(function(response){
            alert("Sukses Register, Silahkan Login");
            navigate("/");
            // console.log(response.data);
        }).catch(function(error){
            console.log(error);
            alert(error);
        })
    }
    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
                    <h3 className="text-2xl font-bold text-center">Register your account</h3>
                    <form action="" onSubmit={register}>
                        <div className="mt-4">
                            <div>
                                <label className="block">Nama</label>
                                <input type="text" placeholder="Nama"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" name="nama" 
                                    onChange={(e) => setnama(e.target.value)}/>
                            </div>
                            <div>
                                <label className="block">Email</label>
                                <input type="text" placeholder="Email"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" name="email" 
                                    onChange={(e) => setemail(e.target.value)} />
                            </div>
                            <div className="mt-4">
                                <label className="block">Password</label>
                                <input type="password" placeholder="Password"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" name="password"
                                    onChange={(e) => setpassword(e.target.value)} />
                            </div>
                            <div className="mt-4">
                                <label className="block">ROle</label>
                                <select value={selected} onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                     name="" id="">
                                    <option value="-">--Choose an option--</option>
                                    <option value="0">Mahasiswa</option>
                                    <option value="1">Dosen</option>
                                </select>
                            </div>
                            <div className="mt-4" hidden={hideNpm}>
                                <label className="block">NPM</label>
                                <input className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    name="" id="" onChange={(e) => setNpm(e.target.value)} placeholder="Input NPM Anda" />
                            </div>

                            <div className="mt-4" hidden={hideKode}>
                                <label className="block">Kode Dosen</label>
                                <input className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                    name="" id="" onChange={(e) => setKodeDosen(e.target.value)} placeholder="Input Kode Dosen Anda" />
                            </div> 

                            <div className="flex items-baseline justify-between">
                                <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Register</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;