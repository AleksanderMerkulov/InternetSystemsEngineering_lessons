import structures from "../data";
import {useParams, Link as RouterLink} from 'react-router';
import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import {Breadcrumbs, Typography, Link} from "@mui/material";
import Navbar from "../components/Navbar";
import {styled} from "@mui/material/styles";


const StyledCardContent = styled(CardContent)(({theme}) => ({
    display: 'grid',
    gridTemplateColumns: "repeat(2, 1fr)"

}))

const StyledBreadcrumbs = styled(Breadcrumbs)((theme) => ({
    margin: '10px 0'
}))


function Building() {
    const {id} = useParams();
    const building = structures[Number(id)]
    return (
        <>
            <Navbar active={''}/>
            <Container maxWidth="lg">
                <StyledBreadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" to="/" component={RouterLink} sx={{color: "#4e60ca", textDecoration: 'none'}}>
                        Главная
                    </Link>
                    <Typography color="textPrimary">{building.title}</Typography>
                </StyledBreadcrumbs>
                <Card>
                    <Typography gutterBottom variant="h5" align={'center'}>
                        {building.title}
                    </Typography>
                    <CardMedia
                        component="img"
                        alt={building.title}
                        image={building.img}
                        sx={{
                            maxHeight: '30vh',
                            objectFit: 'contain'
                        }}
                    />
                    <Box>
                        <StyledCardContent>

                            {building.description.map((item, ind) => (
                                <Typography key={ind} variant="body2">
                                    {item}
                                </Typography>
                            ))}
                        </StyledCardContent>
                    </Box>
                </Card>
            </Container>
        </>
    );
}

export default Building