import './MainPage.css'

function Sidebar() {
    return (
        <aside>
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
    return (
        <main>
        <div>
            <div className='textStyleCentered'>
                <p>Monotechnika Akademicka</p>
                <p style={{fontWeight: 'bold', fontSize: '32px'}} >WITAJ W SYSTEMIE SUS</p>
            </div>

            <p style={{ fontWeight: 'bold', fontSize: '24px', margin: 10, borderBottom: '2px solid #999' }}>UWAGA TECHNICZNA!</p>
            <p style={{margin: 0}}>Każdego dnia w godzinach zależny od fazy księżyca, pogody i wielu innych czynników niezależnych od nas - system może nie działać. Wszelkie skargi proszę składać do prorektora Politechniki Wrocławskiej Kamila Stańca.</p>
        </div>
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