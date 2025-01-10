export default function ImgPopup({img,closePopup}){
    return(
        <div className="popup">
            <div className="p-img-preview branch-section box">
                <div className="box-header">
                    <span className="close-icon" onClick={closePopup}></span>
                </div>
                <div className="box-content">
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
    )
}