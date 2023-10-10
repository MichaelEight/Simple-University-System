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
    return (
        <main>
        {/* Main content goes here */}
        <h1>Main Content goes here</h1>
        </main>
    );
}

export default function Page0(){
    return(
        <>
            <Sidebar />
            <Content />
        </>
    );
}