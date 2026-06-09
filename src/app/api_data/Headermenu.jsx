import { BiSolidCategory } from "react-icons/bi";
import { FaBoxOpen, FaCalendar, FaClock, FaHome, FaMicroblog, FaUserTie, FaVolleyballBall } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import {
  MdContactEmergency,
  MdHomeRepairService,
  MdMore,
} from "react-icons/md";
import { PiPlantFill } from "react-icons/pi";
import { SlCallIn } from "react-icons/sl";

export const HeaderData = [
  {
    title: "Dashboard",
    slug: "/dashboard",
    icon: <FaHome />,
  },
  // {
  //   title: "about us",
  //   slug: "/about-us",
  //   icon: <MdMore />,
  // },
  {
    title: "Category",
    slug: "/category  ",
    icon: <BiSolidCategory />,
  },
  {
    title: "Product",
    slug: "/product  ",
    icon: <FiPackage />,
  },
  {
    title: "Orders",
    slug: "/orders  ",
    icon: <FaBoxOpen />,
  },
  {
    title: "Enquries",
    slug: "/enquries  ",
    icon: <SlCallIn />,
  },
  {
    title: "Users",
    slug: "/users  ",
    icon: <FaUserTie />,
  },

];
