import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useLoaderData } from "react-router-dom";

function Profile(){
    const api = useLoaderData();
    const [cekapi, setcekapi] = useState(api);
    const [disabletekan, disablesettekan] = useState(true);
    // Bagian Data
    const [nama, setnama] = useState(cekapi.saya.nama);
    const [npm, setnpm] = useState(cekapi.saya.npm ? cekapi.saya.npm : '');
    const [semester, setsemester] = useState(cekapi.saya.semester ? cekapi.saya.semester : '');
    const [alamat, setalamat] = useState(cekapi.saya.alamat ? cekapi.saya.alamat : '');
    const [program_studi, setprogram_studi] = useState(cekapi.saya.program_studi ? cekapi.saya.program_studi : '');
    const [kelas, setkelas] = useState(cekapi.saya.kelas ? cekapi.saya.kelas : '');
    const [jenjang, setjenjang] = useState(cekapi.saya.jenjang_studi ? cekapi.saya.jenjang_studi : '');

    const Data = {
        nama : nama,
        npm : npm,
        semester : semester,
        alamat : alamat,
        program_studi : program_studi,
        kelas : kelas,
        jenjang_studi: jenjang
    };

    let token = localStorage.getItem('token');

    const header = {
        headers : {
            Authorization : 'Bearer ' + token
        }
    };

    const update = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/updateProfile', Data, header)
        .then(function(response){
            console.log(response);
            Swal.fire({
                title: 'Sukses!',
                text: 'Data Sudah Terupdate',
                icon: 'success',
                // confirmButtonText: 'Cool'
            });
            setcekapi(response.data);
            disablesettekan(true);
        }).catch(function(error) {
            console.log(error);
        })
    }

    return (
        <>
            <section>
                <form action="" method="post" onSubmit={update}>
                    <div className="text-right">
                        <button type="button" onClick={() => {
                            disablesettekan(!disabletekan);
                        }}
                        >{!disabletekan ? 'Keluar Mode Edit' : 'Edit'} | </button>
                        <button type="submit" hidden={disabletekan}> Simpan Data</button>
                    </div>
                    <div className="w-full">
                        <div className="grid grid-cols-1">
                            <label htmlFor="" className="text-sm">Nama</label>
                            <input onChange={(e) => setnama(e.target.value)} type="text" name="" id="nama" 
                                className={`d-block ${!disabletekan ? 'bg-gray-200' : 'bg-gray-300'} text-sm rounded h-8`}
                                value={nama} disabled={disabletekan}
                            />
                            {/* <label htmlFor="" className="text-sm mt-4">Email</label>
                            <input type="text" name="" id="" 
                                className={`d-block ${!disabletekan ? 'bg-gray-200' : 'bg-gray-300'} text-sm rounded h-8`}
                                value={cekapi.email} disabled={disabletekan}
                            /> */}
                        </div>
                        <div className="grid grid-cols-2">
                            <label htmlFor="" className="text-sm mt-4 order-1">NPM</label>
                            <input onChange={(e) => setnpm(e.target.value)} 
                                type="text" name="" id="npm" 
                                className={`w-11/12 ${!disabletekan ? 'bg-gray-200' : 'bg-gray-300'} text-sm rounded h-8 order-3`}
                                value={npm} placeholder={!npm ? 'Kosong' : npm} disabled={disabletekan}
                            />
                            <label htmlFor="" className="text-sm mt-4 order-2">Semester</label>
                            <input onChange={(e) => setsemester(e.target.value)} 
                                type="text" name="" id="semester" 
                                className={`w-full ${!disabletekan ? 'bg-gray-200' : 'bg-gray-300'}  text-sm rounded h-8 order-4`}
                                value={semester} placeholder={!semester ? 'Kosong' : semester} 
                                disabled={disabletekan}
                            />
                        </div>
                        <div className="grid grid-cols-1">
                            <label htmlFor="" className="text-sm mt-4">Kelas</label>
                            <input onChange={(e) => setkelas(e.target.value)} 
                                type="text" name="" id="" 
                                className={`d-block ${!disabletekan ? 'bg-gray-200' : 'bg-gray-300'} text-sm rounded h-8`}
                                value={kelas} placeholder={!kelas ? 'Kosong' : kelas} disabled={disabletekan}
                            />
                        </div>        
                        <div className="grid grid-cols-1">
                            <label htmlFor="" className="text-sm mt-4">Alamat</label>
                            <input onChange={(e) => setalamat(e.target.value)} 
                                type="text" name="" id="" 
                                className={`d-block ${!disabletekan ? 'bg-gray-200' : 'bg-gray-300'} text-sm rounded h-8`}
                                value={alamat} placeholder={!alamat ? 'Kosong' : alamat} disabled={disabletekan}
                            />
                        </div>
                        <div className="grid grid-cols-2">
                            <label htmlFor="" className="text-sm mt-4 order-1">Program Studi</label>
                            <input onChange={(e) => setprogram_studi(e.target.value)} 
                                type="text" name="" id="" 
                                className={`w-11/12 ${!disabletekan ? 'bg-gray-200' : 'bg-gray-300'} text-sm rounded h-8 order-3`} value={program_studi}
                                placeholder={!program_studi ? 'Kosong' : program_studi} disabled={disabletekan}
                            />
                            <label htmlFor="" className="text-sm mt-4 order-2">Jenjang Studi</label>
                            <input onChange={(e) => setjenjang(e.target.value)} 
                                type="text" name="" id="" 
                                className={`w-full ${!disabletekan ? 'bg-gray-200' : 'bg-gray-300'} text-sm rounded h-8 order-4`} value={jenjang}
                                placeholder={!jenjang ? 'Kosong' : jenjang} disabled={disabletekan}

                            />
                        </div>
                    </div>
                </form>
            </section>

        </>
    )
}

export default Profile;