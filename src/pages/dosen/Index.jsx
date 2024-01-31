import { useState } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import BuatLoading from "../Loading";

function MenuDosen(){
    const data = useLoaderData();
    
    const [selected, setSelected] = useState(null);
    const handleChange = (e) => {
        setSelected(e.target.value);
    }

    const filterdata = data.filter((params) => params.mata_kuliah_dosen === selected);

    return (
        <>
            <div className="flex justify-content-end">
                Test 
                <select value={selected ? selected : '--Pilih Mata Kuliah--'} 
                    onChange={handleChange} name="" id="">
                    <option value="" >--Pilih Mata Kuliah--</option>
                    {data.map((params, index) => {
                        return <option value={params.mata_kuliah_dosen} 
                            key={index}>{params.mata_kuliah_dosen}</option>
                        })}
                </select>
            </div>
            {
                selected ? (
                    <div className="w-full">
                        {filterdata.map(({mata_kuliah_dosen}, index) => (
                            <div key={index}>Matkul : {mata_kuliah_dosen}</div>
                        ) )}

                        {filterdata.map(({nama}, index) => (
                            <div key={index}>Nama : {nama}</div>
                        ) )}
        
                        {filterdata.map(({kode_dosen}, index) => (
                            <div key={index}>Kode : {kode_dosen}</div>
                        ) )}
        
                        {filterdata.map(({hari, jam}, index) => (
                            <div key={index}>Jadwal : Hari {hari} Jam {jam}</div>
                        ) )}
                    </div>
                ) : (
                    <div>Pilih Data Terlebih Dahulu</div>
                )
            }

            {/* <div>Hai {data.nama} Ini Menu Dsen</div> */}
        </>
    )
}

export default MenuDosen;