import Footer from "../Footer";
import Header from "../Header";
import { Link,useNavigate } from "react-router-dom";
import { useState,useContext, useEffect } from "react";
import SingleFood from "../SingleFood";
import { InfoContext } from "../context/InfoContext";
import calculateDiscount  from '../functoins/discount'
import SignInPopup from "../SignInPopup";
import axios from "axios";
import getCookie from "../functoins/getCookie";

export default function Basket(){
    const [basketRoad,setBasketRoad] = useState(
        [
            {text:'سبد خرید',class:'icon-shopping-cart',active:true},
            {text:'تکمیل اطلاعات',class:'icon-tick-square',active:false},
            {text:'پرداخت',class:'icon-wallet-2',active:false}
        ]
    )
    const {basket,setBasket} = useContext(InfoContext)
    const [togglePopup,setTogglePopup] = useState(false)
    function emptyBasket(){
        setBasket([])
        localStorage.setItem('basket',[]);
        setBasketRoad(
            [
                {text:'سبد خرید',class:'icon-shopping-cart',active:true},
                {text:'تکمیل اطلاعات',class:'icon-tick-square',active:false},
                {text:'پرداخت',class:'icon-wallet-2',active:false}
            ]
        )
    }
    function changeRoad(dir){
        let activeIndex = 0
        setBasketRoad(basketRoad.map((singleRoad,roadIndex)=>{
            if(singleRoad.active){
                activeIndex = roadIndex
                if(dir != 1){
                    return {...singleRoad,active:false}
                }
                else{
                    return singleRoad
                }
            }
            if(dir == 1){
                if(roadIndex == activeIndex + 1){
                    return {...singleRoad,active:true}
                }
                else{
                    return singleRoad
                }
            }
        }
    ))
    }
    
    const renderComponent = basketRoad
        .slice()
        .reverse()
        .reduce((acc, singleRoad, roadIndex) => {
            if (acc) return acc;
            if (singleRoad.active) {
                if (roadIndex === 0) return <PaymentBox />;
                if (roadIndex === 1) return <ShipingBox />;
                if (roadIndex === 2) {
                    if (basket.length === 0) {
                    return <EmptyBasket />;
                    } else {
                    return <BasketFoodList basket={basket} />;
                    }
                }
            }
            return acc;
        }, null);
        console.log(basket.length)
    return(
        <>
            <Header />
                <section className="basket-section">
                    <div className="container">
                    {basket.length != 0 && <BasketRoad road={basketRoad}/> }
                        <div className="basket-box">
                            {renderComponent}
                            {basket.length != 0 && <BasketInfo changeRoad={()=>changeRoad(1)} openPopup={()=>setTogglePopup(true)} basketRoad={basketRoad} basket={basket}/>}
                            {togglePopup && <EmptyBasketPopup emptyBasket={emptyBasket} closePopup={()=>setTogglePopup(false)}/>}
                        </div>
                    </div>
                </section>
            <Footer />
        </>
    )
}
export function BasketRoad({orders,road}){
    return(
        <div className="basket-road">
            {road.map((singleRoad,roadIndex)=>{
                return(
                    <div key={roadIndex} className={singleRoad.active ? "single-road active" : "single-road"}>
                        <i className={"isax " + singleRoad.class} />
                        <span className="road-title">{singleRoad.text}</span>
                    </div>
                )
            })}
        </div>
    )
}


