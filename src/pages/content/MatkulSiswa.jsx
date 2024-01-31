import { useLoaderData } from "react-router-dom";
// import { nanoid } from "nanoid";
function MatkulSiswa(){
    const data = useLoaderData();

    return (
        <>
            {data.joinmatkul.map((params, index) => (
                <div id={"div"+params.id} key={"div"+params.id}>
                    <p id={"matkul"+params.id}><b>Nama Matkul</b> : {params.mata_kuliah_dosen}</p>
                    <p id={"dosen"+params.id}><b>Nama Dosen : </b>{params.nama_dosen}</p>
                    <p id={"namaambil"+params.id}><b>Nama Pengambil : </b>{params.nama}</p>
                    <p id={"hari"+params.id}><b>Hari : </b>{params.hari}</p>
                    <p id={"jam"+params.id}><b>Jam Mulai : </b>{params.jam}</p>
                    <p id={"jam_selesai"+params.id}><b>Jam Selesai : </b>{params.jam_selesai}</p>

                    <br />
                </div>
            ))}
        </>
    )
    
    // return (
    //     <>
    //         {data.map((params, index) => {
    //             return (
    //                 <>
    //                     <div id={"div"+params.id} key={"div"+params.id}>
    //                         <p id={"matkul"+params.id} key={"matkul"+params.id}>Nama Matkul : {params.mata_kuliah_dosen}</p>
    //                         <p id={"dosen"+params.id} key={"dosen"+params.id}>Nama Dosen : {params.nama_dosen}</p>
    //                         <p id={"namaambil"+params.id} key={"namaambil"+params.id}>Nama Pengambil : {params.nama}</p>
    //                         <p id={"hari"+params.id} key={"hari"+params.id}>Hari : {params.hari}, {params.jam}</p>
    //                     </div>
    //                     <br />
    //                 </>
    //             )
    //         })}
    //     </>
    // )
}

export default MatkulSiswa;