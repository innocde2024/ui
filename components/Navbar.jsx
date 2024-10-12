"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { navVariants } from "../utils/motion";
import { useAuth } from "../context/authContext";
import useUserInfo from "../hook/auth/useUserInfo";

const Navbar = () => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false); // State for tracking hover status
  const [menuOpen, setMenuOpen] = useState(false); // State for menu visibility
  const { isLogin, logout } = useAuth();
  const { data } = useUserInfo();
  const user = data?.data;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/Signin");
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.nav
      variants={navVariants}
      whileInView="show"
      className={`fixed top-0 left-0 right-0 z-20 py-4 ${
        scrolled ? "bg-white" : "bg-transparent"
      } transition-colors duration-300`}
    >
      <div
        className={` mx-auto flex justify-around items-center gap-8 px-[10vw]`}
      >
        <Link
          href="/"
          className={`font-extrabold text-[12px] md:text-[24px] leading-[30.24px] ${
            scrolled ? "text-orange-500" : "text-white"
          } transition-colors duration-300`}
        >
          FPT EDUCATION
        </Link>
        <div className="lg:hidden">
          <IconButton
            onClick={toggleMenu}
            className={`${
              scrolled ? "text-orange-500" : "text-white"
            } transition-colors duration-300`}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <div
          className={`hidden lg:flex gap-[20vh] font-semibold ${
            scrolled ? "text-orange-500" : "text-white"
          } transition-colors duration-300`}
        >
          <ul className="flex gap-[60px] items-center">
            <li>
              <Link href="/environment">Môi Trường Xanh</Link>
            </li>
            <li>
              <Link href="/ShoppingPage">Lưu Niệm</Link>
            </li>
            <li>
              <Link href="/ForumPage">FQA</Link>
            </li>
          </ul>
          <div className="flex gap-5">
            {!isLogin ? (
              <>
                <Button
                  className={`font-semibold ${
                    scrolled ? "text-orange-500" : "text-white"
                  } transition-colors duration-300`}
                  variant="text"
                >
                  <Link href="/Signin">Đăng Nhập</Link>
                </Button>
                <Button
                  className={`font-semibold ${
                    scrolled ? "text-orange-500" : "text-white"
                  } transition-colors duration-300`}
                  variant="text"
                >
                  <Link href="signup">Đăng Ký</Link>
                </Button>
              </>
            ) : (
              <div
                className="flex items-center gap-10 relative py-2 "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <p>Xin chào, {user?.fullName}</p>
                {hovered && (
                  <ul className="absolute top-[30px] bg-white shadow-md rounded-lg p-3">
                    <li className="w-[100%]">
                      <Link href="/userInfo">
                        <Button
                          className={`font-semibold ${
                            scrolled ? "text-orange-500" : "text-black"
                          } transition-colors duration-300 w-[100%]`}
                          variant="text"
                        >
                          Trang Cá Nhân
                        </Button>
                      </Link>
                    </li>
                    <li className="w-[100%]">
                      <Button
                        className={`font-semibold ${
                          scrolled ? "text-orange-500" : "text-black"
                        } transition-colors duration-300 w-[100%]`}
                        variant="text"
                        onClick={handleLogout}
                      >
                        Đăng Xuất
                      </Button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-0 left-0 right-0 bg-white z-30 flex flex-col items-center py-4">
          <div className="w-full flex justify-end pr-4">
            <IconButton onClick={toggleMenu}>
              <CloseIcon />
            </IconButton>
          </div>
          <ul className="flex flex-col gap-4 font-semibold text-orange-500">
            <li>
              <Link href="/" className="text-orange-500">
                Môi Trường Xanh
              </Link>
            </li>
            <li>
              <Link href="/ShoppingPage" className="text-orange-500">
                Lưu Niệm
              </Link>
            </li>
            <li>
              <Link href="/ForumPage" className="text-orange-500">
                FQA
              </Link>
            </li>
            {!isLogin ? (
              <>
                <li>
                  <Link href="/Signin">
                    <Button
                      className="font-semibold text-orange-500"
                      variant="text"
                    >
                      Đăng Nhập
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="./signup">
                    <Button
                      className="font-semibold text-orange-500"
                      variant="text"
                    >
                      Đăng Ký
                    </Button>
                  </Link>
                </li>
              </>
            ) : (
              <div className="flex flex-col gap-4">
                <li>
                  <Link href="/userInfo">
                    <Button
                      className="font-semibold text-orange-500"
                      variant="text"
                    >
                      Trang Cá Nhân
                    </Button>
                  </Link>
                </li>
                <li>
                  <Button
                    className="font-semibold text-orange-500"
                    variant="text"
                    onClick={handleLogout}
                  >
                    Đăng Xuất
                  </Button>
                </li>
              </div>
            )}
          </ul>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
