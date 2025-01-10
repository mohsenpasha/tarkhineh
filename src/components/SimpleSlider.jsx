
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function SimpleSlider({slider}) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      {slider.map((slide,slideIndex) => {
        return (
          <div key={slideIndex} className="c-slider">
            <img src={slide.img} alt="" />
            {slide.title && <span className="title">{slide.title}</span>}
            {slide.link && <Link to={slide.link} className="btn">سفارش آنلاین غذا</Link>}
          </div>
        )
      })}
    </Slider>
  );
}