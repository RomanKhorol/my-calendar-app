import { Link, useLocation } from "react-router-dom";
import { styles } from "./SideBar.styles";
import "../../App.css";
import { SideBarData } from "./SideBarData";
export default function SideBar() {
  const location = useLocation();

  return (
    <div style={styles.sidebar}>
      {SideBarData.map((item, index) => {
        const isActive = location.pathname === item.link;

        return (
          <Link
            key={index}
            to={item.link}
            style={{
              ...styles.linkItem,
              ...(isActive ? styles.active : {}),
            }}
          >
            <item.icon style={isActive ? styles.linkIcon.active : {}} />
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
