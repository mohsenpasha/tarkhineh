import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { InfoContext } from "./context/InfoContext";
import Alert from "./Alert";

export default function SignInPopup({closePopup}){
    console.log('signin')
    const inputRef = useRef([])
    const [otpCode,setOtpCode] = useState(Array(5).fill(''))
    const [btnDisable,setBtnDisable] = useState(true)
    const [btnOtpDisable,setBtnOtpDisable] = useState(true)
    const [otpActive,setOtpActive] = useState(false)
    const [phoneNumber,setPhoneNumber] = useState('')
    const [lastIndex,setLastIndex] = useState(false)
    const [alert,setAlert] = useState({status:false,class:'',text:''})
    const {login,profile} = useContext(InfoContext)
    function do_login(){
        login(phoneNumber,String(otpCode).replaceAll(',','')).then((response)=>{
            if(response.status == 400){
                console.log(response.data.error)
                setAlert({status:true,class:'wrong',text:response.data.error})
            }
            else{
                setAlert({status:true,class:'green',text:'ورود با موفقیت انجام شد.'})
                console.log(response)
                closePopup()
            }
        })
    }
    useEffect(()=>{
        if(phoneNumber.length == 11 && /^09\d{9}$/.test(phoneNumber)){
            console.log('valid')
            setBtnDisable(false)
        }
        else if(phoneNumber.length == 10 && /^9\d{9}$/.test(phoneNumber)){
            setBtnDisable(false)
        }
        else{
            setBtnDisable(true)
        }
    },[phoneNumber])
    useEffect(()=>{
        setBtnOtpDisable(false)
        otpCode.map((value)=>{
            if (value.length != 1) setBtnOtpDisable(true)
        })
        if(lastIndex){
            do_login()
        }
    },[otpCode])
    function handleInputChange(e,index){
        setOtpCode(otpCode.map((value,oindex)=>{
                if(oindex == index){
                    if(e.target.value.length > 1){
                        return e.target.value.slice(0,-1)
                    }
                    return e.target.value
                }
            return value
        }))
        if(index + 1 == 5){
            inputRef.current[index].blur()
            setLastIndex(true)
        }
        else{
            if(e.target.value.length != 0){
                setLastIndex(false)
                inputRef.current[index + 1].focus()
                inputRef.current[index + 1].select()
            }
        }
    }
    console.log(profile)
    // if(profile != null) return
    return(
        <>
            <div className="popup">
                <div className="box sign-popup">
                    <div className="box-header">
                        <i onClick={()=>setOtpActive(false)} className={otpActive ? 'isax icon-arrow-right-3 active' : 'isax icon-arrow-right-3'}/>
                        <div className="logo">
                            <img src="../images/logo.svg" alt="" />
                        </div>
                        <span onClick={closePopup} className="close-icon"></span>
                    </div>
                    <div className={otpActive ? 'box-content' : 'box-content active'}>
                        <div className="title">ورود / ثبت ‌نام</div>
                        <div className="description">با وارد کردن شماره موبایل کد تاییدی برای شما ارسال خواهد شد.</div>
                        <div className="input input-c W-100">
                            <input value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type="number" />
                            <span className="placeholder">شماره همراه</span>
                        </div>
                        <button disabled={btnDisable} onClick={()=> setOtpActive(true)} className="btn Br-4 W-100">ادامه</button>
                        <span className="rules">ورود و عضویت در ترخینه به منزله قبول <Link to='/rules/'>قوانین و مقررات</Link> است.</span>
                    </div>
                    <div className={otpActive ? 'box-content active' : 'box-content'}>
                        <div className="title">کد تایید</div>
                        <div className="description">کد تایید پنج‌رقمی به شماره <span>{phoneNumber}</span> ارسال شد.</div>
                        <div className="verification-holder">
                            {otpCode.map((value,index)=>{
                                return <input value={value} onClick={(e)=>e.target.select()} onChange={(e)=>handleInputChange(e,index)} key={index} ref={(el)=> (inputRef.current[index] = el)} className={alert.class + ' input'} type="number"/>
                            })}
                        </div>
                        <button onClick={do_login} disabled={btnOtpDisable} className="btn Br-4 W-100">ثبت کد</button>
                    </div>
                </div>
            </div>
            {alert.status && <Alert cls={alert.cls} text={alert.text}/>}
        </>
    )
}