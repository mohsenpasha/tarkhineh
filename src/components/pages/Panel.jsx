import Footer from "../Footer"
import Header from "../Header"
import { useContext, useEffect, useState } from "react"
import { AddAddressPopup, AddressBox, BasketRoad, EmptyBasket, SingleAddress } from "./Basket"
import FoodList from "../FoodList"
import SingleFood from "../SingleFood"
import { InfoContext } from "../context/InfoContext"
import LogoutPopup from "../LogoutPopup"
import { Link, NavLink, useParams } from "react-router-dom"
import axios from "axios"
import getCookie from "../functoins/getCookie"
import calculateDiscount from "../functoins/discount"

export default function Panel(){
    const { slug } = useParams();
    console.log(slug)
    const [addAddress,setAddAddress] = useState(false)
    const [toggleMenu,setToggleMenu] = useState(true)
    const [under900,setUnder900] = useState(false)
    const {addressList,setAddressList,profile} = useContext(InfoContext)
    const [addressInput,setAddressInput] = useState({id:'',title:'',name:'',phone_number:'',address:''})
    useEffect(()=>{
        setUnder900(window.innerWidth < 900)
    },[])
    window.addEventListener('resize',()=>setUnder900(window.innerWidth < 900))
    const [editProfile,setEditProfile] = useState(false)
    function editHandle(id,action){
        const deleteAddress = async () => {
            const formData = new FormData();
            formData.append('id', id);
            try {
              const response = await axios.post("/api/deleteaddress/",formData,{
                headers:{
                  'Authorization':('Bearer' + ' ' + getCookie('access'))
                },
              });
            } catch (error) {
              console.error("Error fetching branches:", error);
            }
          };
        if(action == 'delete'){
            setAddressList(addressList.filter((address)=> address.id != id))
            deleteAddress()
        }
        if(action == 'edit'){
            const filteredAddress = (addressList.filter((address)=>{
                return address.id == id
            }))[0]
            setAddressInput({...filteredAddress,phone_number:String(filteredAddress.phone_number)})

            setAddAddress(true)
        }
    }
    useEffect(()=>{
        if(addAddress) return
        setAddressInput({id:'',title:'',name:'',phone_number:'',address:''})
    },[addAddress])
    if(slug != 'order' && slug != 'fav' && slug != 'address' && slug != undefined) return (<h1>404</h1>)
    if(!profile) return
    return(
        <>
            <Header />
                <div className="container">
                    <div className="panel-page">
                        {under900 
                        ? toggleMenu && <PanelMenu closeMenu={()=>setToggleMenu(false)}/>
                        : <PanelMenu closeMenu={()=>setToggleMenu(false)}/>
                        }
                        {!slug &&
                            <BoxWrapper openMenu={()=> setToggleMenu(true)} title={editProfile ? 'ویرایش اطلاعات شخصی' : 'پروفایل من'}>
                                <ProfileForm editProfile={editProfile} toggleEdit={()=> setEditProfile(!editProfile)}/>
                            </BoxWrapper>
                        }
                        {slug == 'order' && 
                            <BoxWrapper openMenu={()=> setToggleMenu(true)} title='سفارشات'>
                                {/* <OrderFilter/> */}
                                <Orders under900={under900}/>
                            </BoxWrapper>
                        }
                        {slug == 'fav' && 
                            <BoxWrapper openMenu={()=> setToggleMenu(true)} title='علاقمندی‌ها'>
                                <FavBox />
                            </BoxWrapper>
                        }
                        {slug == 'address' && 
                            <BoxWrapper openMenu={()=> setToggleMenu(true)} toggleAddress={()=>setAddAddress(!addAddress)} address={true} title='آدرس‌ها'>
                                {addressList.length ? 
                                    <div className="address-box">
                                        {addressList.map((address)=>{
                                            return <SingleAddress editHandle={editHandle} address={address} noInput={true}/>
                                        })}
                                    </div>
                                    :
                                    <EmptyBasket shipping={true}/>
                                }
                                {addAddress && <AddAddressPopup addressInput={addressInput} setAddressInput={setAddressInput} togglePopup={()=>setAddAddress(!addAddress)}/>}
                            </BoxWrapper>
                        }
                        
                    </div>
                </div>
            {!under900 && <Footer />}
        </>
    )
}
export function PanelMenu({closeMenu}){
    const [logoutPopup,setLogoutPopup] = useState(false)
    const {profile} = useContext(InfoContext)
    return(
        <>
            <div className="panel-menu-holder">
                <div className="panel-info">
                    <div className="profile-pic">
                        <img src={profile?.image_url} alt="" />
                    </div>
                    <div className="user-info">
                        <span className="name">{profile?.first_name + ' ' + profile?.last_name}</span>
                        <span className="phone">{profile?.phone_number}</span>
                    </div>
                </div>
                <div className="panel-menu">
                    <ul>
                        <li className="">
                            <NavLink onClick={closeMenu} className={({isActive}) => (isActive ? "active" : '')} to='/profile/' end>
                                <i className="isax icon-user"/>
                                <span>پروفایل</span>    
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink onClick={closeMenu} className={({isActive}) => (isActive ? "active" : '')} to='/profile/order/'>
                                <i className="isax icon-wallet-2"/>
                                <span>پیگیری سفارشات</span>
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink onClick={closeMenu} className={({isActive}) => (isActive ? "active" : '')} to='/profile/fav/'>
                                <i className="isax icon-heart"/>
                                <span>علاقمندی‌ها</span>
                            </NavLink>
                        </li>
                        <li className="">
                            <NavLink onClick={closeMenu} className={({isActive}) => (isActive ? "active" : '')} to='/profile/address/'>
                                <i className="isax icon-location"/>
                                <span>آدرس‌های من</span>
                            </NavLink>
                        </li>
                        <li className="logout" onClick={()=>setLogoutPopup(true)}>
                            <i className="isax icon-logout"/>
                            <span>خروج</span>
                        </li>
                    </ul>
                </div>
            </div>
            {logoutPopup && <LogoutPopup closePopup={()=>setLogoutPopup(false)}/>}
        </>
    )
}

