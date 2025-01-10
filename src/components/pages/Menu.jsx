import { useContext, useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import { InfoContext } from "../context/InfoContext";
import SimpleSlider from "../SimpleSlider";
import MenuFilter from "../MenuFilter";
import FoodList from "../FoodList";
import axios from "axios";
import BranchPopup from "../BranchPopup";

export default function Menu(){
    const {slider,selectedBranch,foodCategory} = useContext(InfoContext)
    const [foodSliderData, setFoodSliderData] = useState(null);
    const [foodCategoryFilter,setFoodCategoryFilter] = useState()
    useEffect(()=>{
        const test = foodCategory.map((category)=>{
            return {...category,active:false}
        })
        setFoodCategoryFilter(test)
    },[foodCategory])
    const fetchFoodList = async () => {
    const formData = new FormData();
    const filterCategory = foodCategoryFilter
    ?.filter((category)=> category.active)
    .map((category) => category.id)
    formData.append("branch", selectedBranch.id);
    if(filterCategory?.length){
        formData.append("category", filterCategory);
    }
    try {
      const response = await axios.post(
        "/api/foodlist/",
        formData
      );
      setFoodSliderData(response.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
    useEffect(()=>{
        if(!selectedBranch) return
        fetchFoodList()
    },[selectedBranch,foodCategoryFilter])
    slider.map((slide)=> delete slide.link)
    if(!selectedBranch) return
    return(
        <>
            <Header/>
            <SimpleSlider slider={slider}/>
            <MenuFilter foodCategoryFilter={foodCategoryFilter} setFoodCategoryFilter={setFoodCategoryFilter}/>
            {foodSliderData &&
                Object.keys(foodSliderData).map((key)=>{
                    return <FoodList key={key} title={key} foodList={foodSliderData[key]}/>
                })
            }
                
            <Footer/>
        </>
    )
}