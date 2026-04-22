import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {styled} from "@mui/material/styles";
import Footer from "../../components/Footer";
import {Link as RouterLink} from "react-router";

interface ComponentProps {
    building: {
        img: string,
        title: string,
        description: string[],
    };
    index: number;
    realIndex: number;
}

const StyledTypography = styled(Typography)(({theme}) => ({
    textAlign: 'center',
    marginBottom: '10px',
    padding: '10px 0px',
    textColor: theme.palette.text.secondary,

}))

function ArtistCard({building, index, realIndex}: ComponentProps) {

    return (
        <Card >
            <StyledTypography gutterBottom variant="h5">
                {building.title}
            </StyledTypography>
            <Box sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    sm: index % 2 === 0 ? 'row-reverse' : 'row',
                },
            }}>
                <CardMedia
                    component="img"
                    alt={building.title}
                    image={building.img}
                    sx={{
                        height: "100%",
                        maxHeight: "300px",
                        objectFit:'contain',
                        maxWidth: "30%"
                    }}
                />
                <CardContent>
                    <Box
                        sx={{
                            columnCount: {xs: 1, md: 2},
                            columnGap: '32px',
                        }}
                    >
                        {building.description.map((item, ind) => (
                            <StyledTypography
                                key={ind}
                                variant="body2"
                                sx={{
                                    breakInside: 'avoid',
                                    mb: 2,
                                }}
                            >
                                {item}
                            </StyledTypography>
                        ))}
                    </Box>
                    <CardActions sx={{justifyContent: index % 2 === 0 ?'flex-end': 'flex-start'}}>
                        <Button size="small"
                                component={RouterLink}
                                to={`/artist/${realIndex}`}
                        >Подробнее</Button>
                    </CardActions>
                </CardContent>
            </Box>
        </Card>
    )
}

export default ArtistCard;