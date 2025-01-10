import { useContext } from "react";
import { Link } from "react-router-dom";
import { InfoContext } from "./context/InfoContext";

export default function Footer(){
    const {branches} = useContext(InfoContext)
    return(
        <footer className="footer">
            <div className="container">
                <div className="inner-footer">

                    <div className="footer-links">

                        <div className="footer-box">
                            <div className="box-title">دسترسی آسان</div>
                            <div className="box-content">
                                <ul>
                                    <li>
                                        <Link to='/questions'>
                                            پرسش‌های متداول
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/rules'>
                                            قوانین ترخینه
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/privacy'>
                                            حریم خصوصی
                                        </Link>
                                    </li>
                                    <li className="social-list">
                                        <a href="#">
                                            <i className="isax icon-instagram" />
                                        </a>
                                        <a href="#">
                                            {/* <img src="images/telegram.png"/> */}
                                        </a>
                                        <a href="#">
                                            <img src="../images/twitter.svg"/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-box">
                            <div className="box-title">شعبه‌های ترخینه</div>
                            <div className="box-content">
                                <ul>
                                    {branches.map((branch,branchIndex)=>{
                                        return(
                                            <li key={branchIndex}>
                                                <Link to={'/branch/' + branch.slug}>
                                                    {branch.name}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer-contact">
                        <div className="footer-box">
                            <div className="box-title">دسترسی آسان</div>
                            <div className="box-content">
                                <div className="right">
                                    <input className="input B-7" placeholder="نام و نام خانوادگی" type="text" />
                                    <input className="input B-7" placeholder="شماره تماس" type="text" />
                                    <input className="input B-7" placeholder="آدرس ایمیل (اختیاری)" type="text" />
                                </div>
                                <div className="left">
                                    <textarea placeholder="پیام شما" name="" className="input B-7"></textarea>
                                </div>
                            </div>
                            <div className="btn backless-bordered B-7">
                                <span>ارسال پیام</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    )
}