import React from "react";
import user from "./assets/user.svg"



function Profile () {

  function openTab(tabName) {
    var i, tabContent;

    // Hide all tab content
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }

    // Deactivate all tab buttons
    var tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
    }

    // Show the clicked tab content and activate the button
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
  }

  return(
    <div className="container h-screen mx-auto mt-8 flex flex-col font-mono">
      <h1 className="text-brandColor text-2xl mb-8 ml-5">Pofile</h1>
      <div className="flex gap-5">
        <div className="flex flex-col justify-center items-center rounded-xl w-1/3 border-2 max-h-60">
          <img src={ user } alt="user" width={ 120 } />
          <p className="mt-4 mb-4">Nababa Abdulrahmon Ayinde</p>
        </div>
        <div className="w-2/3 border-2 rounded-xl">
          <div className="flex justify-around p-3 items-center border-b-2 w-11/12 mx-auto">
            <div className="tab-button p-3 hover:bg-brandColor cursor-pointer hover:text-white" onclick="openTab('overview')">Overview</div>
            <div className="tab-button p-3 hover:bg-brandColor cursor-pointer hover:text-white" onclick="openTab('editProfile')">Edit Profile</div>
            <div className="tab-button p-3 hover:bg-brandColor cursor-pointer hover:text-white" onclick="openTab('changePassword')">Change Password</div>
          </div>
          <div id="overview" className="tab-content active w-11/12 mx-auto">
            <h3 className="mt-6 mb-6 font-bold">Profile Details</h3>
            <div className="flex gap-12">
              <div className="flex flex-col">
                <div className="text-brandColor font-bold mb-4">Full Name</div>
                <div className="text-brandColor font-bold mb-4">Username</div>
                <div className="text-brandColor font-bold mb-4">Phone Number</div>
                <div className="text-brandColor font-bold mb-4">Email Address</div>
                <div className="text-brandColor font-bold mb-4">Address</div>
                <div className="text-brandColor font-bold mb-4">Number Of Order</div>
              </div>
              <div className="flex flex-col">
                <div className="mb-4">Nababa Abdulrahmon Ayinde</div>
                <div className="mb-4"> Magaji</div>
                <div className="mb-4">07033443772</div>
                <div className="mb-4">ogboyesam@gmail.com</div>
                <div className="mb-4">4th Floor, ITF Building</div>
                <div className="mb-4">5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}




export default Profile