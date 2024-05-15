// @ts-nocheck
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../store/index.ts';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, MenuItem, MenuItems, MenuButton, Transition } from '@headlessui/react'
import { Fragment } from 'react';
import { setIsOpen } from '../store/index.ts';
import logo from "../media/logo.svg"
import {ArrowRightOnRectangleIcon , PhotoIcon , InformationCircleIcon , DocumentArrowUpIcon , CpuChipIcon} from "@heroicons/react/24/outline"



const Header = () => {

    type Props = {
        open : boolean,
        close : Function
        className : string
    } 
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAuth = useSelector((state : any) => state.prodAuth.isAuth)
    const isOpen = useSelector((state : any) => state.prodAuth.isOpen)
    // const [isOpen , setIsOpen] = useState(false)
    const userId = useSelector((state : any) => state.prodAuth.user.id);
    // md:w-fit md:scale-100 w-0 scale-0
    return (
            <header class="text-black body-font border-solid border-b-2">
            <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
            <a className="mr-5 hover:text-black cursor-pointer" onClick={()=>navigate("/assessment")}>Assessment </a>
            <a className="mr-5 hover:text-black cursor-pointer" onClick={()=>navigate("/about")}>About us</a>
            </nav>
            <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-black lg:items-center lg:justify-center mb-4 md:mb-0 cursor-pointer" href='/'>
            <img src={logo} alt="" />
            <span class="ml-3 text-xl">IELA</span>
            </a>
            {isAuth ?         
            <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
            <Menu as="div" className="ml-[35%] mb-3 sm:ml-0 sm:mb-0 relative">
            <div className='flex gap-2'>
            <div className="w-[35px] h-[35px] rounded-full object-cover bg-primary flex justify-center items-center text-black text-5xl font-bold" onClick={()=>navigate(`/account/${userId}`)}>
            <svg width="15" height="19" viewBox="0 0 50 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.0625 0.671878C16.1406 1.40625 10.1719 6.4375 8.20312 13.2188C6.29688 19.8281 8.65625 27.375 13.9375 31.5156C14.5938 32.0313 15.1406 32.5 15.1406 32.5469C15.1562 32.5938 14.7812 32.7969 14.3438 33C12.8906 33.6563 10.75 35.0313 9.25 36.25C5.17188 39.5469 2.15625 44.2031 0.84375 49.2344C0.453125 50.7344 0 53.7813 0 54.8906V55.5H2.46875H4.9375L5.14062 53.6719C5.625 48.9375 7.375 45.0781 10.5469 41.7656C16.2031 35.8438 24.5938 33.9688 32.2969 36.9063C37.8125 39.0156 42.2031 43.7031 44.0469 49.4688C44.5469 51 44.9844 53.5625 45 54.8281V55.5H47.5H50V54.6719C50 53.4531 49.5781 50.7813 49.1406 49.125C47.3125 42.2656 42.2812 36.125 36.0625 33.1875C35.3906 32.8594 34.8594 32.5781 34.8594 32.5313C34.8594 32.4844 35.2812 32.1406 35.8125 31.75C37.7969 30.2813 40.0156 27.3906 41.0625 24.9531C45.6562 14.1406 38.5469 1.9375 26.9062 0.671878C25.1406 0.484378 24.8594 0.484378 23.0625 0.671878ZM26.8438 5.65625C33.3594 6.71875 37.8594 12.2813 37.4531 18.7813C37.1094 24.1875 33.5781 28.5469 28.3281 30.0625C26.7188 30.5313 23.4375 30.5625 21.875 30.1406C14.8125 28.1875 10.9062 20.9375 13.2031 13.9844C15.0625 8.35938 21.0312 4.71875 26.8438 5.65625Z" fill="#111827"/>
            </svg>
            </div>
            <MenuButton>
            <div className='pt-1.5'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 8.25L12 15.75L4.5 8.25" stroke="#F9A826" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </div>
            </MenuButton>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
            <MenuItems as="div" className="absolute right-0 bg-secondary rounded mt-2 sm:mt-4 px-1 pb-2">
            <div className='mt-2 flex-col flex sm:gap-2 gap-2'>
            <MenuItem className="hover:bg-secondary-dark">
                        {({ active }) => (
                    <div className='flex items-center w-full rounded'>
                    <ArrowRightOnRectangleIcon className='h-[1.3rem] mt-1 ml-2 text-primary'/>
                    <button 
                    onClick={()=>{  
                        if(isAuth){ 
                            dispatch(logout())
                            navigate("/")
                        }
                    }}
                    className="w-[6rem] inline-flex items-center border-0 py-1 px-2 focus:outline-none text-base md:mt-0 text-black-400">
                        Log out 
                    </button> 
                    </div>
                        )}
            </MenuItem>
            <MenuItem key={2} as={Fragment} className="hover:bg-secondary-dark flex sm:hidden">
                        {({ active }) => (
                    <div className='flex items-center w-full rounded'>
                    <PhotoIcon className='h-[1.3rem] mt-1 ml-2 text-primary'/>
                    <button 
                    onClick={()=>{  
                            navigate("/assessment ")
                    }}
                    className="w-[6rem] inline-flex items-center border-0 py-1 px-2 focus:outline-none text-base md:mt-0 text-black-400">
                        Assessment 
                    </button> 
                    </div>
                        )}
            </MenuItem>
            <MenuItem key={3} as={Fragment} className="hover:bg-secondary-dark flex sm:hidden">
                        {({ active }) => (
                    <div className='flex items-center w-full rounded'>
                    <InformationCircleIcon className='h-[1.4rem] mt-1 ml-2 text-primary'/>
                    <button 
                    onClick={()=>{  
                            navigate("/about")
                    }}
                    className="w-[6rem] inline-flex items-center border-0 py-1 px-2 focus:outline-none text-base md:mt-0 text-black-400">
                        About Us
                    </button> 
                    </div>
                        )}
            </MenuItem>
            </div>
            </MenuItems>
            </Transition>
            </Menu>
            </div>

            :
                <div class="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                <button class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0" onClick={()=>navigate("/signup")}>Sign Up
                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                </button>
                </div>}
        </div>
        </header>
    );
};

export default Header;