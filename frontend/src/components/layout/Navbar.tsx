"use client";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Industries", href: "/industries" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu
      ? "hidden"
      : "auto";
  }, [mobileMenu]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#071226]/95 backdrop-blur-2xl border-b border-[#D4AF37]/15 shadow-[0_15px_50px_rgba(0,0,0,0.45)]"
            : "bg-[#071226]/85 backdrop-blur-xl border-b border-white/10"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-[88px] items-center justify-between">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-4"
            >
              <Image
                src="/sme-logo.png"
                alt="SME Engineering Services"
                width={72}
                height={72}
                priority
                className="object-contain"
              />

              <div>
                <h2 className="text-[15px] font-extrabold uppercase tracking-[0.08em] text-white">
                  Shahid & Maqbool
                </h2>

                <p className="text-[10px] uppercase tracking-[0.35em] text-white/70">
                  Engineering Services
                </p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.href !== "/" &&
                    pathname.startsWith(link.href));

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group relative"
                  >
                    <span
                      className={`text-[15px] font-medium transition duration-300 ${
                        active
                          ? "text-white"
                          : "text-white/75 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </span>

                    <span
                      className={`absolute -bottom-[18px] left-0 rounded-full bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.6)] transition-all duration-300 ${
                        active
                          ? "h-[4px] w-full"
                          : "h-[4px] w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-5">

              <div className="flex items-center gap-2 text-white/80">
                <Phone size={16} />
                <span className="text-sm">
                  +92 300 1234567
                </span>
              </div>

              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-7 py-3 text-sm font-semibold text-[#071226] shadow-[0_10px_30px_rgba(212,175,55,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#E5C76F]"
              >
                Get Free Consultation

                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              className="text-white lg:hidden"
            >
              {mobileMenu ? (
                <X size={30} />
              ) : (
                <Menu size={30} />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenu(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 220,
              }}
              className="fixed right-0 top-0 z-50 h-full w-[320px] bg-[#071226] border-l border-[#D4AF37]/20 p-8"
            >
              <div className="mb-12 flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">
                  Menu
                </h3>

                <button
                  onClick={() =>
                    setMobileMenu(false)
                  }
                >
                  <X
                    size={28}
                    className="text-white"
                  />
                </button>
              </div>

              <div className="flex flex-col gap-7">
                {navLinks.map((link) => {
                  const active =
                    pathname === link.href ||
                    (link.href !== "/" &&
                      pathname.startsWith(
                        link.href
                      ));

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() =>
                        setMobileMenu(false)
                      }
                      className={`text-xl font-semibold ${
                        active
                          ? "text-[#D4AF37]"
                          : "text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-12 border-t border-white/10 pt-8">
                <p className="mb-4 text-white/60">
                  Call Us
                </p>

                <p className="text-white">
                  +92 300 1234567
                </p>

                <Link
                  href="/contact"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="mt-8 inline-flex w-full justify-center rounded-full bg-[#D4AF37] px-6 py-4 font-semibold text-[#071226]"
                >
                  Get Consultation
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}