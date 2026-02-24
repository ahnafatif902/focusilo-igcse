import React from 'react';

const Profile = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-8">Profile</h1>
      <div className="bg-surface neo-border p-6 flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-white neo-border" />
        <div>
          <h2 className="text-xl font-bold">IGCSE Master</h2>
          <p className="text-white/60 text-sm">Level 12 Scholar</p>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="p-4 border-b-2 border-white/10 flex justify-between">
          <span>Settings</span>
          <span>→</span>
        </div>
        <div className="p-4 border-b-2 border-white/10 flex justify-between">
          <span>Achievements</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
