import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  padding: theme.spacing(1),
}));

function Appreciate(props) {
  const [value, setValue] = React.useState(2);
  return (
    <Box
      sx={{
        width: "100%",
        mb: 2,
        borderRadius: 10,
        borderColor: "primary.main",
      }}
    >
      <Stack spacing={2} sx={{ borderColor: "primary.main" }}>
        <Item sx={{ border: 1 }}>
          <div className="appreciate">
            <div>
              <Typography variant="h6" component="div" sx={{ fontSize: 16 }}>
                Đánh giá
              </Typography>
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ fontSize: 14 }}
              >
                Cao Nguyên Khá
              </Typography>
            </div>
            <div>
              <Rating name="simple-controlled" value={5} />
            </div>
          </div>
          <Typography variant="p" component="div" sx={{ fontSize: 16 }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
            corporis minus, nisi nulla officia ratione cumque repellendus
            ducimus accusantium necessitatibus modi, similique eius non
            molestiae expedita est ipsam consectetur quam.
          </Typography>
        </Item>
      </Stack>
    </Box>
  );
}

Appreciate.propTypes = {};

export default Appreciate;
