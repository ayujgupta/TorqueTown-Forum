import "./index.css";
import Grid from "@mui/material/Grid2";

function Recommend() {
  const recommend1 = "http://localhost:7777/upload/img/76081770_p0.jpg";
  const recommend2 = "http://localhost:7777/upload/img/c102-15.jpg";
  const recommend3 = "http://localhost:7777/upload/img/57793944_p0.jpg";

  return (
    <Grid container spacing={2} id="recommend-layout">
      <Grid size={8}>
        <div className="recommend-context-1">
          <img
            className="recommend-image"
            loading="lazy"
            src={recommend1}
            alt=""
          />
        </div>
      </Grid>

      <Grid
        size={4}
        container
        direction="column"
        spacing={0}
        justifyContent="space-between"
      >
        <Grid style={{ Height: "110%" }}>
          <div className="recommend-context-2">
            <img
              className="recommend-image"
              loading="lazy"
              src={recommend2}
              alt=""
            />
          </div>
        </Grid>
        <Grid style={{ Height: "100%" }}>
          <div className="recommend-context-3">
            <img
              className="recommend-image"
              loading="lazy"
              src={recommend3}
              alt=""
              style={{ Height: "100%" }}
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Recommend;
