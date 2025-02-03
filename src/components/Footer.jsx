import React from 'react';
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2'>
            <p>© All Rights Reserved 2025</p>

            <div className='flex items-center gap-4 justify-center text-3xl'>
                <a href="" className="hover:text-blue-500 transition-colors duration-200 animate-bounce">
                    <FaFacebook />
                </a>

                <a href="" className="hover:text-pink-700 transition-colors duration-200 animate-bounce">
                    <FaInstagram />
                </a>

                <a href="" className="hover:text-blue-500 transition-colors duration-200 animate-bounce">
                    <CiLinkedin />
                </a>

                <a href="" className="hover:text-blue-400 transition-colors duration-200 animate-bounce">
                    <FaTwitter />
                </a>
            </div>
        </div>
    </footer>
  );
}

export default Footer;
