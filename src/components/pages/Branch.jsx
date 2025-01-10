import { useContext, useEffect, useState } from "react";
import { InfoContext } from "../context/InfoContext";
import Footer from "../Footer";
import Header from "../Header";
import SimpleSlider from "../SimpleSlider";
import FoodSlider from "../FoodSlider";
import BranchSlider from "../BranchSlider";
import BranchComment from "../BranchComment";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Branch() {
  const { slug } = useParams();
  const { slider, branches,selectedBranch,setSelectedBranch } = useContext(InfoContext);
  const [foodSliderData, setFoodSliderData] = useState({});
  const [branchComment,setBranchComment] = useState('')
  const fetchFoodList = async () => {
    const formData = new FormData();
    formData.append("branch", selectedBranch.id);
    formData.append("category", "1");
    formData.append("special_offer", "True");
    formData.append("popular", "True");
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
  const fetchCommentList = async () => {
    const formData = new FormData();
    formData.append("branch", selectedBranch.id);
    try {
      const response = await axios.post(
        "/api/commentlist/",
        formData
      );
      setBranchComment(response.data.comments);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
    useEffect(() => {
        const branch = branches.find((b) => b.slug === slug);
        setSelectedBranch(branch);
    }, [slug, branches]);
    
      useEffect(() => {
          if (selectedBranch) {
              fetchFoodList();
              fetchCommentList();
              console.log(selectedBranch)
              localStorage.setItem('selectedBranch', JSON.stringify(selectedBranch))
            }
      }, [selectedBranch]);

    if (!selectedBranch) {
        return <p>404 - Branch not found</p>;
    }
  return (
    <>
      <Header />
      <SimpleSlider slider={slider} />
      <FoodSlider title={'پیشنهاد ویژه'} foodList={foodSliderData?.["پیشنهاد ویژه"]} />
      <FoodSlider title={'غذاهای محبوب'} foodList={foodSliderData?.["غذاهای محبوب"]} background="green" />
      <FoodSlider title={'غذاهای ایرانی'} foodList={foodSliderData?.["غذاهای ایرانی"]} />
      <BranchSlider/>
      {branchComment && <BranchComment comments={branchComment}/>}
      <Footer />
    </>
  );
}
