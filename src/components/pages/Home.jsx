import { useEffect, useState,useContext } from "react"
import Header from "../Header"
import SimpleSlider from "../SimpleSlider"
import MenuSection from "../MenuSection"
import AboutSecton from "../AboutSection"
import BranchSection from "../BranchSection"
import Footer from "../Footer"
import BranchPopup from "../BranchPopup"
import SearchPopup from "../SearchPopup"
import SearchInput from "../SearchInput"
import { InfoContext } from "../context/InfoContext"
export default function Home(){
    const {slider} = useContext(InfoContext)
    const [branchPopup,setBranchPopup] = useState(false)
    const [searchSize,setSeachSize] = useState(false)
    const [searchToggle,setSeachToggle] = useState(false)
    window.addEventListener('resize',windowResize)
    useEffect(()=>{
        window.innerWidth < 600 ? setSeachSize(false) : setSeachSize(true)
    },[])
    function windowResize(){
        window.innerWidth < 600 ? setSeachSize(false) : setSeachSize(true)
    }
    const {branches} = useContext(InfoContext)
    return (
        <>
            <Header openSearch={()=>setSeachToggle(true)}/>
            <SimpleSlider slider={slider}/>
            {searchSize == false && <SearchInput/>}
            <MenuSection />
            <AboutSecton />
            <BranchSection branches={branches} />
            {branchPopup && <BranchPopup closePopup={()=>setBranchPopup(false)} branches={branches}/>}
            {searchSize && searchToggle && <SearchPopup closePopup={()=>{setSeachToggle(false)}} />}
            <Footer />
        </>
    )
}