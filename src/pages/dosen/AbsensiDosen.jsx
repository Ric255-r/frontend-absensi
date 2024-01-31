import { useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import BuatLoading from "../Loading";
import axios from "axios";
import Swal from "sweetalert2";

function AbsensiDosen(){
    const api = useLoaderData();
    const [data, setData] = useState(api);
    let token = localStorage.getItem('token');

    useEffect(() => {
        console.log(data);
    }, [])
    
    const [selected, setSelected] = useState(null);
    const handleChange = (e) => {
        setSelected(e.target.value);
    }

    const filterdata = data.absen.filter((params) => params.kode_matkul === selected);

    const acc = (e) => {
        e.preventDefault();

        const DataAcc = {
            id : e.target.name_acc.value
        }

        axios.post(`http://localhost:8000/api/acc_absen`, DataAcc, {
            headers : {
                Authorization : 'Bearer ' + token
            }
        }).then(function(response){
            Swal.fire({
                title: 'Sukses!',
                text: 'Absen Sudah Terupdate',
                icon: 'success',
                // confirmButtonText: 'Cool'
            });
            setData(response.data)
        }).catch(function(error){
            console.log(error)
        });
    }


    const tolak = (e) => {
        e.preventDefault();

        const DataTolak = {
            id : e.target.name_tolak.value
        }

        axios.post(`http://localhost:8000/api/tolak_absen`, DataTolak, {
            headers : {
                Authorization : 'Bearer ' + token
            }
        }).then(function(response){
            setData(response.data)
        }).catch(function(error){
            console.log(error)
        });
    }
    
    const accsemua = (e) => {
        e.preventDefault();
        const DataAccSemua = {
            kode_matkul: selected
        }

        axios.post(`http://localhost:8000/api/acc_semua`, DataAccSemua, {
            headers : {
                Authorization : 'Bearer ' + token
            }
        }).then(function(response){
            setData(response.data);
            Swal.fire({
                title: 'Sukses!',
                text: 'Absen Sudah TerAcc Semua Hari ini',
                icon: 'success',
                // confirmButtonText: 'Cool'
            });
        }).catch(function(error){
            console.log(error);
        });
    }

    const [check, setChecked] = useState(true);

    return (
        <>
            <div className="flex justify-content-end">
                Menu List Absen 
                <select value={selected ? selected : '--Pilih Mata Kuliah--'} 
                    onChange={handleChange} name="" id="">
                    <option value="" >--Pilih Mata Kuliah--</option>
                    {data.matkul.map((params, index) => {
                        return <option value={params.kode_matkul} 
                            key={index}>{params.mata_kuliah_dosen}</option>
                        })}
                </select>
            </div>
            {
                selected ? (
                    <div className="w-full">
                        <div className="text-right">
                            <form action="" method="post" onSubmit={accsemua}>
                                <button type="submit">Acc Semua Hari Ini?</button>
                            </form>
                        </div>
                        <table className="mt-4 table-fixed border-separate border border-slate-500">
                            <thead>
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">NPM</th>
                                    <th scope="col">Mata Kuliah </th>
                                    <th scope="col">Hari Absen</th>
                                    <th scope="col">Tanggal Absen</th>
                                    <th scope="col">Absen Masuk</th>
                                    <th scope="col">Absen Selesai</th>
                                    <th scope="col">Acc Dosen</th>
                                    <th scope="col">Foto Mhs Awal</th>
                                    <th scope="col">Foto Mhs Akhir</th>
                                    <th scope="col" colSpan={2}>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterdata.map((params, index) => (
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{params.npm_mahasiswa}</td>
                                    <td>{params.mata_kuliah_dosen}</td>
                                    <td>{params.hari_absen}</td>
                                    <td>{params.tanggal_absen}</td>
                                    <td>{params.jam_absen_masuk}</td>
                                    <td>{params.jam_absen_selesai ? params.jam_absen_selesai : 'Belum Ada'}</td>
                                    <td>
                                        {/* anonymous function like so: */}
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
                                    </td>
                                    <td><img src={params.foto_mhs} alt="" height={50} width={50} /></td>
                                    <td>{params.foto_mhs_selesai ? 
                                        <img src={params.foto_mhs_selesai} alt="" height={50} width={50} /> 
                                        : 'Belum Ada'}
                                    </td>
                                    <td><form action="" method="post" onSubmit={acc}>
                                            <input type="hidden" name="name_acc" id="" value={params.id} />
                                            <button type="submit">Acc?</button>
                                        </form></td>
                                    <td><form action="" method="post" onSubmit={tolak}>
                                        <input type="hidden" name="name_tolak" id="" value={params.id} />
                                        <button type="submit">Tolak?</button>
                                    </form></td>
                                </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>Pilih Data Terlebih Dahulu</div>
                )
            }

            {/* <div>Hai {data.nama} Ini Menu Dsen</div> */}
        </>
    )

}

export default AbsensiDosen;