export function BoxWrapper({title,children,address,toggleAddress,openMenu}){
    return(
        <div className="panel-box">
            <div className="panel-head">
                <i className='res-toggle isax icon-arrow-right-3' onClick={openMenu} />
                <div className="title">{title}</div>
                {address &&
                    <button onClick={toggleAddress} className="add-address">
                        <i className="isax icon-add-circle" />
                        <span>افزودن آدرس جدید</span>
                    </button>
                }
            </div>
            <div className="box-content">
                {children}
            </div>
        </div>
    )
}

export function ProfileForm({toggleEdit,editProfile}){
    const {profile,setProfile} = useContext(InfoContext)
    const [form,setForm] = useState({first_name:profile.first_name,last_name:profile.last_name,email:profile.email,phone_number:profile.phone_number})
    useEffect(()=>{
        localStorage.setItem('profile',JSON.stringify(profile))
    },[profile])
    const fetchEditProfile = async () => {
        const formData = new FormData();
        Object.entries(form).map(([key,value])=>{
            formData.append(key,value)
        })
        try {
          const response = await axios.post("/api/updateprofile/",formData,{
            headers:{
              'Authorization':('Bearer' + ' ' + getCookie('access'))
            },
          });
          setProfile(response.data)
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      };
      function submitProfile(){
        fetchEditProfile()
        console.log('test')
        toggleEdit()
      }
    return(
        <div className="profile-form">
            <div className="form-holder">
                <div className="input input-c">
                    <input disabled={!editProfile} value={form.first_name} onChange={(e) => setForm({...form,first_name : e.target.value})} type="text" />
                    <span className="placeholder">نام</span>
                </div>
                <div className="input input-c">
                    <input disabled={!editProfile} value={form.last_name} onChange={(e) => setForm({...form,last_name : e.target.value})} type="text" />
                    <span className="placeholder">نام خانوادگی</span>
                </div>
                <div className="input input-c">
                    <input disabled={!editProfile} value={form.email} onChange={(e) => setForm({...form,email : e.target.value})} type="text" />
                    <span className="placeholder">آدرس ایمیل</span>
                </div>
                <div className="input input-c">
                    <input disabled={!editProfile} value={form.phone_number} onChange={(e) => setForm({...form,phone_number : e.target.value})} type="text" />
                    <span className="placeholder">شماره تماس</span>
                </div>
            </div>
            <div className={editProfile ? 'btn-holder J-end' : 'btn-holder'}>
                {editProfile 
                ? 
                    <>
                        <div className="btn Bg-f C-r B-r Br-4" onClick={toggleEdit}>
                            <span>انصراف</span>
                        </div>
                        <div className="btn Br-4" onClick={submitProfile}>
                            <span>ذخیره اطلاعات</span>
                        </div>
                    </>
                :
                    <div className="btn Bg-f C-r B-r Br-4" onClick={toggleEdit}>
                        <i className="isax icon-edit-2" />
                        <span>ویرایش اطلاعات شخصی</span>
                    </div>
                }
            </div>
        </div>
    )
}

export function OrderFilter(){
    return(
        <div className="order-filter">
            <div className="single-filter">
                <i className="isax icon-tick-circle checked" />
                <span className="title">همه</span>
                <i className="isax icon-arrow-left-2 n-checked" />
            </div>
            <div className="single-filter">
                <i className="isax icon-tick-circle checked" />
                <span className="title">جاری</span>
                <i className="isax icon-arrow-left-2 n-checked" />
            </div>
            <div className="single-filter">
                <i className="isax icon-tick-circle checked" />
                <span className="title">تحویل شده</span>
                <i className="isax icon-arrow-left-2 n-checked" />
            </div>
            <div className="single-filter">
                <i className="isax icon-tick-circle checked" />
                <span className="title">لغو شده</span>
                <i className="isax icon-arrow-left-2 n-checked" />
            </div>
        </div>
    )
}


export function Orders({under900}){
    const [orders,setOrders] = useState([])
    const getOrders = async () => {
        try {
          const response = await axios.post("/api/getorder/",{},{
            headers:{
                'Authorization':('Bearer' + ' ' + getCookie('access'))
            },
          });
          setOrders(response.data.order_list);
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      };
      useEffect(()=>{
        getOrders()
      },[])
    if(!orders) return
    return(
        <div className="order-box">
            {orders.length
            ? 
                orders.map((order,orderIndex)=>{
                    return <Order key={orderIndex} order={order} under900={under900}/>
                })
            :
                <EmptyBasket/>
            }
        </div>
    )
}
export function Order({under900,order}){
    const [totalPrice,setTotalPrice] = useState(0)
    const [totalDiscount,setTotalDiscount] = useState(0)
    const {branches} = useContext(InfoContext)
    const [basketRoad,setBasketRoad] = useState(
        [
            {text:'در حال آماده‌سازی',class:'icon-home',active:true},
            {text:'تکمیل اطلاعات',class:'icon-tick-square',active:false},
            {text:'پرداخت',class:'icon-wallet-2',active:false}
        ]
    )
    const [branch,setBranch] = useState(branches.filter((branch)=> branch.id == order.order_list[0]?.food.branch)[0])
    let sumPrice = 0
    let sumDiscount = 0
    order.order_list.map((food)=>{
        const {finalPrice,discountAmount} = calculateDiscount(food.food.price,food.food.discount)
        sumPrice += (finalPrice * food.count)
        sumDiscount += (discountAmount * food.count)
    })

    useEffect(()=>{
        const {finalPrice,discountAmount} = calculateDiscount(sumPrice,order.discount)
        console.log(order.discount)
        setTotalPrice(finalPrice)
        setTotalDiscount(sumDiscount + discountAmount)
    },[])
    if(!order) return
    return(
        <div className="order">
            <div className="order-head">
                <div className="hint-holder">
                    {order.shiping_way == "peykDelivery" 
                    ? 
                        <HintBox title='ارسال توسط پیک'/>
                    :
                        <HintBox title='تحویل حضوری'/>
                    }
                    {order.status == 'جاری'?
                        <HintBox title={order.status} classN='warning' />
                    :
                    order.status == 'تحویل شده'
                    ?
                        <HintBox title='تحویل شده' classN='success' />
                    :
                        <HintBox title='لغو شده' classN='canceled' />
                    }
                    {/* <div className="delivery-time">
                        <i className="isax icon-clock" />
                        <span>تحویل تا ۲۵:۳۳</span>
                    </div> */}
                </div>
                <div className="branch">{branch?.name}</div>
                <div className="extra-info">
                    <i className="isax icon-calendar-1" />
                    <div>{order.created_at_shamsi}</div>
                    {!under900 && 
                        <>
                            <div>مبلغ: <span>{totalPrice.toLocaleString("en-US")}</span> تومان</div>
                            <div>تخفیف: <span>{totalDiscount.toLocaleString("en-US")}</span> تومان</div>
                        </>
                    }
                </div>
                <div className="extra-info">
                    <i className="isax icon-location" />
                    <div>{order.address.address}</div>
                </div>
                {under900 && 
                    <div className="extra-info">
                        <i className="isax icon-wallet-2" />
                        <div>مبلغ: <span>{totalPrice.toLocaleString("en-US")}</span> تومان</div>
                        <div>تخفیف: <span>{totalDiscount.toLocaleString("en-US")}</span> تومان</div>
                    </div>
                }
            </div>
            <BasketRoad road={basketRoad} orders={true}/>
            <div className="order-list">
                {order.order_list.map((food,foodIndex)=>{
                    return <SingleFood key={foodIndex} food={food.food} count={food.count} order={true}/>
                })}
            </div>
        </div>
    )
}

export function HintBox({title,classN}){
    return(
        <span className={"hint-box " + classN}>
            {title}
        </span>
    )
}
export function FavBox(){
    const {favList,setFavList} = useContext(InfoContext)
    const getFavList = async () => {
        try {
          const response = await axios.post("/api/getfavlist/",{},{
            headers:{
              'Authorization':('Bearer' + ' ' + getCookie('access'))
            },
        });
            setFavList(response.data.favList)
            localStorage.setItem('favList',JSON.stringify(response.data.favList))
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      };
    useEffect(()=>{
        getFavList()
    },[])
    return(
        <div className="fav-box">
            {/* <div className="box-head">
                <OrderFilter/>
                    
                <form action="">
                    <div className="input">
                        <input type="text" placeholder="جستجو" />
                        <button type="submit" className="isax icon-search-normal-1"></button>
                    </div>
                </form>
            </div> */}
            {favList.length ?
                <div className="fav-list">
                    {favList.map((food,foodIndex)=>{
                        return <SingleFood key={foodIndex} food={food}/>
                    })}
                </div>
            :
                <EmptyBasket fav={true}/>
            }
        </div>
    )
}
