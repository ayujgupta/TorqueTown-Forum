import { Box, Container, Typography, Link } from "@mui/material";
import "./index.css";

function Footer() {
  return (
    <Box
      sx={{
        py: 3, // 上下内边距
        mt: "auto", // 保证 Footer 在底部
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} C59z All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          <Link href="https://github.com/c59z" color="inherit" sx={{ mx: 1 }}>
            GitHub
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
