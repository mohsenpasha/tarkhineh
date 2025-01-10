export default function HeadBanner({img,title}){
    return(
        <div className="head-banner">
            <img src={img} alt="" />
            <div className="head-title">{title}</div>
        </div>
    )
}