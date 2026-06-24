
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  Activity,
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] =
    useState(false);
  const [isScrolled, setIsScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      mobileMenu ? "hidden" : "auto";
  }, [mobileMenu]);

  return (
    <>
      <motion.header
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="fixed top-4 left-0 right-0 z-50 px-4"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            whileHover={{
              y: -2,
            }}
            className={`
              flex h-[74px] items-center justify-between
              rounded-[26px]
              px-6 lg:px-8
              border border-black/5
              backdrop-blur-xl
              transition-all duration-300
              ${
                isScrolled
                  ? "bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                  : "bg-white/95 shadow-[0_10px_40px_rgba(0,0,0,0.08)]"
              }
            `}
          >
            {/* Logo */}
            <motion.div
              whileHover={{
                scale: 1.03,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 12,
              }}
            >
              <Link
                href="/"
                className="flex items-center gap-3"
              >
                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    border border-gray-200
                    bg-white
                    shadow-sm
                  "
                >
                  <Activity
                    size={18}
                    className="text-black"
                  />
                </div>

                <h2
                  className="
                    text-lg
                    font-semibold
                    text-black
                  "
                >
                  Yoflix
                </h2>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map(
                (link, idx) => {
                  const active =
                    pathname ===
                      link.href ||
                    (link.href !== "/" &&
                      pathname.startsWith(
                        link.href
                      ));

                  return (
                    <motion.div
                      key={link.name}
                      initial={{
                        opacity: 0,
                        y: -20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        delay:
                          idx * 0.08,
                      }}
                    >
                      <Link
                        href={link.href}
                        className="group relative"
                      >
                        <motion.span
                          whileHover={{
                            y: -2,
                          }}
                          className={`
                            text-sm
                            font-medium
                            transition-colors
                            duration-300
                            ${
                              active
                                ? "text-black"
                                : "text-gray-500 group-hover:text-black"
                            }
                          `}
                        >
                          {link.name}
                        </motion.span>

                        <motion.div
                          className="
                            absolute
                            -bottom-2
                            left-0
                            h-[2px]
                            bg-black
                            rounded-full
                          "
                          initial={{
                            width:
                              active
                                ? "100%"
                                : "0%",
                          }}
                          whileHover={{
                            width:
                              "100%",
                          }}
                          transition={{
                            duration:
                              0.3,
                          }}
                        />
                      </Link>
                    </motion.div>
                  );
                }
              )}
            </nav>

            {/* Right Side */}
            <motion.div
              className="hidden lg:flex items-center gap-6"
              initial={{
                opacity: 0,
                x: 20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.2,
              }}
            >
              <Link
                href="/signin"
                className="
                  text-sm
                  font-medium
                  text-gray-500
                  hover:text-black
                  transition-colors
                "
              >
                Sign in
              </Link>

              <motion.div
                whileHover={{
                  scale: 1.05,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10,
                }}
              >
                <Link
                  href="/contact"
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-black
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    hover:shadow-2xl
                    transition-all
                    duration-300
                  "
                >
                  <span>
                    Get Started
                  </span>

                  <motion.div
                    whileHover={{
                      rotate: 45,
                      x: 2,
                      y: -2,
                    }}
                  >
                    <ArrowUpRight
                      size={16}
                      className="text-white"
                    />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>

            {/* Mobile Toggle */}
            <motion.button
              onClick={() =>
                setMobileMenu(
                  !mobileMenu
                )
              }
              className="
                lg:hidden
                p-2
                text-black
              "
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              {mobileMenu ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </motion.button>
          </motion.div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() =>
                setMobileMenu(false)
              }
              className="
                fixed inset-0 z-40
                bg-black/40
                backdrop-blur-sm
              "
            />

            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 220,
              }}
              className="
                fixed
                right-0
                top-0
                z-50
                h-full
                w-[300px]
                bg-white
                border-l
                border-black/10
                p-8
                overflow-y-auto
              "
            >
              <div className="mb-12 flex items-center justify-between">
                <h3
                  className="
                    text-lg
                    font-semibold
                    text-black
                  "
                >
                  Menu
                </h3>

                <motion.button
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                  whileHover={{
                    rotate: 90,
                  }}
                  className="
                    text-black
                  "
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="flex flex-col gap-5">
                {navLinks.map(
                  (
                    link,
                    idx
                  ) => {
                    const active =
                      pathname ===
                        link.href ||
                      (link.href !==
                        "/" &&
                        pathname.startsWith(
                          link.href
                        ));

                    return (
                      <motion.div
                        key={
                          link.name
                        }
                        initial={{
                          opacity: 0,
                          x: 20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            idx *
                            0.05,
                        }}
                        whileHover={{
                          x: 8,
                        }}
                      >
                        <Link
                          href={
                            link.href
                          }
                          onClick={() =>
                            setMobileMenu(
                              false
                            )
                          }
                          className={`
                            block
                            text-lg
                            font-medium
                            transition-colors
                            ${
                              active
                                ? "text-black"
                                : "text-gray-500 hover:text-black"
                            }
                          `}
                        >
                          {
                            link.name
                          }
                        </Link>
                      </motion.div>
                    );
                  }
                )}
              </div>

              <motion.div
                className="
                  mt-12
                  border-t
                  border-black/10
                  pt-8
                "
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <Link
                  href="/contact"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
                  className="
                    block
                    w-full
                    rounded-xl
                    bg-black
                    px-6
                    py-4
                    text-center
                    font-semibold
                    text-white
                  "
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

