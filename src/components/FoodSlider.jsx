import SingleFood from "./SingleFood";
import Slider from "react-slick";

export default function FoodSlider({background,foodList,title}){
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        rtl:true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 800,
              settings: {
                slidesToShow: 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
              }
            }
          ]

      };
    return(
        <section className={background == 'green' ? 'product-slider-section Bg-r' : 'product-slider-section'}>
            <div className="container">
                <div className="slider-title">{title}</div>
                <Slider {...settings}>
                  {foodList?.map((food,foodIndex)=>{
                    return <SingleFood key={foodIndex} food={food}/>
                  })}
                </Slider>
            </div>
        </section>
    )
}