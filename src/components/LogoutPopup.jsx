import { useContext } from "react"
import { InfoContext } from "./context/InfoContext"

export default function LogoutPopup({closePopup}){
    const {logout,profile} = useContext(InfoContext)
    if(!profile) return
    return(
        <div className="popup">
            <div className="logout-popup box">
                <div className="box-header">
                    <div className="title">خروج</div>
                    <span className="close-icon" onClick={closePopup}></span>
                </div>
                <div className="box-content">
                    <div className="description">آیا مایل به خروج از حساب کاربری خود هستید؟</div>
                    <div className="btn-holder">
                        <div className="btn Br-4" onClick={closePopup}>بازگشت</div>
                        <div className="btn delete Br-4" onClick={()=>{logout();closePopup()}}>خروج</div>
                    </div>
                </div>
            </div>
        </div>
    )
}