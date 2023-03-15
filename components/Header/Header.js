import React from 'react';
import logoUrl from '../../public/assets/logo.png';
import Image from "next/image";
const Header = () => (
    <header className='mt-2'>
        <nav
            className="navbar navbar-expand-lg shadow-md py-2 bg-gray-50 relative flex items-center w-full justify-between">
            <div className="px-6 w-full flex flex-wrap items-center justify-between">

                <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
                    <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                        <li className={'mx-auto'}>
                            <Image src={logoUrl} alt={'KotowscyDent logo - Orlik JW'}/>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    </header>
)
export default Header;