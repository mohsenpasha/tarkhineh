import { Link } from "react-router-dom";
import AboutBenefit from "./AboutBenefit";

export default function AboutSecton(){
    return(
        <section className="about-section">
            <div className="container">
                <div className="inner-about">
                    <div className="info-box">
                        <div className="section-title">رستوران‌های زنجیره‌ای ترخینه</div>
                        <p>مهمان‌نوازی یکی از مهم‌ترین مشخصه‌های ایرانیان است و باعث افتخار ماست که بیش از 20 سال است خدمت‌گزار مردم شریف ایران هستیم. ما در رستوران‌های زنجیره‌ای ترخینه همواره تلاش کردیم که در محیطی اصیل بر پایه معماری و طراحی مدرن در کنار طبیعتی دلنواز، غذایی سالم و درخور شان شما عزیزان ارائه دهیم.</p>
                        <Link className="btn backless-bordered" to='about-us'>
                            <span>اطلاعات بیشتر</span>
                            <i className="isax icon-arrow-left-2"/>
                        </Link>                        
                    </div>
                    <AboutBenefit/>
                </div>
            </div>
        </section>
    )
}