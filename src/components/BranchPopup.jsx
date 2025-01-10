import { useContext } from "react"
import { InfoContext } from "./context/InfoContext"
import { useNavigate } from "react-router-dom"

export default function BranchPopup({closePopup}){
    const navigate = useNavigate()
    const {branches,setSelectedBranch,selectedBranch} = useContext(InfoContext)
    function selectBranch(id){
        setSelectedBranch(branches.filter((branch)=> branch.id == id)[0])
        localStorage.setItem('selectedBranch',JSON.stringify(branches.filter((branch)=> branch.id == id)[0]))
        // navigate('/menu')
        setTimeout(() => navigate('/menu', { replace: true }),10)

    }
    return(
        <div className="popup">
            <div className="p-branch branch-section box">
                <div className="box-header">
                    <div className="title">انتخاب شعبه</div>
                    <span className="close-icon" onClick={closePopup}></span>
                </div>
                <div className="box-content">
                    <div className="description">برای دیدن منوی رستوران، لطفا شعبه مدنظر خود را انتخاب کنید:</div>
                    <div className="branch-list">
                        {branches.map((branch) =>{
                            return(
                                <div onClick={()=>selectBranch(branch.id)} className="branch-item">
                                    <div className="img-holder">
                                        <img src={branch.image_url} alt="" />
                                    </div>
                                    <div className="info-box">
                                        <div className="branch-title">{branch.name}</div>
                                        <p className="branch-address">{branch.address}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}