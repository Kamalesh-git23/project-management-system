import { useState } from "react";

import Layout from "../components/common/Layout";

import { useAuth } from "../hooks/useAuth";

function ProfilePage() {

  const {
    user,
    updateProfile,
    changePassword,
  } = useAuth();

  const [profileData, setProfileData] =
    useState({
      firstName:
        user?.firstName || "",

      lastName:
        user?.lastName || "",

      description:
        user?.description || "",

      image:
        user?.image || "",
    });

  const [passwordData, setPasswordData] =
    useState({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  const handleProfileSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await updateProfile(
          profileData
        );

        alert(
          "Profile Updated Successfully"
        );
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to update profile"
        );
      }
    };

  const handlePasswordSubmit =
    async (e) => {
      e.preventDefault();

      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {
        return alert(
          "Passwords do not match"
        );
      }

      try {
        await changePassword(
          passwordData
        );

        alert(
          "Password Updated Successfully"
        );

        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        alert(
          error.response?.data
            ?.message ||
            "Failed to change password"
        );
      }
    };

  return (
    <Layout pageTitle="Profile">

      <div className="profile-page">

        <div className="profile-card-page">

          <h2>
            Edit Profile
          </h2>

          <form
            onSubmit={
              handleProfileSubmit
            }
          >

            <input
              type="text"
              placeholder="First Name"
              value={
                profileData.firstName
              }
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  firstName:
                    e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Last Name"
              value={
                profileData.lastName
              }
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  lastName:
                    e.target.value,
                })
              }
            />

            <input
              type="email"
              value={user?.email}
              disabled
            />

            <textarea
              rows="4"
              placeholder="Description"
              value={
                profileData.description
              }
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  description:
                    e.target.value,
                })
              }
            />

            <button
              type="submit"
            >
              Save Profile
            </button>

          </form>

        </div>

        <div className="profile-card-page">

          <h2>
            Change Password
          </h2>

          <form
            onSubmit={
              handlePasswordSubmit
            }
          >

            <input
              type="password"
              placeholder="Current Password"
              value={
                passwordData.currentPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword:
                    e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="New Password"
              value={
                passwordData.newPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword:
                    e.target.value,
                })
              }
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={
                passwordData.confirmPassword
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirmPassword:
                    e.target.value,
                })
              }
            />

            <button
              type="submit"
            >
              Change Password
            </button>

          </form>

        </div>

      </div>

    </Layout>
  );
}

export default ProfilePage;