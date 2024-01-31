import { useContext, useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ProfileDosen(){
    const dataApi = useLoaderData();
    const [api, setapi] = useState(dataApi);
    const [disabletekan, disablesettekan] = useState(true);

    // Bagian Data
    const [nama, setnama] = useState(api.saya.nama);
    const [alamat, setalamat] = useState(api.saya.alamat ? api.saya.alamat : '');
    const [program_studi, setprogram_studi] = useState(api.saya.program_studi ? api.saya.program_studi : '');

    const Data = {
        nama : nama,
        alamat : alamat,
        program_studi : program_studi,
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
            setapi(response.data);
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
                        </div>
                    </div>
                </form>
            </section>
        </>
    )
}

export default ProfileDosen;