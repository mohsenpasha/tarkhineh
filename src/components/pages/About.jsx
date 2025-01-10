import AboutBenefit from "../AboutBenefit"
import Footer from "../Footer"
import Header from "../Header"
import HeadBanner from "../HeadImgTitle"

export default function About(){
    return(
        <>
            <Header/>
            <HeadBanner img='images/about-us-img.png' title='درباره ترخینه بیشتر بدانید!'/>
            <AboutBox/>
            <Footer/>
        </>
    )
}

export function AboutBox(){
    return(
        <>
            <div className="container">
                <section className="about-box Mtb-48">
                    <div className="section-title Ta-r">درباره‌ما</div>
                    <div className="content-box">
                        <div className="img-holder">
                            <img src="images/about-img.png" alt="" />
                        </div>
                        <p>رستوران‌های زنجیره‌ای ترخینه در سال ۱۳۶۸ افتتاح گردیده‌اند و در طی این سال‌ها همواره با ارائه غذاهای باکیفیت و سرویس سریع و به موقع در تلاش برای جلب رضایت مشتریان خود بوده‌اند. در طی این سال‌ها اولیت جلب رضایت مشتریان بوده است. دراین خصوص ترخینه همیشه در تلاش بوده تا در طی این زمان‌ها کیفیت غذاهای خودرا در بهترین حالت نگه داشته و حتی با نوسانات قیمت‌های مواد اولیه در بازار قیمت خود را ثابت نگه داشته است. ترخینه شعبات خود را افتتاح کرده که بسیار شیک و مدرن می‌باشند و برای برگزاری جشن‌های کوچک و بزرگ شما مشتریان عزیز توانایی پذیرایی با کیفیت بالا را دارند. سالن پذیرایی شعبات در دو طبقه مجزا به همراه راه پله مدرن و آسانسور برای افراد کم‌توان و سالخورده آماده ارائه سرویس به شما عزیزان می‌باشند.
                        چشم انداز: در آینده‌ای نزدیک تالار پذیرایی شعبات راه اندازی شده و آماده برگزاری جشن‌ها و مراسم‌های بزرگ شما خواهند بود . به امید آن روز که همه ایرانیان سالم و سلامت باشند.</p>
                    </div>
                </section>
            </div>
            <div className="about-benefit">
                <div className="container">
                    <AboutBenefit/>
                </div>
            </div>
        </>
    )
}