import Header from "../components/Header";
import Show from "../components/Show";
// import Add from "../components/Add";
import  "../styles/Home.css";

const Home = ()=>{

    return (
        <>
        <div className ="App">
        <Header/>
        <Show/>
        {/* <Add/> */}
        </div>
        </>
    )
}
export default Home;