import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

const DisplayCard = () => {
  return (
    <Container>
      <Card
        sx={{
          maxWidth: 270,
          maxHeight: 170,
          mt: 3,
          background: `linear-gradient(90deg, 
          rgba(70, 130, 180, 1) 0%,  /* Steel Blue */
          rgba(25, 25, 112, 1) 50%,  /* Midnight Blue */
          rgba(10, 10, 10, 1) 100%);`,
        }}
      >
        <CardContent>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="h5"
            color="#fff"
            gutterBottom
          >
            Total Employees
          </Typography>
          <Typography
            sx={{ textAlign: "center", mt: 2, mb: 0, color: "#fff" }}
            variant="h4"
          >
            20
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              ml: 10,
              textAlign: "center",
              color: "#fff",
              bgcolor: "darkblue",
              "&:hover": { color: "white" },
            }}
            variant="outlined"
            size="small"
          >
            See more...
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default DisplayCard;
