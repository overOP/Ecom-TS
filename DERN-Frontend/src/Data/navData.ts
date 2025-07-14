import { FaSignOutAlt } from "react-icons/fa";
import { MdCategory, MdShoppingCartCheckout, MdOutlineDashboardCustomize } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { IoLogoMicrosoft } from "react-icons/io5";
import { RiAdvertisementFill } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import type { IconType } from "react-icons";
import { GiVerticalBanner } from "react-icons/gi";
import { IoIosPeople } from "react-icons/io";

export interface NavItem {
  icon: IconType;
  text: string;
  path: string;
  active?: boolean;
}

export const navItems: NavItem[] = [
  { text: "Dashboard", path: "/", icon: TbReportAnalytics },
  { text: "Products", path: "/products", icon: FaCartShopping },
  { text: "Cart", path: "/cart", icon: MdShoppingCartCheckout },
  { text: "Categories", path: "/categories", icon: MdCategory },
  { text: "Subcategories", path: "/subcategories", icon: MdOutlineDashboardCustomize },
  { text: "Banners", path: "/banners", icon: GiVerticalBanner },
  { text: "Logos", path: "/logos", icon: IoLogoMicrosoft },
  { text: "Advertisements", path: "/advertisements", icon: RiAdvertisementFill },
  { text: "Users", path: "/users", icon: IoIosPeople },
];

export const bottomNavItems: NavItem[] = [
  { text: "Logout", path: "/logout", icon: FaSignOutAlt },
];
