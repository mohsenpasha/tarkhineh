export default function SingleComment({comment}){
    return(
        <div className="single-comment">
            <div className="profile-info">
                <div className="pic">
                    <img src={comment.user.image_url} alt="" />
                </div>
                <div className="content">
                    <div className="name">{comment.user.first_name + ' ' + comment.user.last_name}</div>
                    <div className="date">{comment.created_at_shamsi}</div>
                </div>
            </div>
            <div className="comment">
                {comment.comment}
            </div>
            <div className="point-box">
                <span className="point">{comment.point}</span>
                <div className={"star point-" + comment.point}>
                    <img className="main-star" src="../images/star.svg" alt="" />
                </div>
            </div>
        </div>
    )
}