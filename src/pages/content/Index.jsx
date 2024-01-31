import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import Modal from "react-responsive-modal";
import Swal from "sweetalert2";

function Homepage(){
    const api = useLoaderData();
    let token = localStorage.getItem('token');

    const [data, setData] = useState(api);
    const [matkul, setMatkul] = useState('');
    const [open, setOpen] = useState(false);
    const [cekJoin, setCekJoin] = useState([]);
    const [sks, setSks] = useState();

    let header = {
        headers : {
            Authorization : 'Bearer ' + token
        }
    }

    if(!data.matkulsaya.toString()){
        useState(() => {    
            axios.get(`http://localhost:8000/api/all_matkul`, header)
                .then(function(response){
                    console.log(response);
                    setMatkul(response.data.matkulall);
                    setOpen(false);
                    setSks(response.data.sks);
                }).catch(function(error){
                    console.log(error);
                })
        }, [])
        // Awalnya arr diatas isi matkul
    }

    // console.log(matkul);

    const onCloseModal = () => {
        Swal.fire({
            title: 'Simpan Data Anda? ',
            text: '(Jika Klik Batal Maka Perubahan akan Dibatalkan)',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
                setOpen(false);
                window.location.href='/home/live_absensi_siswa';
            } else if (result.isDenied) {
                axios.delete(`http://localhost:8000/api/delete_matkul`, header)
                    .then(function(response){
                        setCekJoin(response.data.selectjoin);
                        setMatkul(response.data.matkulall);
                        setSks(response.data.sks);
                        Swal.fire('Changes are not saved', '', 'info');
                        setOpen(false);
                        console.log(response);
                    })
                    .catch(function(error){
                        console.log(error)
                    })
            }
          })
    }

    const onJoin = (e) => {
        e.preventDefault();
        const isiData = {
            kode_matkul : e.target.join_matkul.value
        }
        axios.post(`http://localhost:8000/api/regis_matkul`, isiData, header)
            .then(function(response){
                console.log(response);
                alert("Sukses");
                setCekJoin(response.data.selectjoin);
                setMatkul(response.data.matkulall);
                setSks(response.data.sks);
            })
            .catch(function(error){
                console.log(error);
                if(error.response.status == 422){
                    Swal.fire({
                        title: 'Gagal!',
                        text: 'Anda Sudah Ambil Matkul Ini',
                        icon: 'error',
                        // confirmButtonText: 'Cool'
                    });
                }
            })
    }


    return (
        <>
            Hai Ini Homepage Siswa {data.saya.nama}
            {!data.matkulsaya.toString() ? (
                <>
                    <div>Regis Mata Kuliah Anda Terlebih Dahulu ! </div>
                    <div>
                        <button onClick={() => setOpen(true)} className="px-3 py-2 bg-blue-400 hover:bg-blue-600 rounded mt-3">
                            Pilih Matkul
                        </button>
                    </div>
                </>
            ) : (
                <div>Silahkan Absen di Menu List Absen</div>
            ) }

            <Modal open={open} onClose={onCloseModal}>
                <br />
                <div className="w-36">Regis Matkul Anda</div>
                <div className="w-36 text-right">Sisa SKS Anda : {sks} </div>

                <table className="mt-4 table-fixed border-separate border border-slate-500">
                    <thead className="text-center">
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col">Kode Matkul</th>
                            <th scope="col">Mata Kuliah </th>
                            <th scope="col">Nama Dosen </th>
                            <th scope="col">SKS</th>
                            <th scope="col">Hari</th>
                            <th scope="col">Jam Mulai</th>
                            <th scope="col">Jam Selesai</th>
                            <th scope="col" colSpan={2}>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {matkul.toString() ? (
                        matkul.map((params, index) => (
                            <tr key={index}>
                                <th scope="row">{index+1}</th>
                                <td>{params.kode_matkul}</td>
                                <td>{params.mata_kuliah_dosen}</td>
                                <td>{params.nama_dosen}</td>
                                <td>{params.sks}</td>
                                <td>{params.hari}</td>
                                <td>{params.jam}</td>
                                <td>{params.jam_selesai}</td>
                                {/* <td>
                                    anonymous function like so:
                                    {(() => {
                                        if(params.istolak == false && params.accdosen == false){
                                            return 'Belum Acc'
                                        }
                                        if(params.istolak == true && params.accdosen == false){
                                            return 'Ditolak'
                                        }
                                        if(params.istolak == false && params.accdosen == true){
                                            return 'Sudah Diacc'
                                        }
                                    })()}
                                </td> */}
                                <td><form action="" method="post" onSubmit={onJoin} >
                                        <input type="hidden" name="join_matkul" id="" value={params.kode_matkul} />
                                        <button type="submit" className="py-1 px-2 bg-green-200 hover:bg-green-400 rounded">
                                            <i className="fa fa-plus" aria-hidden={true}></i>
                                        </button>
                                    </form>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <div>Pilih Dulu</div>
                        )
                    }



                    </tbody>
                </table>

                {
                    cekJoin && (
                        <>
                            <div className="mt-4">Matkul Yang Di Isi</div>
                            <table className="mt-1 table-fixed border-separate border border-slate-500">
                                <thead className="text-center">
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Kode Matkul</th>
                                        <th scope="col">Mata Kuliah </th>
                                        <th scope="col">Nama Dosen </th>
                                        <th scope="col">SKS</th>
                                        <th scope="col">Hari</th>
                                        <th scope="col">Jam Mulai</th>
                                        <th scope="col">Jam Selesai</th>
                                        <th scope="col" colSpan={2}>Aksi ? </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cekJoin.toString() ? (
                                    cekJoin.map((params, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index+1}</th>
                                            <td>{params.kode_matkul}</td>
                                            <td>{params.mata_kuliah_dosen}</td>
                                            <td>{params.nama_dosen}</td>
                                            <td>{params.sks}</td>
                                            <td>{params.hari}</td>
                                            <td>{params.jam}</td>
                                            <td>{params.jam_selesai}</td>
                                            <td>
                                                {/* Belum Selesai */}
                                                <form action="" method="post">
                                                    <button className="py-1 px-2 bg-red-400 hover:bg-red-700 rounded">
                                                        <i className="fa fa-trash" aria-hidden={true}></i>
                                                    </button>
                                                </form>
                                            </td>
                                        </tr>
                                        ))
                                    ) : (
                                        <div>Pilih Dulu</div>
                                    )
                                }



                                </tbody>
                            </table>
                        </>
                    )
                }
            </Modal>
        </>
    )
}

export default Homepage;