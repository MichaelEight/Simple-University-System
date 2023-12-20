export default function ContentTechContact() {

  const highlightStyle = { 
    margin: '10px', 
    fontWeight: 'bold', 
    color: 'black', 
    backgroundColor: 'white', 
    fontSize: '18px', 
    display: 'inline', 
    padding: '2px 5px',
    borderRadius: '10px'
  }

  const subtextStyle = {
    margin: '5px',
    fontStyle: 'italic'
  }

  const titletextStyle = {
    fontSize:'20px',
    fontWeight: 'bold',
    marginBottom: '7px'
  }

  return (
    <main>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 'bold', fontSize: '24px', marginTop: '10px', marginBottom: '10px' }}>KONTAKT</p>

        <div style={{ marginBottom: '30px' }}>
          <p style={titletextStyle}>Telefon 📞</p>
          <p style={highlightStyle}>+48 123 456 789</p>
          <p style={subtextStyle}>(aby skontaktować się z innym dziekanatem, wybierz 0...)</p>
          <p style={subtextStyle}>(aby złożyć podanie i uzyskać odpowiedź negatywną, wybierz 1...)</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <p style={titletextStyle}>Email 📧</p>
          <p style={highlightStyle}>kontakt@mak.pl</p>
          <p style={subtextStyle}>(odpowiadamy szybciej niż leci e-mail! Czasem...)</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <p style={titletextStyle}>Gołąb Pocztowy 🕊️</p>
          <p style={highlightStyle}>Gołąb numer 42, Trzecie gniazdo na dachu Monotechniki</p>
          <p style={subtextStyle}>(prosimy dołączyć mapę i krakersy - gołąb uwielbia przekąski!)</p>
        </div>


        <div>
          <p style={titletextStyle}>Biuro Obsługi Strapionych Studentów (BOSS) 🏢</p>
          <p style={highlightStyle}>poniedziałek - piątek: 12:05 - 12:20 (czasami krócej)</p>
          <p style={subtextStyle}>Masz problem? Pomożemy go rozwiązać! Potrzebujemy tylko zaświadczenie A38...</p>
        </div>
      </div>
    </main>
  );
}