export function BasketInfo({basket,openPopup,changeRoad,basketRoad}){
    let totalPrice = 0
    let totalDiscount = 0
    const [toggleSignIn,setToggleSignIn] = useState(false)
    const {profile,order,setOrder,setBasket} = useContext(InfoContext)
    const [btnDisable,setBtnDisable] = useState(true)
    const [btnDisable2,setBtnDisable2] = useState(false)
    const [totalPriceS,setTotalPrice] = useState(0)
    const [totalDiscountS,setTotalDiscount] = useState(0)
    const [resetBasket,setResetBasket] = useState(false)
    const navigate = useNavigate();
    basket.map((food)=>{
        const {finalPrice,discountAmount} = calculateDiscount(food.price,food.discount)
        totalPrice += (finalPrice * food.count)
        totalDiscount += (discountAmount * food.count)
    })
    useEffect(()=>{
        if(order.discount){
            console.log(order.discount)
            totalDiscount += ((totalPrice * order.discount) / 100)
            totalPrice -= ((totalPrice * order.discount) / 100)
        }
        if(order.address && order.shippingWay == 'peykDelivery'){
            totalPrice += 25000
            setBtnDisable(false)
        }
        else if(order.shippingWay == 'inPersonDelivery'){
            setBtnDisable(false)
        }
        else{
            setBtnDisable(true)
        }
        setTotalPrice(totalPrice)
        setTotalDiscount(totalDiscount)
    },[order, basket])
    useEffect(()=>{
        if(resetBasket) {
            setBasket([])
            setOrder({})
            localStorage.removeItem('basket');

            setTimeout(() => navigate('/profile/order/', { replace: true }),0)
        }
    },[resetBasket])
    const addOrderFetch = async () => {
        const formData = new FormData();
        formData.append("basket", JSON.stringify(basket));
        formData.append("extra_info", JSON.stringify(order));
        try {
            const response = await axios.post(
                "/api/addorder/",
                formData,
                {
                    headers:{
                        'Authorization':('Bearer' + ' ' + getCookie('access'))
                    },
            }
        );
        
        setResetBasket(true)
        // return (response.data);
    } catch (error) {
        setBtnDisable2(false)
        return error.response
    }
};
function submitPayment(){
    setBtnDisable2(true)
    addOrderFetch()
    }
    return(
        <>
            <div className="basket-info">
                <div className="row W-100 row-item desktop-size">
                    <div>سبد خرید<span className="count">({basket.length})</span></div>
                    <span className="trash-btn" onClick={openPopup}>
                        <i className="isax icon-trash"/>
                    </span>
                </div>
                <div className="row W-100 row-item">
                    <div>تخفیف محصولات</div>
                    <div className="price">
                        <span>{totalDiscountS.toLocaleString("en-US")}</span>
                        <span>تومان</span>
                    </div>
                </div>
                {order.shippingWay == 'peykDelivery' && 
                    <div className="col W-100 row-item">
                        <div className="row W-100">
                            <div>هزینه ارسال</div>
                            <div className="price">
                                {order.address ?
                                <span>25,000</span>
                                :
                                <span>0</span>
                                }
                                <span>تومان</span>
                            </div>
                        </div>
                        {!order.address &&
                        <div className="row warning">
                            <i className="isax icon-warning-2"/>
                            <span>هزینه ارسال در ادامه بر اساس آدرس، زمان و نحوه ارسال انتخابی شما محاسبه و به این مبلغ اضافه خواهد شد.</span>
                        </div>
                        }
                    </div>
                }
                <div className="row W-100 row-item B-u">
                    <div>مبلغ قابل پرداخت</div>
                    <div className="price final-price">
                        <span>{totalPriceS.toLocaleString("en-US")}</span>
                        <span>تومان</span>
                    </div>
                </div>
                <div className="row W-100 btn-holder">
                    {profile 
                    ?
                        basketRoad.reduce((acc, singleRoad, roadIndex) => {
                            if (singleRoad.active) {
                                if (roadIndex === 0) return(
                                    <button className="btn W-100 Br-4" onClick={changeRoad}>
                                        <span>تکمیل اطلاعات</span>
                                        <i className="isax icon-arrow-left-2" />
                                    </button>
                                )
                                if (roadIndex === 1) return(
                                    <button disabled={btnDisable} className="btn W-100 Br-4" onClick={changeRoad}>
                                        <i className="isax icon-tick-circle" />
                                        <span>ثبت سفارش</span>
                                    </button>
                                )
                                if (roadIndex === 2) return(
                                    <button disabled={btnDisable2} className="btn W-100 Br-4" onClick={submitPayment}>
                                        <i className="isax icon-card" />
                                        <span>ثبت سفارش رایگان</span>
                                    </button>
                                )
                            }
                            return acc;
                        }, null)
                    :
                    <div className="btn W-100 Br-4" onClick={()=>setToggleSignIn(true)}>
                            <i className="isax icon-user" />
                            <span>ورود/ثبت‌نام</span>
                        </div>
                    }
                </div>
            </div>
            {toggleSignIn && <SignInPopup closePopup={()=>setToggleSignIn(false)}/>}
        </>
    )
}

