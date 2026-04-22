import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import structures from "../../data";
import ArtistCard from "./ArtistCard";
import Footer from "../../components/Footer";

const cardData = [structures[0], structures[6], structures[5], structures[7]]

function Content() {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={{ xs: 3, md: 6 }}>
        {cardData.map((item, index) => (
          <Grid key={index} size={ 12 } >
            <ArtistCard building={ item } index={index}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Content;