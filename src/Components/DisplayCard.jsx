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
      <Card sx={{ maxWidth: 270, maxHeight: 170, mt: 3 }}>
        <CardContent>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            variant="h5"
            color="#1565c0"
            gutterBottom
          >
            Total Employees
          </Typography>
          <Typography sx={{ textAlign: "center", mt: 2, mb: 0 }} variant="h4">
            20
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              ml: 10,
              textAlign: "center",
              "&:hover": { color: "darkblue" },
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
