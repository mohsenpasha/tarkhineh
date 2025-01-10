import { useContext, useState } from "react";
import BranchSection from "../BranchSection";
import Footer from "../Footer";
import Header from "../Header";
import HeadBanner from "../HeadImgTitle";
import { InfoContext } from "../context/InfoContext";

export default function ContactUs(){
    const {branches} = useContext(InfoContext)
    return(
        <>
            <Header />
            <div className="contact-us-page">
                <HeadBanner img='images/contact-us-img.png' title='با ترخینه در تماس باشید.'/>
                <BranchSection ContactUs={true} branches={branches}/>
            </div>
            <Footer />
        </>
    )
}