import { useState } from 'react';

const Card = ({ nama, profesi, deskripsi }) => {
  const [likes, setLikes] = useState(0);

  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#667eea', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 'bold' }}>
          {nama?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 style={{ margin: 0 }}>{nama}</h3>
          <small style={{ color: '#667eea', fontWeight: '600' }}>{profesi}</small>
        </div>
      </div>
      <p style={{ color: '#555', margin: '0 0 16px' }}>{deskripsi}</p>
      <button onClick={() => setLikes(likes + 1)} style={{ background: '#667eea', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>
        ♥ Suka ({likes})
      </button>
    </div>
  );
};

export default Card;