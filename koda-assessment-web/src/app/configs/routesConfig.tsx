import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import DashboardIcon from "@mui/icons-material/Dashboard";

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
  },
  {
    id: "projects",
    title: "Projects",
    url: "projects",
    icon: DashboardIcon,
  },
];

export default routesConfig;