import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <span className="text-gray-900 text-lg font-semibold tracking-wide">
          IFCode
        </span>
      </div>

      <NavigationMenu className="hidden md:flex items-center space-x-6">
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem className="text-gray-700 hover:text-black transition-colors duration-300">
            <Link to="/">Home</Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="text-gray-700 hover:text-black transition-colors duration-300">
            <Link to="/activities">Atividades</Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="text-gray-700 hover:text-black transition-colors duration-300">
            <Link to="/submissions">Submissões</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
