import { useLoaderData } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Webcam from "react-webcam";
import CustomWebCam from "./content/CustomWebcam";
import Swal from "sweetalert2";
import 'react-responsive-modal/styles.css';
import Modal from "react-responsive-modal";
import { data } from "autoprefixer";

function HomepageAbsen(){
    // const api = useContext(UserContext);
    // const [api, setapi] = useState({});

    const api = useLoaderData();
    const [datamatkul, setDataMatkul] = useState(api);

    const [selected, setSelected] = useState('');

    const handleChange = (e) => {
        setSelected(e.target.value);
        console.log(e.target.value);
    };


    const filterdata = datamatkul.rekapabsen.filter((params) => {
        return selected && params.kode_matkul === selected 
    });

    // console.log(datamatkul);
    // Tanggal
    const [date, setDate] = useState(new Date());

    useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
  
      return function cleanup() {
        clearInterval(timerID);
      };
    }, []);
  
    function tick() {
      setDate(new Date());
    }
    
    const weekday = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
    let day = weekday[date.getDay()];
    // EndTanggal

    // Show Foto
    const [hiddenPhoto, setHiddenPhoto] = useState(true);

    const handleClick = () => {
        setHiddenPhoto(!hiddenPhoto);
        !hiddenPhoto && setIsParentData('');
        // Penambahan Code 19/09/23. Biar dia Hidden Pas Button Foto ditekan
        hiddenPhoto && setIsParentData('');
        // End Penambahan

        // Tambah Tgl 21/09/23 Utk Modal
        setOpenModal(true);
    }
    // End Show

    // Modal
    const [openModal, setOpenModal] = useState(false);

    const onCloseModal = () => {
        setOpenModal(false);
        setIsParentData(''); // Mutator Variable utk Webcam taruh src ke imgsrc
        setHiddenPhoto(true); // Hide tag img html
        setHiddenKet(true); // Mutator Variable untuk passing boolean dari webcam.jsx ke sini
    }

    // End Modal

    // Parent Untuk Ambil Value Photo dari Child CustomWebCam
    const [isParentData, setIsParentData] = useState('');
    const [hiddenKet, setHiddenKet] = useState(true);
    // End Parent
    // console.log(isParentData);


    // Axios Post
    let token = localStorage.getItem('token');

    const submitform = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('kode_matkul', selected);
        formData.append('hari_absen', day);
        formData.append('foto_mhs', isParentData);

        const header = {
            headers : {
                Authorization : 'Bearer ' + token,
                "Content-Type": "multipart/form-data"
            }
        };

        axios.post(`http://localhost:8000/api/record_absen`, formData, header)
            .then(function(response){
                console.log(response.data);
                onCloseModal();
                Swal.fire({
                    title: 'Sukses!',
                    text: 'Absen Sudah TerRecord',
                    icon: 'success',
                    // confirmButtonText: 'Cool'
                });
                setDataMatkul(response.data);
            }).catch(function(error){
                if(error.response.status == 422){
                    onCloseModal();
                    Swal.fire({
                        title: 'Gagal!',
                        text: 'Anda Sudah Absen Hari Ini Untuk Matkul Ini',
                        icon: 'error',
                        // confirmButtonText: 'Cool'
                    });
                }
                if(error.response.status == 404){
                    onCloseModal();
                    Swal.fire({
                        title: 'Gagal!',
                        text: 'Absen Harus Sesuai dengan Jam Matkul',
                        icon: 'error',
                        // confirmButtonText: 'Cool'
                    });
                }
                console.log(error);
            })
    }

    if (datamatkul.joinmatkul[0].isDosen === 0){
        return (
            <>
                {/* <p>Apakah Fotonya Ada Isi? : {isParentData ? 'Iya' : 'False'}</p> */}
                {/* <br /> */}
                <div className="flex flex-wrap">
                    <div className="text-md flex-auto">
                        Selamat Datang <b>{datamatkul.joinmatkul[0].nama}</b> . Mau Absen Matkul Apa?
                    </div>

                    <div className="text-sm"> 
                        <b>
                            {day.toString()} : {date.toLocaleTimeString([], {
                                hour12: false
                            })} 
                        </b>
                    </div>
                </div>
                <div className="flex flex-wrap mb-2">
                    <p className="text-md flex-auto">Pilih Matkul Anda : </p>

                    <select className="flex-auto text-sm font-bold" value={selected} onChange={handleChange} name="" id="">
                        <option value="">--Pilih Matkul--</option>
                        {/* Awalnya pakai datamatkul.joinmatkul.map */}
                        {datamatkul.matkulnow.map((params, index) => (
                            <option value={params.kode_matkul} key={index} >
                                {params.mata_kuliah_dosen} - {params.hari} - {params.jam} ~ {params.jam_selesai}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-wrap">
                    <div className="flex-auto my-1">Mau Absen ? </div>
                    <div className="">
                        <button className="bg-blue-500 rounded px-3 py-2 text-white" onClick={handleClick}>
                            {/* {hiddenPhoto ? 'Hidupkan Kamera' : 'Matikan Kamera'} */}
                            <i className="fa-solid fa-camera"></i>
                        </button>
                    </div>
                </div>

                <Modal open={openModal} onClose={onCloseModal} center>
                    <br />

                    <div hidden={hiddenPhoto}>
                        {/* ToChild untuk Cek isi dari isParentData ada Value atau Ngga di children */}
                        {/* sendToParent adalah tempat nampung value dari children. Kalo children berubah, mutator setIsParent juga akan Berubah  */}
                        {
                            isParentData && <img src={isParentData} height={600} width={600} alt="" /> 
                        }
                        {!hiddenPhoto && <CustomWebCam toChild={isParentData} sendToParent={setIsParentData} hideKet={setHiddenKet} />}

                        <form action="" method="post" onSubmit={submitform}>
                            {isParentData && <button type="submit" 
                            className="bg-green-500 hover:bg-green-700 px-3 py-3 mt-3 w-full rounded ">Record Absen?</button>}
                        </form>

                        <table hidden={hiddenKet}>
                            <tr>
                                <th> <u>Keterangan</u> </th>
                            </tr>
                            <tr>
                                <th className="pr-10">Nama </th>
                                <td>: {datamatkul.joinmatkul[0].nama}</td>
                            </tr>
                            <tr>
                                <th className="pr-10">NPM</th>
                                <td>: {datamatkul.joinmatkul[0].npm}</td>
                            </tr>
                            <tr>
                                <th className="pr-10">Tanggal Absen</th>
                                <td>: {date.toDateString()} </td>
                            </tr>
                            <tr>
                                <th className="pr-10">Jam Absen</th>
                                <td>: {date.toLocaleTimeString([], {
                                        hour12: false
                                    })}
                                </td>
                            </tr>
                        </table>

                    </div>
                </Modal>

                <div className="font-bold">Rekapan Absen</div>
                {/* {filterdata.map((params, index) => (
                    <div key={index}>
                        <span>{params.npm_mahasiswa}</span>
                        <span>{params.kode_matkul}</span>
                    </div>
                ))} */}
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
                        </tr>
                    </thead>
                    <tbody>
                    {
                        filterdata.toString() ? (
                            filterdata.map((params, index) => (
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
                            </tr>
                            ))
                            
                        ) : (
                            <tr className="py-5">
                                <td colSpan={10} className="text-center">Pilih Data Terlebih Dahulu</td>
                            </tr>
                        )
                    }


                    </tbody>
                </table>

                {/* {
                    filterdata.toString() ? (
                        filterdata.map((params, index) => (
                            <div key={index}>
                                <span>{params.npm_mahasiswa}</span>
                                <span>{params.mata_kuliah_dosen}</span>
                                <span>{params.hari_absen}</span>
                                <span>{params.jam_absen_masuk}</span>
                                <span>{params.jam_absen_selesai}</span>
                                <span>{params.accdosen}</span>
                                <span><img src={params.foto_mhs} alt="" /></span>
                            </div>
                        ))
                    ) : (
                        <div>Pilih Data Terlebih Dahulu</div>
                    )
                } */}

                

            </>
        )
    }else{

    }

}

export default HomepageAbsen;