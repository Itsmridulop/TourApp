// import { Link } from "react-router-dom";
// import { auth } from "../api/authApi";
// import { useLogout } from "../features/authentication/useLogout";
// import { useQueryClient } from "@tanstack/react-query";
// import { ResponseType } from "@/types/userType";

// import AllUserLinkWapper from "./AllUserLinkWapper";
// import UserPhoto from "./UserPhoto";

// function Navbar() {
//   const { logout } = useLogout();

//   const queryClient = useQueryClient();
//   const user: ResponseType | undefined = queryClient.getQueryData(['user'])
//   const isAuth = auth.isAuthenticated();

//   return (
//     <nav className="flex justify-between shadow-md w-[98vw] items-center bg-zinc-700 m-6 px-8 py-4 text-white">
//       <div className="flex-1 space-x-6">
//         {isAuth && (
//           <>
//             <Link to="/">ALL TOURS</Link>
//             <AllUserLinkWapper />
//           </>
//         )}
//       </div>

//       <div className="flex-1 flex justify-center">
//         <div>
//           <img
//             src="https://res.cloudinary.com/decczwgne/image/upload/v1738169207/logo-white_mt7fza.png"
//             alt="Logo"
//             className="h-12 p-1"
//           />
//         </div>
//       </div>

//       <div className="flex-1 flex justify-end items-center space-x-6">
//         {!isAuth && <Link to="/login">LOG IN</Link>}
//         {!auth.isAuthenticated() ? (
//           <Link
//             to="/signup"
//             className="border border-white rounded-full py-2 px-6 hover:bg-white hover:text-gray-800 transition duration-300"
//           >
//             SIGN UP
//           </Link>
//         ) : (
//           <button
//             className="border border-white rounded-full py-2 px-6 hover:bg-white hover:text-gray-800 transition duration-300"
//             onClick={() => logout()}
//           >
//             LOG OUT
//           </button>
//         )}
//         <Link
//           to="/users"
//           className="flex items-center justify-center p-2 rounded-full hover:bg-white hover:text-gray-800 transition"
//         >
//           {(isAuth && user?.data.photo) && <UserPhoto imgSrc={user.data.photo} />}
//           {(isAuth && !user?.data.photo) && <UserPhoto imgSrc={'https://res.cloudinary.com/decczwgne/image/upload/v1738167328/default_yabbiu.jpg'} />}
//         </Link>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import { Link } from "react-router-dom";
import { auth } from "../api/authApi";
import { useLogout } from "../features/authentication/useLogout";
import { useQueryClient } from "@tanstack/react-query";
import { ResponseType } from "@/types/userType";

import AllUserLinkWapper from "./AllUserLinkWapper";
import UserPhoto from "./UserPhoto";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { logout } = useLogout();
  const queryClient = useQueryClient();
  const user: ResponseType | undefined = queryClient.getQueryData(["user"]);
  const isAuth = auth.isAuthenticated();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between shadow-md w-full bg-zinc-700 px-6 py-4 text-white relative z-50">
      <div className="flex items-center space-x-6">
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <img
          src="https://res.cloudinary.com/decczwgne/image/upload/v1738169207/logo-white_mt7fza.png"
          alt="Logo"
          className="h-10 p-1"
        />
        <div className="hidden md:flex space-x-6">
          {isAuth && (
            <>
              <Link to="/">ALL TOURS</Link>
              <AllUserLinkWapper onClose={() => setMenuOpen(false)} />
            </>
          )}
        </div>
      </div>

      <div className="hidden md:flex items-center space-x-6">
        {!isAuth && <Link to="/login">LOG IN</Link>}
        {!auth.isAuthenticated() ? (
          <Link
            to="/signup"
            className="border border-white rounded-full py-2 px-6 hover:bg-white hover:text-gray-800 transition duration-300"
          >
            SIGN UP
          </Link>
        ) : (
          <button
            className="border border-white rounded-full py-2 px-6 hover:bg-white hover:text-gray-800 transition duration-300"
            onClick={() => logout()}
          >
            LOG OUT
          </button>
        )}
        <Link
          to="/users"
          className="flex items-center justify-center p-2 rounded-full hover:bg-white hover:text-gray-800 transition"
        >
          {isAuth && user?.data.photo ? (
            <UserPhoto imgSrc={user.data.photo} />
          ) : (
            <UserPhoto imgSrc={"https://res.cloudinary.com/decczwgne/image/upload/v1738167328/default_yabbiu.jpg"} />
          )}
        </Link>
      </div>

      {menuOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-zinc-800 flex flex-col items-center space-y-4 py-6 px-4 md:hidden shadow-lg transition-transform transform translate-x-0">
          <button className="self-end mb-4" onClick={() => setMenuOpen(false)}>
            <X size={28} className="text-white" />
          </button>
          <Link
            to="/users"
            className="flex items-center justify-center p-2 rounded-full hover:bg-white hover:text-gray-800 transition"
            onClick={() => setMenuOpen(false)}
          >
            {isAuth && user?.data.photo ? (
              <UserPhoto imgSrc={user.data.photo} />
            ) : (
              <UserPhoto imgSrc={"https://res.cloudinary.com/decczwgne/image/upload/v1738167328/default_yabbiu.jpg"} />
            )}
          </Link>
          {isAuth && (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                ALL TOURS
              </Link>
              <AllUserLinkWapper onClose={() => setMenuOpen(false)} />
            </>
          )}
          {!isAuth && (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              LOG IN
            </Link>
          )}
          {!auth.isAuthenticated() ? (
            <Link
              to="/signup"
              className="border border-white rounded-full py-2 px-6 hover:bg-white hover:text-gray-800 transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              SIGN UP
            </Link>
          ) : (
            <button
              className="border border-white rounded-full py-2 px-6 bg-red-600 hover:bg-red-700 text-white transition duration-300"
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              LOG OUT
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
