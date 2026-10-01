import Header from './components/header';
import Card from './components/card';

function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <Header title="Daftar Profil Saya" />

      {/* Komponen Card */}
      <Card   
        nama="Khairil Abdillah" 
        profesi="Frontend Developer" 
        deskripsi="Berpengalaman membuat UI/UX yang interaktif menggunakan React." 
      />
      
      {/* dst. */}
    </div>
  );
}

export default App;