import Slider from "react-slick";
import SingleComment from "./SingleComment";

export default function BranchComment({comments}){
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        rtl:true,
        responsive:[
            {
                breakpoint: 600,
                settings: {
                  slidesToShow: 1,
                }
              }
        ]
      };
    return(
        <section className="branch-comment-section">
            <div className="container">
                <div className="section-title">نظرات کاربران</div>
                <Slider {...settings}>
                    {
                    comments?.map((comment,commentIndex)=>{
                       return <SingleComment comment={comment} key={commentIndex}/>
                    })}
                </Slider>
            </div>
        </section>
    )
}