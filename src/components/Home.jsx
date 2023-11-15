import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Firebase';
import { useUser } from '../UserContext';


function Home() {
  // let navigate = useNavigate();
  // const { currUser } = useUser();
  // const [authUser, setAuthUser] = useState(null);
  // useEffect(()=>{
  //   const listen = onAuthStateChanged(auth, (user)=>{
  //     if(user){
  //       setAuthUser(user);
  //       console.log(authUser);
  //     }
  //     else{
  //       setAuthUser(null);
  //     }
  //   });

  //   return ()=>{
  //     listen();
  //   }
  // },[]);

  // function GotoProfile() {
  //   navigate('/profile');
  // }
  
  // const handleLogout = () => {
  //   signOut(auth).then(()=>{
  //     console.log("Sign Out Success");
  //   }).catch(error => console.log(error))
  //   navigate('/login');
  // }

  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    // Check if there is an authenticated user
    if (user) {
      //navigate('/profile'); // Navigate to the profile page
    } else {
      navigate('/login'); // Navigate to the login page
    }
  }, [user, navigate]);

  const GotoProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      console.log('Sign Out Success');
    }).catch(error => console.log(error));
    navigate('/login');
  };

  return (
    <div className='container text-center text-white'>
      <main className='mt-5 text-primary'>
        <span>Hi, {user ? user.email : 'Guest'}!</span>
        <h1 className='mt-5'>Welcome to Internee.pk</h1>
      </main>

      <div className='container d-flex justify-content-center align-items-center text-center my-5'>

        <button type="button" className="btn btn-primary mx-2 rounded-0" onClick={GotoProfile}>Change Password</button>
        <button type="button" className="btn btn-primary rounded-0" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Home
