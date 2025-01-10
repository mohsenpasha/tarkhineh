import { useState } from "react"
import ImgPopup from "./ImgPopup"
import { Link } from "react-router-dom"

export default function BranchSection({branches,ContactUs}){
    console.log(ContactUs)
    const [imgPopupToggle,setImgPopupToggle] = useState(false)
    const [imgPopup,setImgPopup] = useState('')
    return(
        <>
        <section className="branch-section">
            <div className="container">
                <div className="section-title">ترخینه گردی</div>
                <div className="branch-list">
                    {branches.map((branch,brachIndex) =>{
                        return(
                            <div key={brachIndex} className="branch-item">
                                <div className="img-holder" onClick={()=> {
                                    setImgPopup(branch.image_url)
                                    setImgPopupToggle(true)
                                }}>
                                    <i className="isax icon-gallery" />
                                    <img src={branch.image_url} alt="" />
                                </div>
                                <div className="info-box">
                                    <div className="branch-title">{branch.name}</div>
                                    <p className="branch-address">{branch.address}</p>
                                    {ContactUs &&
                                        <>
                                            <div className="branch-tel">شماره تماس : <span>021-{branch.number}</span></div>
                                            <p>ساعت کاری: همه‌روزه از ساعت ۱۲ تا ۲۳ بجز روز‌های تعطیل</p>
                                        </>
                                    }
                                    <div className="btn-holder">
                                        <Link to={'/branch/' + branch.slug} className="btn backless-bordered C-r B-r Br-4">
                                            <span>صفحه شعبه</span>
                                            {!ContactUs &&
                                                <i className="isax icon-arrow-left-2"/>
                                            }
                                        </Link>
                                        {ContactUs &&
                                            <a href={branch.location} className="btn B-r Br-4">
                                                <span>دیدن در نقشه</span>
                                            </a>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>
        </section>
        {imgPopupToggle && <ImgPopup img={imgPopup} closePopup={()=> setImgPopupToggle(false)}/>}
        </>

    )
}