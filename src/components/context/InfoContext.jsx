import axios from "axios";
import { createContext, useEffect, useState } from "react";
import getCookie from "../functoins/getCookie";
import { useNavigate } from "react-router-dom";

const initialState = {
  slider: [
    { img: "../images/img-1.png", title: "تجربه غذای سالم و گیاهی به سبک ترخینه", link: "/menu" },
    { img: "../images/img-1.png", title: "تجربه غذای سالم و گیاهی به سبک ترخینه", link: "/menu" },
    { img: "../images/img-1.png", title: "تجربه غذای سالم و گیاهی به سبک ترخینه", link: "/menu" },
    { img: "../images/img-1.png", title: "تجربه غذای سالم و گیاهی به سبک ترخینه", link: "/menu" },
  ],
  branches: [],
  selectedBranch: null,
  basket:[],
  order:{}
};

export const InfoContext = createContext(initialState);

export default function InfoProvider({ children }) {
  const [slider, setSlider] = useState(initialState.slider);
  const [branches, setBranches] = useState(initialState.branches);
  const [foodCategory, setFoodCategory] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(initialState.selectedBranch);
  const [basket, setBasket] = useState(initialState.basket);
  const [addressList, setAddressList] = useState([]);
  const [order, setOrder] = useState({address:null});
  const [profile, setProfile] = useState(null);
  const [favList, setFavList] = useState([]);
  const navigate = useNavigate();

  function removeCookie(sKey, sPath, sDomain) {
    document.cookie = encodeURIComponent(sKey) + 
    "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + 
    (sDomain ? "; domain=" + sDomain : "") + 
    (sPath ? "; path=" + sPath : "");
  }


  function logout(){
    setProfile(null)
    setFavList([])
    localStorage.removeItem('profile');
    localStorage.removeItem('favList');
    setAddressList([])
    removeCookie('refreshToken')
    removeCookie('access')
    setTimeout(() => navigate('/', { replace: true }),0)
  }
  const login = async (phoneNumber,otpCode) => {
    const formData = new FormData();
    formData.append("phone_number", phoneNumber);
    formData.append("otp_code", otpCode);
    try {
      const response = await axios.post(
        "/api/login/",
        formData
      );
      setProfile(response.data.profile)
      document.cookie = "access= " + response.data.access;
      document.cookie = "refreshToken= " + response.data.refresh;
      localStorage.setItem('profile',JSON.stringify(response.data.profile));

      return (response.data);
    } catch (error) {
      return error.response
    }
  };
  const fetchBranches = async () => {
    try {
      const response = await axios.post("/api/main/");
      setBranches(response.data.branch);
      setFoodCategory(response.data.food_category);
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  const getaddress = async () => {
    try {
      const response = await axios.post("/api/getaddress/",{},{
        headers:{
          'Authorization':('Bearer' + ' ' + getCookie('access'))
        },
      });
      setAddressList(response.data.address)
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  };
  useEffect(() => {
    const basketValue = localStorage.getItem('basket');
    const profileValue = localStorage.getItem('profile');
    const favListValue = localStorage.getItem('favList');
    if(basketValue){
      setBasket(JSON.parse(basketValue))
    }
    if(profileValue){
      setProfile(JSON.parse(profileValue))
    }
    if(favListValue){
      setFavList(JSON.parse(favListValue))
    }
    getaddress()
    fetchBranches();
  }, []);
  useEffect(()=>{
    const value = localStorage.getItem('selectedBranch');
    if(!value || value != null && selectedBranch == null) {
      setSelectedBranch(JSON.parse(value))
    };
  },[selectedBranch])
  useEffect(()=>{
    const value = localStorage.getItem('favList');
    console.log(favList)
    if(!value || value != null && favList.length){
      localStorage.setItem('favList',JSON.stringify(favList))
    }
  },[favList])
  useEffect(()=>{
    if(order == null){
      setOrder({})
    }
  },[order])
  return (
    <InfoContext.Provider
      value={{
        slider,
        branches,
        foodCategory,
        selectedBranch,
        setSelectedBranch,
        basket,
        setBasket,
        login,
        profile,
        setProfile,
        logout,
        addressList,
        setAddressList,
        order,
        setOrder,
        favList,
        setFavList
      }}
    >
      {children}
    </InfoContext.Provider>
  );
}