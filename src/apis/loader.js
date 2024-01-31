import axios from "axios";
import { useState } from "react";

let token = localStorage.getItem('token');
let kode_matkul = localStorage.getItem('kode_matkul');

export const getApi = () => {
    return fetch(`http://localhost:8000/api/me`, {
        headers : {
            Authorization : 'Bearer ' + token
        }
    });
}

export const getMatkulDosen = () => {
    return fetch(`http://localhost:8000/api/matkul`, {
        headers : {
            Authorization : 'Bearer ' + token
        }
    });
}

export const getAbsensiSiswa = () => {
    return fetch(`http://localhost:8000/api/list_absen_mhs`, {
        headers : {
            Authorization : 'Bearer ' + token
        }
    });
}

export const getListMatkul = () => {
    return fetch(`http://localhost:8000/api/list_matkul/`, {
        headers : {
            Authorization : 'Bearer ' + token
        }
    });
}