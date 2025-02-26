function Footer() {
    return (
      <footer className="flex flex-col md:flex-row items-center md:justify-between gap-6 py-6 px-4 md:px-10 bg-gray-100 text-gray-700">
        <div className="flex items-center space-x-2">
          <img
            src="https://res.cloudinary.com/decczwgne/image/upload/v1738511047/logo-green_vopz3s.png"
            alt="footer logo"
            className="h-6 md:h-8"
          />
          <span className="text-green-500 font-semibold">NATOURS</span>
        </div>
  
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="#" className="hover:underline">
            About us
          </a>
          <a href="#" className="hover:underline">
            Download apps
          </a>
          <a href="#" className="hover:underline">
            Become a guide
          </a>
          <a href="#" className="hover:underline">
            Careers
          </a>
          <a href="#" className="hover:underline">
            Contact
          </a>
        </nav>
  
        <p className="text-sm text-center md:text-right">&copy; 2024 by Mridul Mishra.</p>
      </footer>
    )
  }
  
  export default Footer
  
  