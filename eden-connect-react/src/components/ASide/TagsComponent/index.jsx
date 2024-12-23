import "./index.css";
import { Typography, Button } from "@mui/material";
import { LocalOffer } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";

function TagsComponent() {
  return (
    <div id="tags-component">
      <div className="tags-icon">
        <Typography
          variant="h6"
          style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
        >
          <LocalOffer style={{ marginRight: 8 }}></LocalOffer># 标签 TAGS
        </Typography>
      </div>
      <div className="tags-div">
        <div className="tag-button">
          <Button variant="outlined" size="small">
            # 小小的也很可爱哦
          </Button>
        </div>
        <div className="tag-button">
          <Button variant="outlined" size="small">
            # 日语学习
          </Button>
        </div>
        <div className="tag-button">
          <Button variant="outlined" size="small">
            # Spring Boot
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TagsComponent;