export function EmptyBasketPopup({closePopup,emptyBasket}){
    return(
        <div className="popup">
            <div className="box empty-popup">
                <div className="box-header">
                    <div className="title">حذف محصولات</div>
                    <span className="close-icon" onClick={closePopup}></span>
                </div>
                <div className="box-content">
                    <div>همه محصولات سبد خرید شما حذف شود؟</div>
                    <div className="btn-box">
                        <button className="btn Br-4 g-b" onClick={closePopup}>بازگشت</button>
                        <button className="btn Br-4 delete" onClick={()=>{emptyBasket();closePopup()}}>حذف</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function EmptyBasket({shipping,fav}){
    return(
        <div className="empty-box">
            {fav
            ? 
                <div>شما در حال حاضر هیچ محصولی را به علاقه‌مندی‌ها اضافه نکرده‌اید!</div>
            :
                shipping 
                ? 
                    <div>شما در حال حاضر هیچ آدرسی ثبت نکرده‌اید!</div>
                    :
                    <div>شما در حال حاضر هیچ سفارشی ثبت نکرده‌اید!</div>
                
            }
            {!shipping &&
            <Link className="btn Bg-f B-r C-r" to='/menu'>
                <span>منوی رستوران</span>
            </Link>
            }
        </div>
    )
}

export function BasketFoodList({basket}){
    useEffect(()=>{
            localStorage.setItem('basket',JSON.stringify(basket));
        },[basket])
    return(
        <div className="product-list">
            {basket.map((food,foodIndex)=>{
                return <SingleFood key={foodIndex} food={food} basketPage={true}/>
            })}
        </div>
    )
}

export function ShpingWay({setShippingWay}){
    return(
        <div className="box shipping-way">
            <div className="title-box">
                <i className="isax icon-truck" />
                <span className="box-title">روش تحویل سفارش</span>
            </div>
            <div className="options">
                <label className="option">
                    <input onChange={(e)=>setShippingWay(e.target.value)} defaultChecked value='peykDelivery' name="shippingWay" type="radio" />
                    <div className="option-content">
                        <div className="col">
                            <div className="option-title">ارسال توسط پیک</div>
                            <span className="option-description">توسط پیک رستوران ارسال شود.</span>
                        </div>
                        <i className="isax icon-truck-fast"/>
                    </div>
                </label>
                <label className="option">
                    <input onChange={(e)=>setShippingWay(e.target.value)} name="shippingWay" value='inPersonDelivery' type="radio" />
                    <div className="option-content">
                        <div className="col">
                            <div className="option-title">تحویل حضوری</div>
                            <span className="option-description">حضورا از شعبه تحویل میگیرید.</span>
                        </div>
                        <i className="isax icon-shopping-bag"/>
                    </div>
                </label>
            </div>
        </div>
    )
}



export function SingleAddress({noInput,address,editHandle}){
    const {order,setOrder} = useContext(InfoContext)
    function addressChange(e){
        setOrder((prev)=>({
            ...prev,address:e.target.value
        }))
    }
    return(
        <label className="single-address">
            {!noInput &&
                <input checked={address.id == order.address} onChange={(e)=>addressChange(e)} name="selectedAddress" type="radio" value={address.id}/>
            }
            <div className="row W-100">
                <div className="address">
                    {address.address}
                </div>
                <div className="btn-holder">
                    <i onClick={()=>editHandle(address.id,'delete')} className="isax icon-trash" />
                    <i onClick={()=>editHandle(address.id,'edit')} className="isax icon-edit-2" />
                </div>
            </div>
            <div className="row W-100 extra-info">
                <span className="address-name">{address.title}</span>
                <span className="person-name">{address.name}</span>
                <span className="person-number">{address.phone_number}</span>
            </div>
        </label>
    )
}

export function AddressBox({togglePopup,editHandle}){
    const {addressList} = useContext(InfoContext)
    return(
        <div className="box">
            <div className="box-header">
                <div className="title-box">
                    <i className="isax icon-location" />
                    <span className="box-title">آدرس‌ها</span>
                </div>
                <button onClick={togglePopup} className="add-address title-box">
                    <i className="isax icon-add-circle" />
                    <span>افزودن آدرس</span>
                </button>
            </div>
            <div className="box-content">
                {addressList.length ? 
                    <div className="address-list">
                        {addressList.map((address,aIndex)=>{
                            return <SingleAddress editHandle={editHandle} key={aIndex} address={address}/>
                        })}
                    </div>
                :
                    <EmptyBasket shipping={true}/>
                }
            </div>
        </div>
    )
}

export function ShipingBox(){
    const [addAddress,setAddAddress] = useState(false)
    const [shippingWay,setShippingWay] = useState('peykDelivery')
    const [addressInput,setAddressInput] = useState({id:'',title:'',name:'',phone_number:'',address:''})
    const {addressList,setAddressList,order,setOrder} = useContext(InfoContext)

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
            if(order.address = id){
                setOrder((prev)=>({
                    ...prev,address:''
                }))
            }
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
        setOrder((prev)=>({
            ...prev,shippingWay:shippingWay
        }))
    },[shippingWay])
    useEffect(()=>{
        if(addAddress) return
        setAddressInput({id:'',title:'',name:'',phone_number:'',address:''})
    },[addAddress])
    return(
        <>
            <div className="shipping-part">
                <ShpingWay setShippingWay={setShippingWay}/>
                {shippingWay == 'peykDelivery' 
                ?
                    <AddressBox editHandle={editHandle} togglePopup={()=>setAddAddress(!addAddress)}/>
                :
                    <InPersonDelivery/>
                }
                <textarea className="input W-100 extra-input" name="" id="" placeholder="توضیحات سفارش (اختیاری)"></textarea>
                </div>
            {addAddress && <AddAddressPopup addressInput={addressInput} setAddressInput={setAddressInput} togglePopup={()=>setAddAddress(!addAddress)}/>}
        </>
    )
}


