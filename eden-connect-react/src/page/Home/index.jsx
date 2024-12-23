import "./index.css";
import { Container, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ASide from "../../components/ASide";
import Recommend from "../../components/Recommend";
import Motto from "../../components/Motto";
import ArticleList from "../../components/ArticleList";

function Home() {
  const isSmallScreen = useMediaQuery("(max-width:800px)");

  return (
    <Container id="main">
      <div>
        <Grid container spacing={1}>
          <Grid size={isSmallScreen ? 12 : 9}>
            <div className="main-body">
              <Recommend></Recommend>
              <Motto></Motto>
              <ArticleList></ArticleList>
            </div>
          </Grid>
          <Grid size={3}>{isSmallScreen ? null : <ASide></ASide>}</Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default Home;
