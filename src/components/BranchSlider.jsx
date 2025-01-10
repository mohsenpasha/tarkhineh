import { InfoContext } from "./context/InfoContext";
import SimpleSlider from "./SimpleSlider";
import { useContext, useEffect, useState } from "react";
export default function BranchSlider({branch}){
    const {slider,selectedBranch} = useContext(InfoContext)
    const newSlider = slider.map((slide) => {return {img : slide.img}})
    window.addEventListener('resize',windowResize)
    const [under600,setUnder600] = useState(false)
    function fix_number(number){
        let [first_number,second_number]  = number.split('-')
        second_number = first_number.substr(0, first_number.length - 2) + second_number
        return[first_number,second_number]
      }
    const [first_number,second_number] = fix_number(selectedBranch.number)

    useEffect(()=>{
        windowResize()
    },[])
    function windowResize(){
        setUnder600(window.innerWidth < 600)
    }
    return(
        <section className="branch-slider-section">
            <div className="section-title">{selectedBranch.name}</div>
            <SimpleSlider slider={newSlider}/>
            <div className="info-box">
                {
                under600 ? 
                    <>
                        <div className="info address">
                            <i className="isax icon-location"/>
                            <div className="content">
                                <span>{selectedBranch.address}</span>
                            </div>
                        </div>
                        <div className="info">
                            <i className="isax icon-call-calling"/>
                            <div className="content">
                                <span>021 - {selectedBranch.number}</span>
                            </div>
                        </div>
                    </>
                :
                    <>
                            <div className="info">
                                <i className="isax icon-call-calling"/>
                                <div className="content">
                                    <span>021 - {first_number}</span>
                                    <span>021 - {second_number}</span>
                                </div>
                            </div>
                            <div className="info">
                                <i className="isax icon-location"/>
                                <div className="content">
                                    <span>{selectedBranch.address}</span>
                                </div>
                            </div>
                        </>
                }
                <div className="info">
                    <i className="isax icon-clock"/>
                    <div className="content">
                        <span>همه‌روزه از ساعت ۱۲  الی ۲۳ </span>
                    </div>
                </div>
            </div>
        </section>
    )
}