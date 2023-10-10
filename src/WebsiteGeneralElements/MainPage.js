import './Main.css'

function Sidebar() {
    return (
        <aside>
        {/* Sidebar content goes here */}
        <p>Sidebar Content</p>
        <p>Option 1</p>
        <p>Option 2</p>
        <p>Option 3</p>
        <p>Option 4</p>
        <p>Option 5</p>
        </aside>
    );
}

function Content() {
    const textStyleCentered = {
        display: 'flex',
        flexDirection: 'column', // Stack text vertically
        alignItems: 'center',     // Center horizontally
      };

    return (
        <main>
            
        <main style={textStyleCentered}>
        {/* Main content goes here */}
        <p > Monotechnika Akademicka  </p>
        <p style={{fontWeight: 'bold', fontSize: '32px'}} >WITAJ W SYSTEMIE SUS</p>
        </main>

        <p style={{ fontWeight: 'bold', fontSize: '24px', margin: 10, borderBottom: '2px solid #999' }}>UWAGA TECHNICZNA!</p>
        <p style={{margin: 0}}>Każdego dnia w godzinach zależny od fazy księżyca, pogody i wielu innych czynników niezależnych od nas - system może nie działać. Wszelkie skargi proszę składać do prorektora Politechniki Wrocławskiej Kamila Stańca.</p>
        </main>
    );
}

export default function MainPage(){
    return(
        <>
            <Sidebar />
            <Content />
        </>
    );
}