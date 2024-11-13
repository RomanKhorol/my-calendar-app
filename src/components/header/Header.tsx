import { Box, Typography } from "@mui/material";
import CustomizedInput from "../input/CustomInput";
import { styles } from "./Header.styles";
const Header = () => {
  return (
    <Box sx={styles.container}>
      <Box sx={styles.headerBlock}>
        <Typography variant="h6" sx={styles.text}>
          I M P E K A B L E
        </Typography>
      </Box>

      <CustomizedInput />
    </Box>
  );
};

export default Header;
