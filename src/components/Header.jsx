import { use, useContext, useState } from 'react'
import {NavLink,Link} from 'react-router-dom'
import { InfoContext } from './context/InfoContext'
import SignInPopup from './SignInPopup'
import LogoutPopup from './LogoutPopup'
import BranchPopup from './BranchPopup'
export default function Header({openSearch}){
    const [menu,setMenu] = useState(false)
    const [logoutPopup,setLogoutPopup] = useState(false)
    const toggleMenu = () => setMenu(!menu)
    const closeMenu = () => setMenu(false)
    const [toggleSignIn,setToggleSignIn] = useState(false)
    const [dropdownToggle,setDropdownToggle] = useState(false)
    const [branchPopup,setBranchPopup] = useState(false)
    const {branches,selectedBranch,basket,profile} = useContext(InfoContext)
    return(
        <>
            <header>
                <div className="container">
                    <div className="inner-header">
                        <div className="mobile-menu" onClick={toggleMenu}>
                            <i className='isax icon-menu-1' />
                        </div>
                        <Link className='logo' to="/">
                            <img src='../../images/logo.svg' alt="logo" />
                        </Link>
                        <ul className={menu ? 'active' : ''}>
                            <div className='ul-inner'>
                                <div className="menu-header">
                                    <div className="background"></div>
                                    <img src='../../images/Logo-white.svg' alt="" />
                                    <span className='close-icon' onClick={toggleMenu}></span>
                                </div>
                                <li>
                                    <NavLink className={({isActive}) => (isActive ? "active" : '')} to='/' onClick={closeMenu}>
                                    <i className='res-icon isax icon-home' />
                                        <span>صفحه اصلی </span>
                                    </NavLink>
                                </li>
                                <li onClick={()=> setDropdownToggle(!dropdownToggle)}>
                                    <div>

                                    <i className='res-icon isax icon-home-hashtag' />
                                    {selectedBranch 
                                    ?
                                    <span>{selectedBranch.name}</span>
                                    :
                                    <span>شعبه</span>
                                }
                                </div>
                                        <i className="isax icon-arrow-down-1" />
                                    {/* </NavLink> */}
                                    <div className={dropdownToggle ? "dropdown active" : "dropdown"}>
                                            {branches.map((branch,branchIndex)=>{
                                                // if(branch.id == selectedBranch?.id) return
                                                return(
                                                    <NavLink key={branchIndex} className={({isActive}) => (isActive ? "active" : '')} to={'/branch/' + branch.slug} onClick={closeMenu}>
                                                        <span>{branch.name}</span>
                                                    </NavLink>
                                                )
                                            })}
                                    </div>
                                </li>
                                <li>
                                    {selectedBranch ? 
                                    <NavLink className={({isActive}) => (isActive ? "active" : '')} to='/menu' onClick={closeMenu}>
                                        <i className='res-icon isax icon-menu-board' />
                                        <span>منو</span>
                                    </NavLink>
                                    :
                                    <div onClick={()=>setBranchPopup(true)}>
                                        <i className='res-icon isax icon-menu-board' />
                                        <span>منو</span>
                                    </div>
                                    }
                                </li>
                                <li>
                                    <NavLink className={({isActive}) => (isActive ? "active" : '')} to='/about-us' onClick={closeMenu}>
                                        <i className='res-icon isax icon-profile-2user' />
                                        <span>درباره ما</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className={({isActive}) => (isActive ? "active" : '')} to='/contact-us' onClick={closeMenu}>
                                        <i className='res-icon isax icon-call-calling' />
                                        <span>تماس با ما</span>
                                    </NavLink>
                                </li>
                            </div>
                        </ul>
                        <div className="button-list">
                            <NavLink className={({isActive}) => (isActive ? "active btn-s" : "btn-s")} to='/basket'>
                                <i className='isax icon-shopping-cart' />

                                {basket.length != 0 && <span className="count">{basket.length}</span>}
                            </NavLink>
                            {/* <div className="btn-s" onClick={openSearch}>
                                <i className='isax icon-search-normal-1' />
                            </div> */}
                            {profile
                            ? 
                                <NavLink to='/profile/' className='btn-s'>
                                    <i className='isax icon-user' />
                                    <i className='isax icon-arrow-down-1' />
                                    <div className="dropdown">
                                        <div className="dropdown-content">
                                            <NavLink className='item' to='/profile/'>
                                                <i className='isax icon-user' />
                                                <span>پروفایل</span>
                                            </NavLink>
                                            <NavLink className='item' to='/profile/order/'>
                                                <i className='isax icon-user' />
                                                <span>پیگیری سفارش</span>
                                            </NavLink>
                                            <NavLink className='item' to='/profile/fav/'>
                                                <i className='isax icon-user' />
                                                <span>علاقه‌مندی‌ها</span>
                                            </NavLink>
                                            <NavLink className='item' to='/profile/address/'>
                                                <i className='isax icon-user' />
                                                <span>آدرس‌های من</span>
                                            </NavLink>
                                            <div className='item' onClick={()=>setLogoutPopup(true)}>
                                                <i className='isax icon-logout' />
                                                <span>خروج از حساب</span>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            :
                                <div onClick={()=>setToggleSignIn(true)} className='btn-s'>
                                    <i className='isax icon-user' />
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </header>
            {toggleSignIn && <SignInPopup closePopup={()=>setToggleSignIn(false)}/>}
            {logoutPopup && <LogoutPopup closePopup={()=>setLogoutPopup(false)}/>}
            {branchPopup && <BranchPopup closePopup={()=>setBranchPopup(false)} />}
        </>
    )
}