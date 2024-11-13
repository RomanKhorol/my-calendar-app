export const styles = {
  sidebar: {
    backgroundColor: "#5c5470",
    color: "white",
    width: "250px",
    height: "100vh",
    padding: "0px",
    display: "flex",
    flexDirection: "column" as const,
  },
  linkItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "white",
    padding: "10px",
    textDecoration: "none",
    transition: "background-color 0.3s",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  },
  active: {
    borderLeft: "4px solid #00bbf0",
    backgroundColor: "#352f44",
  },
  linkIcon: {
    active: {
      color: "#00bbf0",
    },
  },
};
