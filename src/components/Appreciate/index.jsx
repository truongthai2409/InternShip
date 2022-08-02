import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
}));
const labels = {
  0.5: "Vô dụng",
  1: "Vô dụng +",
  1.5: "Kém",
  2: "Kém +",
  2.5: "Được",
  3: "Ok +",
  3.5: "Tốt",
  4: "Tốt +",
  4.5: "Xuất sắc",
  5: "Xuất sắc +",
};
const Appreciate = ({ appreciate }) => {
  const value = appreciate.score;

  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        borderRadius: 10,
      }}
    >
      <Stack sx={{}}>
        <Item sx={{}}>
          <div className="appreciate">
            <div>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ fontSize: 16 }}
              >
                {appreciate.user.username}
              </Typography>
            </div>
            <div>
              <Rating
                name="text-feedback"
                value={value}
                readOnly
                precision={0.5}
                emptyIcon={
                  <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                }
                sx={{ fontSize: 24 }}
              />
              <Box sx={{ ml: 2, fontSize: 16 }}>{labels[value]}</Box>
            </div>
          </div>
          <Typography variant="p" component="div" sx={{ fontSize: 16 }}>
            {appreciate.comment}
          </Typography>
        </Item>
      </Stack>
    </Box>
  );
};

Appreciate.propTypes = {};

export default Appreciate;
