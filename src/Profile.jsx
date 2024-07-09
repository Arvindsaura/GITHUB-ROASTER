import React from 'react';

const Profile = ({ profile }) => {
  return (
    <div>
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
      <p>Followers: {profile.followers}</p>
      <p>Following: {profile.following}</p>
      <p>Public Repos: {profile.public_repos}</p>
    </div>
  );
};

export default Profile;
