import SearchInput from "./SearchInput";

export default function SearchPopup({closePopup}){
    return(
        <div className="popup">
            <div className="p-search branch-section box">
                <div className="box-header">
                    <div className="title">جستجو</div>
                    <span className="close-icon" onClick={closePopup}></span>
                </div>
                <div className="box-content">
                    <div className="description">لطفا متن خود را تایپ و سپس دکمه Enter را بزنید.</div>
                    <SearchInput/>
                </div>
            </div>
        </div>
    )
}