import { Link } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "./ui/navigation-menu";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4">
          <NavigationMenuItem>
            <Link to="/">Home</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/activities">Atividades</Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link to="/submissions">Submissões</Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
