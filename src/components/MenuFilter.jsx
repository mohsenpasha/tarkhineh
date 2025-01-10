import { act, use, useContext, useEffect, useRef, useState } from "react"
import MainMenuFilter from "./MainMenuFilter"
import { InfoContext } from "./context/InfoContext"

export default function MenuFilter({foodCategoryFilter,setFoodCategoryFilter}){
    const [sliderRight,setSliderRight] = useState(0)
    const [isDisabled,setIsDisabled] = useState(0)
    function toggleCategory(id){
        setFoodCategoryFilter(foodCategoryFilter.map((category)=>{
            if(category.id != id) return category
            return {...category,active:!category.active}
        }))
    }
    const sliderRef = useRef()
    function item_slider(dir){
        if(isDisabled) return
        const scrollWidth = sliderRef.current.scrollWidth
        const offsetWidth = sliderRef.current.offsetWidth
        if(dir == 'left'){
            scrollWidth / offsetWidth > 2 ? setSliderRight(sliderRight - (offsetWidth * 90 / 100)) : setSliderRight(sliderRight - (scrollWidth - offsetWidth))
        }
        else{
            sliderRight + offsetWidth > 0 ? setSliderRight(0) : setSliderRight(sliderRight + offsetWidth)
        }
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
          }, 300);
    }
    function reset_slider(){
        setSliderRight(0);sliderRef.current.scrollTo({left:0})
    }
    useEffect(()=>{
            window.addEventListener('resize',reset_slider)
        return () =>{
            window.removeEventListener('resize',reset_slider)
            // window.removeEventListener('resize')
        }
    })
    return(
        <>
            {/* <MainMenuFilter /> */}
            <div className="menu-subfilter">
                <div className="container">
                    <div className="inner-sub">
                        <div className="item-slider">
                            <div className="inner-slider" ref={sliderRef}>
                                <ul style={{right:sliderRight}}>
                                    {foodCategoryFilter?.map((category,categoryIndex)=>{
                                        return(
                                            <li onClick={()=>toggleCategory(category.id)} key={categoryIndex} className={category.active ? 'active' : ''}>
                                                <i className="isax icon-tick-circle checked" />
                                                <span className="title">{category.name}</span>
                                                <i className="isax icon-arrow-left-2 n-checked" />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            {/* <div className="arrow-holder">
                                <div className="arrow arrow-right" onClick={()=> item_slider('right')}>
                                    <i className="isax icon-arrow-right-3" />
                                </div>
                                <div className="arrow arrow-left">
                                    <i className="isax icon-arrow-left-2" onClick={()=> item_slider('left')} />
                                </div>
                            </div> */}
                        </div>
                        {/* <div className="input H-40">
                            <input type="text" placeholder="جستجو"/>
                            <i className="isax icon-search-normal-1"/>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}