export function AddAddressPopup({togglePopup,addressInput,setAddressInput}){
    const [errorList,setErrorList] = useState([])
    const [check,setCheck] = useState(true)
    const {profile,addressList,setAddressList} = useContext(InfoContext)
    const faddAddress = async () => {
        const formData = new FormData();
        Object.entries(addressInput).map(([key,value])=>{
            formData.append(key, value);
        })
        try {
          const response = await axios.post("/api/addaddress/",formData,{
            headers:{
              'Authorization':('Bearer' + ' ' + getCookie('access'))
            },
          });
            if(addressInput.id.length == 0){
              setAddressList([...addressList,response.data.address])
            }
            else{
                setAddressList(addressList.map((address)=>{
                if(address.id != addressInput.id) return address
                return addressInput
                }))
            }
            setAddressInput({id:'',title:'',name:'',phone_number:'',address:''})
          togglePopup()
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      };
    function handleInputChange(e) {
        const { name, value } = e.target;
        setAddressInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    function handleAddAddress(){
        faddAddress()
    }
    function validate(){
        const newError = {}
        if(addressInput.phone_number.length == 11 && /^09\d{9}$/.test(addressInput.phone_number)){
        }
        else if(addressInput.phone_number.length == 10 && /^9\d{9}$/.test(addressInput.phone_number)){
        }
        else{
            newError.phone_number = 'error'
        }
        if(addressInput.name.length == 0){
            newError.name = 'error'
        }
        if(addressInput.address.length == 0){
            newError.address = 'error'
        }
        if(addressInput.title.length == 0){
            newError.title = 'error'
        }
        return(newError)
    }
    useEffect(()=>{
        setErrorList(validate())
    },[addressInput])
    useEffect(()=>{
        if(check){
            setAddressInput((prev) => ({
                ...prev,
                name: profile.first_name + ' ' + profile.last_name,
            }));
        }
        else{
            setAddressInput((prev) => ({
                ...prev,
                name: '',
            }));
        }
    },[check])
    return(
        <div className="popup">
            <div className="box add-address">
                <div className="box-header">
                    <div className="title">ثبت آدرس</div>
                    <span onClick={togglePopup} className="close-icon"></span>
                </div>
                <div className="box-content">
                    <input className="input" name="title" onChange={(e)=>handleInputChange(e)} value={addressInput.title} type="test" placeholder="عنوان آدرس" />
                    <label className="checkbox" onChange={(e)=> setCheck(e.target.checked)}>
                        <input defaultChecked type="checkbox" />
                        <span className="checkmark">
                        </span>
                        <span>تحویل گیرنده خودم هستم</span>
                    </label>
                    {check 
                    ?
                    <>
                        <input className="input" name="phone_number" onChange={(e)=>handleInputChange(e)} value={addressInput.phone_number} type="number" placeholder="شماره همراه"/>
                    </>
                    :
                        <>
                        <input className="input" name="name" onChange={(e)=>handleInputChange(e)} value={addressInput.name} type="text" placeholder="نام و نام‌خانوادگی تحویل گیرنده"/>
                        <input className="input" name="phone_number" onChange={(e)=>handleInputChange(e)} value={addressInput.phone_number} type="number" placeholder="شماره همراه تحویل گیرنده" />
                        </>
                    }
                    <textarea className="input" name="address" onChange={(e)=>handleInputChange(e)} value={addressInput.address} placeholder="آدرس دقیق شما" id=""></textarea>
                    <button disabled={Object.keys(errorList).length != 0} className="btn Br-4" onClick={handleAddAddress}>
                        <span>ثبت آدرس</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export function InPersonDelivery(){
    return(
        <div className="box branch-delivery">
            <div className="info-box">
                <div className="title-box">
                    <i className="isax icon-location" />
                    <span>آدرس شعبه اکباتان</span>
                </div>
                <div className="box-content">
                    <p className="branch-address">اکباتان، خیابان ریاحی، کوچه سیزدهم، ساختمان آیسا، طبقه همکف</p>
                    <div className="contact-info">
                        <span>شماره تماس ۱: ۱۲۵۴ ۵۴۸۹ -۰۲۱</span>
                        <span>شماره تماس ۲: ۱۲۵۵ ۵۴۸۹ -۰۲۱ </span>
                    </div>
                    <p className="extra-info">ساعت کاری: همه‌روزه از ساعت ۱۲ تا ۲۳ بجز روزهای تعطیل</p>
                </div>
                <a href="https://maps.app.goo.gl/Z8EQbdoGmRLGu6Th6" target="_blank" className="btn Bg-f B-r C-7 Br-4">
                    مشاهده در نقشه
                </a>
            </div>
            <div className="map-box">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1361.9441737593368!2d51.18324367494757!3d35.719641597215166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfa!2s!4v1735296145348!5m2!1sfa!2s"></iframe>
            </div>
        </div>
    )
}

export function PaymentBox(){
    const [paymentMethod,setPaymentMethod] = useState('onlinePayment')
    const {setOrder} = useContext(InfoContext)
    useEffect(()=>{
        setOrder((prev)=>({
            ...prev,paymentMethod:paymentMethod
        }))
    },[paymentMethod])
    return(
        <div className="shipping-part payment-part">
            <CouponBox/>
            <PaymentWay setPaymentMethod={setPaymentMethod}/>
            {paymentMethod == 'onlinePayment'
            ?
                <PeymentMethod/>
            :
                <InPersonPayment/>
            }
        </div>
    )
}

export function CouponBox(){
    const {order,setOrder} = useContext(InfoContext)
    const [btnDisable,setBtnDisable] = useState(true)
    const [inputStatus,setInputStatus] = useState('')
    const [coupon,setCoupon] = useState('')
    useEffect(()=>{
        coupon ? setBtnDisable(false) : setBtnDisable(true)
    },[coupon])
    const formData = new FormData();
    formData.append('code',coupon)
    const checkCoupon = async () => {
        try {
          const response = await axios.post("/api/checkcoupon/",formData);
          if(response.data == 'bad'){
            setInputStatus('wrong')
          }
          else if(response.data.code == coupon){
            setInputStatus('green')
            setBtnDisable(true)
            setOrder((prev)=>({
                ...prev,coupon:response.data.code,discount:response.data.discount
            }))
          }
        } catch (error) {
          console.error("Error fetching branches:", error);
        }
      }
    return(
        <div className="box coupon-box">
            <div className="title-box">
                <i className="isax icon-discount-shape" />
                <span className="title">ثبت کد تخفیف</span>
            </div>
            <div className="coupon-holder">
                <div className={"input " + inputStatus}>
                    <input disabled={inputStatus == 'green'} onChange={(e)=>setCoupon(e.target.value)} type="text" value={coupon} placeholder="کد تخفیف : test"/>
                    {order.discount && <span className="code">{order.discount}%</span>}
                </div>
                <button disabled={btnDisable} onClick={checkCoupon} className="btn Br-4">ثبت کد</button>
            </div>
        </div>
    )
}

export function PaymentWay({setPaymentMethod}){
    return(
        <div className="box shipping-way ">
            <div className="title-box">
                <i className="isax icon-wallet-money" />
                <span className="box-title">روش پرداخت</span>
            </div>
            <div className="options">
                <label className="option">
                    <input onChange={(e)=>setPaymentMethod(e.target.value)} defaultChecked value='onlinePayment' name="shippingWay" type="radio" />
                    <div className="option-content">
                        <div className="col">
                            <div className="option-title">پرداخت اینترنتی</div>
                            <span className="option-description">پرداخت از طریق درگاه اینترنتی</span>
                        </div>
                        <i className="isax icon-card-pos"/>
                    </div>
                </label>
                <label className="option">
                    <input onChange={(e)=>setPaymentMethod(e.target.value)} name="shippingWay" value='inPersonPayment' type="radio" />
                    <div className="option-content">
                        <div className="col">
                            <div className="option-title">پرداخت در محل</div>
                            <span className="option-description">پرداخت حضوری در محل شما</span>
                        </div>
                        <i className="isax icon-wallet-1"/>
                    </div>
                </label>
            </div>
        </div>
    )
}
export function PeymentMethod(){
    return(
        <div className="box payment-method">
            <div className="title-box">
                <i className="isax icon-card" />
                <span className="box-title">درگاه پرداخت</span>
            </div>
            <div className="method-holder">
                <div className="method-box">
                    <label className="method">
                        <input defaultChecked name="paymentMethod" type="radio" />
                        <img src="images/bank-1.png" alt="" />
                    </label>
                    <label className="method">
                        <input name="paymentMethod" type="radio" />
                        <img src="images/bank-2.png" alt="" />
                    </label>
                    <label className="method">
                        <input name="paymentMethod" type="radio" />
                        <img src="images/bank-3.png" alt="" />
                    </label>
                </div>
                <div className="info-box">
                    <p className="description">پرداخت از طریق کلیه کارت‌های عضو شتاب امکان‌پذیر است.‌</p>
                    <p className="m-description">(لطفا قبل از پرداخت فیلترشکن خود را خاموش کنید.)</p>
                </div>
            </div>
        </div>
    )
}
export function InPersonPayment(){
    return(
        <div className="box in-payment">
            <div className="title-box">
                <i className="isax icon-warning-2" />
                <span className="box-title">قابل توجه</span>
            </div>
            <p>هزینه سفارش شما در حین تحویل کالا دریافت خواهد شد. لطفا قبل از تحویل کالا کارت بانکی یا پول نقد همراه خود داشته باشید و از درخواست برای پرداخت در زمان بعدی یا نسیه خودداری فرمایید. با تشکر از همراهی شما.</p>
        </div>
    )
}