import { use, useContext, useEffect, useState } from "react";
import calculateDiscount from "./functoins/discount";
import { InfoContext } from "./context/InfoContext";
import axios from "axios";
import getCookie from "./functoins/getCookie";
import SignInPopup from "./SignInPopup";

export default function SingleFood({basketPage,order,food,count}){
    const [under600,setUnder600] = useState(false)
    const {basket,setBasket} = useContext(InfoContext)
    const {favList,setFavList,profile} = useContext(InfoContext)
    const [isFav,setIsFav] = useState(false)
    const [loginToggle,setLoginToggle] = useState(false)
    function add_basket(food){
        const existingFoodIndex = basket.findIndex((item) => item.id === food.id);
        existingFoodIndex == -1 && setBasket([...basket,{...food,count:1}])
    }
    function deleteFood(id){
        localStorage.setItem('basket',basket.filter((food)=> food.id != id));
        setBasket(basket.filter((food)=> food.id != id))
    }
    function increaseFoodQuantity(id){
        setBasket(basket.map((food)=>{
            if( food.id != id) return food
            return {...food,count:food.count += 1}
        }))
    }
    function decreaseFoodQuantity(id){
        setBasket(basket.map((food)=>{
            if( food.id != id) return food
            if(food.count == 1) return food
            return {...food,count:food.count -= 1}
        }))
    }
    useEffect(()=>{
        localStorage.setItem('basket',JSON.stringify(basket));
    },[basket])
    const {finalPrice,discountAmount} = calculateDiscount(food.price,food.discount)
    useEffect(()=>{
        checkUnder600()
    },[])
    useEffect(()=>{
        const isFavariot = favList.some((fav)=> fav.id == food.id)
        setIsFav(isFavariot)
    },[favList])
    function checkUnder600(){
        setUnder600(window.innerWidth < 600)
    }
    const addFav = async () => {
        const formData = new FormData();
        formData.append('id',food.id)
        try {
          const response = await axios.post("/api/addfav/",formData,{
            headers:{
              'Authorization':('Bearer' + ' ' + getCookie('access'))
            },
          });
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      };
      const removeFav = async () => {
        const formData = new FormData();
        formData.append('id',food.id)
        try {
          const response = await axios.post("/api/removefav/",formData,{
            headers:{
              'Authorization':('Bearer' + ' ' + getCookie('access'))
            },
          });
          console.log(response.data)
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      };
    function toggleFav(id){
        const exist = favList.some((foodd)=> foodd.id == id && true)
        if(exist){
            removeFav()
            setIsFav(false)
            setFavList(favList.filter((food)=> food.id != id))
        }
        else{
            addFav()
            setIsFav(true)
            setFavList([...favList,food])
        }
    }
    function openLoginPopup(){
        setLoginToggle(true)
    }
    window.addEventListener('resize',checkUnder600)
    return(
        <>
        <div className="single-food">
            {basketPage && under600
            ?
            <></>
            :
            <div className="img">
                    <img src={food.image_url} alt="" />
                    {order && 
                        <span className="count">×{count}</span>
                    }
                </div>
            }
            <div className="info-box">
                <div className="row W-100 title-row">
                    <div className="food-name">{food.name}</div>
                    {basketPage && !under600 &&
                        <span className="C-p" onClick={()=>deleteFood(food.id)}>
                            <i className="isax icon-trash" />
                        </span>
                    }
                </div>
                {basketPage && under600
                ?
                <div className="final-price">{finalPrice.toLocaleString("en-US")} تومان</div>
                :
                <div className="row W-100">
                        {!order &&
                            <div className="col Ai-start">
                                {!basketPage &&
                                    <div onClick={()=> profile ? toggleFav(food.id) : openLoginPopup()} className="add-fav">
                                        <i className={isFav ? "isax-b icon-heart" : "isax icon-heart"} />
                                        <span>افزودن به علاقمندی‌ها</span>
                                    </div>
                                }
                                <div className="food-description">برنج سبزی کوفته لپه آرد نخودچی، گردو و زرشک و آلو پیاز</div>
                                {!basketPage &&
                                    <div className="score-box">
                                        <div className={"star point-" + food.point}>
                                            <img className="main-star" src="../../images/star.svg" alt="" />
                                        </div>
                                        <span className="score">{food.point}</span>
                                        <span className="score-count">({food.point_count} امتیاز)</span>
                                    </div>
                                }
                            </div>
                        }
                        <div className="col Ai-end price-box">
                            {food.discount &&
                                <div className="discount">
                                    <span className="p-price">{food.price.toLocaleString("en-US")}</span>
                                    <span className="percentage">%{food.discount}</span>
                                </div>
                            }
                            <div className="final-price">{finalPrice.toLocaleString("en-US")}تومان</div>
                        </div>
                    </div>
                }
                {!order &&
                    <div className="btn-holder row W-100">
                        {basketPage && under600
                        ?
                        <></>
                        :
                        <div className="star-box">
                                {
                                    [...Array(5)].map((x,i) =>{
                                        return(
                                            <div key={i} className={i < food.point ? "star point-5" : 'star'}>
                                                <img className="main-star" src="../../images/star.svg" alt="" />
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                        {basketPage 
                        ?
                        <div className="count-box">
                                <i onClick={()=>increaseFoodQuantity(food.id)} className="isax icon-add"/>
                                <span>{food.count}</span>
                                <i onClick={()=>decreaseFoodQuantity(food.id)} className="isax icon-minus active"/>
                                </div>
                        :
                        <div onClick={()=>add_basket(food)} className="btn W-100">افزودن به سبد خرید</div>
                    }
                    </div>
                }
            </div>
        </div>
        {loginToggle && <SignInPopup closePopup={()=>setLoginToggle(false)}/>}
        </>
    )
}