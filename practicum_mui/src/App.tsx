import Navbar from "./components/navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";

function App() {
    return (
        <div>
            <Navbar active={'1'}/>
            <Gallery/>
            <Content/>
        </div>
    );
}

export default App;