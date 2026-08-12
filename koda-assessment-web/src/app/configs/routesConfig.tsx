import HomeIcon from "@mui/icons-material/Home";

export interface RouteConfig {
  id: string;
  title: string;
  url: string;
  icon: React.ElementType;
}

const routesConfig: RouteConfig[] = [
  {
    id: "home",
    title: "Home",
    url: "home",
    icon: HomeIcon,
  }
];

export default routesConfig;