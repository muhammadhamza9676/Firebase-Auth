import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'; // Import the updatePassword function
import { auth } from '../Firebase'; // Import your Firebase configuration
import { useUser } from '../UserContext';




const Profile = (props) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Reauthenticate the user with their current password
      const credential = EmailAuthProvider.credential(user.email, oldPassword);
      await reauthenticateWithCredential(user, credential);

      // Update the user's password
      await updatePassword(user, newPassword);

      // Password updated successfully
      console.log('Password updated successfully');
      props.showAlert("Password updated successfully", "success");
      navigate('/'); // Navigate to the home page or any other desired page
    } catch (error) {
      console.error('Password update error:', error);
      props.showAlert("Password update error", "danger");
    }

  };
  return (
    <div className='container text-center text-white'>
      <main className='mt-5 text-primary'>
        <h1 className='mt-5'>Update Profile</h1>
      </main>

      <div className='container d-flex justify-content-center align-items-center text-center my-5'>

        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">

                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="oldPassword"
                    placeholder="Old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="newPassword"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <button type="button" className="btn btn-primary mx-2 rounded-0" onClick={() => { navigate('/') }}>Back to Home</button>
                <button type="submit" className="btn btn-success rounded-0">Update Password</button>
              </form>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}

export default Profile
