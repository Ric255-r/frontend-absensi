import { useEffect, useLayoutEffect, useMemo, useState, useTransition } from 'react'
import { Navigate, RouterProvider, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom'
// // import { router } from './routers/Index'
// import { UserContext } from './context/Index'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Login from './pages/auth/Login'
import AuthLayout from './layouts/AuthLayout'
import LayoutRoot from './layouts/RootLayout'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Tentang from './pages/About'
import axios from 'axios'
import Register from './pages/auth/Register'
import Profile from './pages/content/Profile'
import DataMhs from './pages/content/DataMhs'
import Swal from 'sweetalert2'
import { getApi, getMatkulDosen, getListMatkul } from './apis/loader'
import MenuDosen from './pages/dosen/Index'
import ProfileDosen from './pages/dosen/ProfileDosen'
import BuatLoading from './pages/Loading'
import * as React from 'react'
import MatkulSiswa from './pages/content/MatkulSiswa'
import { getAbsensiSiswa } from './apis/loader'
import AbsensiDosen from './pages/dosen/AbsensiDosen'
import DataDosen from './pages/dosen/DataDosen'
import HomepageAbsen from './pages/Index'
import Homepage from './pages/content/Index'
import ErrorPage from './pages/ErrorPage'
// const Profilenya = React.lazy(() => import('./pages/content/Profile'));
// const ProfileDosennya = React.lazy(() => import('./pages/dosen/ProfileDosen'));

function App() {
  const [loading, setLoading] = useState(true);
  // const [datauser, setDataUser] = useState();
  const [login, setLogin] = useState();
  const [dosen, setIsDosen] = useState();
  let token = localStorage.getItem('token');

  useEffect(() => {
      axios.get(`http://localhost:8000/api/me`, {
        headers : {
          Authorization: 'Bearer ' + token
        }
      })
        .then(response => {
          setLogin(response.data.saya.isLogin); //Langsung Get dari API
          setIsDosen(response.data.saya.isDosen);
          // setDataUser(response.data); //Bentuk Object
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLogin(false); 
          setLoading(false);
        });

  }, []);

  const browserRouter = createBrowserRouter(createRoutesFromElements(
    <>
      {/* Parent */}
      <Route element={login ? <Navigate to='/home' /> : <AuthLayout />} 
        errorElement={<ErrorPage />}>
        {/* Children */}
        <Route path='/' element={!login && <Login />}></Route>
        <Route path='/register' element={!login && <Register />}></Route>
      </Route>

      {/* Parent */}
      <Route element={login ? <LayoutRoot /> : <Navigate to="/" />} 
        errorElement={<ErrorPage />} loader={getApi}> 
        {/* Children */}
        <Route path='/home' 
          element={!dosen ? <Homepage /> : <MenuDosen />} 
          loader={!dosen ? getApi : getMatkulDosen}>
        </Route>

        <Route path='/home/live_absensi_siswa' 
          element={!dosen && <HomepageAbsen /> }
          loader={!dosen && getListMatkul } >
        </Route>

        {
          !dosen ? <Route path='/home/data_mahasiswa' element={<DataMhs />}></Route>  
          : <Route path='/home/data_dosen' element={<DataDosen />}></Route> 
        }

        <Route path='/home/about' element={<Tentang />}></Route>

        <Route path={!dosen ? '/home/list_matkul' : '/home/absensi_dosen'} 
          element={!dosen ? <MatkulSiswa /> : <AbsensiDosen />} 
          loader={!dosen ? getListMatkul : getAbsensiSiswa} >
        </Route>
        
        <Route path='/home/profile' 
          element={!dosen ? <Profile /> : <ProfileDosen />} loader={getApi} >
        </Route>

        {/*Menggunakan React Suspense */}
        {/* <Route path='/home/profile' 
          element={
          <React.Suspense fallback={<BuatLoading />} >
            {!dosen ? <Profilenya /> : <ProfileDosennya />}
          </React.Suspense>} 
          loader={getApi} >
        </Route> */}
        {/* End React suspense */}


      </Route> 
    </>
  ));


  if (loading) {
    return (
      <>
        {/* Credit : https://tailwindcomponents.com/component/minimal-full-screen-page-loading/landing */}
        {/* <div className=''>
          <div className="flex items-center justify-center w-full h-full mt-auto">
            <div className="flex justify-center items-center space-x-1 text-sm text-gray-700">
                <svg fill='none' className="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                  <path clip-rule='evenodd'
                    d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
                    fill='currentColor' fill-rule='evenodd' />
                </svg>
                <div>Loading ...</div>
            </div>
          </div>
        </div> */}

        {/* Credit : https://codepen.io/duncanmcclean/pen/GRoRRdR */}
        <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
          {/* <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p> */}
        </div>
      </>
    )
  }

  return (
    <>
      <RouterProvider router={browserRouter} />

    {/* Credit Login Form https://larainfo.com/blogs/tailwind-css-simple-login-form-example */}
    
      {/* <UserContext.Provider value={datauser}>
        <BrowserRouter> Ini Versi BrowserRouter & Pake Usecontext untuk passing data
          <Routes>
            // Parent
            <Route element={login ? <Navigate to='/home' /> : <AuthLayout />}>
              // Children
              <Route path='/' element={!login && <Login />}></Route>
              <Route path='/register' element={!login && <Register />}></Route>
            </Route>
            <Route element={login ? <LayoutRoot /> : <Navigate to="/" />}> 
              <Route path='/home' element={<Homepage /> } ></Route>
              <Route path='/home/about' element={<Tentang />}></Route>
              <Route path='/home/profile' element={<Profile />}></Route>  
              <Route path='/home/data_mahasiswa' element={<DataMhs />}></Route>  
            </Route> 
          </Routes>
        </BrowserRouter>
      </UserContext.Provider> */}
    </>
  )
}


// Original
// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
