"use client";

import "../app/globals.css";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { CgProfile } from "react-icons/cg";
import { useSession, signIn, signOut } from "next-auth/react";
import { TfiTicket } from "react-icons/tfi";

const Header = () => {
  const [session, setSession] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setSession(true);
    } else {
      setSession(false);
    }
  }, [status]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); 
  };

  const menuItems = [
    { href: "/", icon: <HomeIcon />, label: "Home" },
    { href: "/events", icon: <CgProfile />, label: "Events" },
    { href: "/artists", icon: <PersonIcon />, label: "Artists" },
    { href: "/tags", icon: <TfiTicket />, label: "Tags" },
  ];

  return (
    <nav className="drop-shadow-2xl flex items-center justify-between p-3 border-b border-slate-200 border-spacing-0 bg-slate-100 h-24 z-10 relative">
      <div className="hover-inverse flex items-center justify-center gap-2">
        <Link
          href={"/"}
          className="text-3xl font-bold max-sm:text-2xl bg-gradient-to-r from-orange-400 to-teal-600 bg-clip-text text-transparent"
        >
          <Image
            src={"/images/logo.png"}
            alt="logo"
            height={90}
            width={90}
            layout="responsive"
            className="hover-inverse w-full h-auto max-w-[120px] max-h-[120px] py-4"
          />
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden md:flex justify-center items-center gap-5 font-semibold">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
          >
            <div className="scale-110">{item.icon}</div>
            <p>{item.label}</p>
          </Link>
        ))}

        {session ? (
          <button
            onClick={() => {
              signOut();
            }}
            className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
          >
            Logout
          </button>
        ) : null}
        {!session ? (
          <button
            onClick={() => {
              signIn("google");
            }}
            className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
          >
            Log in
          </button>
        ) : null}
        {session ? (
          <button className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70">
            <Link href={"/create-event"}>Create Event</Link>
          </button>
        ) : null}
      </div>

      {/* Mobile menu toggle button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center justify-center gap-2"
      >
        {/* Hamburger Icon */}
        <div className="w-6 h-6 flex flex-col justify-between items-center">
          <div className="bg-black h-1 w-6"></div>
          <div className="bg-black h-1 w-6"></div>
          <div className="bg-black h-1 w-6"></div>
        </div>
      </button>

      {/* Mobile menu items */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } fixed top-24 left-0 w-full bg-white p-5 md:hidden z-40 h-screen overflow-y-auto`}
      >
        {/* Mobile menu items */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } fixed top-24 left-0 w-full bg-white p-5 md:hidden z-40 h-screen overflow-y-auto`}
        >
          {/* Mobile menu items */}
          <div className="flex flex-col items-center gap-4">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="flex items-center justify-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all mb-3"
                onClick={toggleMenu}
              >
                <div className="scale-110">{item.icon}</div>
                <p>{item.label}</p>
              </Link>
            ))}

            {session ? (
              <button
                onClick={() => {
                  signOut();
                }}
                className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70 w-full max-w-[200px]"
              >
                Logout
              </button>
            ) : null}
            {!session ? (
              <button
                onClick={() => {
                  signIn("google");
                }}
                className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70 w-full max-w-[200px]"
              >
                Log in
              </button>
            ) : null}
            {session ? (
              <button className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70 w-full max-w-[200px]">
                <Link href={"/create-event"}>Create Event</Link>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
