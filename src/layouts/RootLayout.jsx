import { Link, Outlet, useLoaderData, useNavigation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BuatLoading from "../pages/Loading";
import Swal from "sweetalert2";

function LayoutRoot(){
    const [buka, setbuka] = useState(true);
    const data = useLoaderData();

    let token = localStorage.getItem('token');

    const TurnOff = {
        isLogin : 0
    };

    const header = {
        headers : {
            Authorization : 'Bearer ' + token
        }
    };

    const logout = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/logout', TurnOff, header)
        .then(function(response){
            console.log(response);
            window.location.href='/';
            localStorage.removeItem('token');
        }).catch(function(error) {
            console.log(error);
        })
    }
    const {state} = useNavigation();

    if(state === 'loading'){
        return <BuatLoading />
    }
    
    return (
        <>
        {/* Credit https://www.youtube.com/watch?v=aMjou4yXWdU */}
            <div className="flex">
                <div className={`${buka ? 'w-72' : 'w-20'} duration-300 min-h-screen overflow-hidden p-5 pt-8 bg-dark-purple relative`}>
                    <img src="./src/assets/arrowleft.png" className={`absolute 
                        cursor-pointer rounded-full -right-3 
                        top-9 w-7 border-2 border-dark-purple ${!buka && "rotate-180" }`} 
                        onClick={() => setbuka(!buka) } 
                    /> 
                    {/* setbuka(false) dibalik logikanya dengan !buka supaya bisa bukatutup */}
                    <div className="flex gap-x-4 items-center">
                        <i className={`fa-solid fa-star cursor-pointer duration-500 ${buka && 'rotate-[360deg]'}`}></i>
                        <h1 className={`text-white 
                                origin-left font-medium text-xl duration-300 
                                ${!buka && "scale-0"}`}>
                            Absensi Online
                        </h1>
                    </div>
                    <ul className="pt-6 ">
                        {/* {
                            Menus.map((items, index) => {
                                return (
                                    <li 
                                        className={`${items.gap ? 'mt-9' : 'mt-2'} text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${index === 0 && 'bg-light-white'}`} key={index}>
                                        <i className={`${items.src}`}></i>  
                                        <span 
                                            className={`${!buka && 'hidden'} origin-left duration-200 `}>
                                            {items.title}

                                        </span>  
                                    </li>
                                )  
                            })
                        } */}
                        <li 
                            className='text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md bg-light-white'>
                            <i className={`fa-solid fa-location-dot`}></i>  
                            <span 
                                className={`${!buka && 'hidden'} origin-left duration-200 text-white`}>
                                <Link className="text-white" to='/home'>{data.saya.isDosen ? 'Dashboard Dosen' : 'Dashboard'}</Link>

                            </span>  
                        </li>
                        <li 
                            className={`mt-2 text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md `}>
                            <i className={`fa-solid fa-location-dot`}></i>  
                            <span 
                                className={`${!buka && 'hidden'} origin-left duration-200 text-white`}>
                                {
                                    data.saya.isDosen ? 
                                        <Link className="text-white" to='/home/absensi_dosen'>
                                            List Absensi
                                        </Link>
                                    : 
                                    data.matkulsaya.toString() ? 
                                        <Link className="text-white" to='/home/live_absensi_siswa'>
                                            Menu Absen
                                        </Link> 
                                    :
                                        <a className="text-white" onClick={() => 
                                            Swal.fire({
                                                title: 'Access Denied!',
                                                text: 'Anda Belum Memiliki Mata Kuliah! Regis Dahulu',
                                                icon: 'error',
                                            })}>
                                            Menu Absen
                                        </a>
                                }
                            </span>  
                        </li>
                        <li 
                            className={`mt-2 text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md `}>
                            <i className={`fa-solid fa-location-dot`}></i>  
                            <span 
                                className={`${!buka && 'hidden'} origin-left duration-200 text-white`}>
                                {
                                    data.saya.isDosen ? <Link className="text-white" to='/home/data_dosen'>Data Dosen</Link> 
                                    : <Link className="text-white" to='/home/list_matkul'>List Mata Kuliah</Link>
                                }
                            </span>  
                        </li>
                        <li 
                            className={`mt-2 text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md `}>
                            <i className={`fa-solid fa-location-dot`}></i>  
                            <span 
                                className={`${!buka && 'hidden'} origin-left duration-200 text-white`}>
                                <Link className="text-white" to='/home/profile'>Profile</Link>
                            </span>  
                        </li>
                    </ul>
                </div>

                <div className="p-7 flex-1 h-screen">
                    {/* <h1>Home Page</h1> */}
                    <section className="text-2xl font-semibold px-4 fixed-top">
                        <nav className="">
                            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto xshidden sm:hidden">
                                <div className="text-sm lg:flex-grow">
                                    <a href="#about" className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 text-lg mr-4">
                                        About Me
                                    </a>
                                    <a href="#skill" className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 text-lg mr-4">
                                        Skill Framework
                                    </a>
                                    <a href="#recent-work" className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 text-lg mr-4">
                                        Recent Work
                                    </a>
                                    <a href="#contact" className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 text-lg mr-4">
                                        Contact Me
                                    </a>
                                </div>

                                <div>
                                    <form method="post" onSubmit={logout}>
                                        <button type="submit" className="inline-block text-sm px-4 py-2 rounded text-gray-600 hover:border-transparent hover:text-white bg-red-500 hover:bg-red-700 mt-4 lg:mt-0 cursor-pointer">

                                            <i className="fa-solid fa-right-from-bracket text-white"></i>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </nav>
                        <div className="mb-4 mt-3">
                            <div className="bg-dark-purple w-full opacity-75 rounded h-1 mx-auto">
                                
                            </div>
                        </div>
                    </section>

                    <Outlet></Outlet>
                </div>
 
            </div>

            {/* <Link to="/" className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 text-lg mr-4">Home</Link>

            <Link to="/about" className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 text-lg mr-4">About</Link> */}
             



        </>
    )
}

export default LayoutRoot;