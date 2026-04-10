import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {styled} from "@mui/material/styles";
import Footer from "../../components/Footer";

interface ComponentProps {
    building: {
        img: string,
        title: string,
        description: string[],
    };
    index: number;
  }

const StyledTypography = styled(Typography)(({theme})=>({
    textAlign: 'justify',
    marginBottom: '10px',
    textColor: theme.palette.text.secondary,

}))

function BuildCard({building, index} : ComponentProps) {
    return (
      <Card sx={{display: 'flex', flexDirection: index % 2 === 0 ? 'row-reverse' : 'row',}}>
        <CardMedia
            component="img"
            alt={ building.title }
            image={ building.img }
        />
        <Box>
          <CardContent>
            <StyledTypography gutterBottom variant="h5" >
              { building.title }
            </StyledTypography>
            { building.description.map((item, ind) => (
              <StyledTypography key={ind} variant="body2">
                { item }
              </StyledTypography>
            ))}
          </CardContent>
          <CardActions sx={{ justifyContent: 'end'}} >
            <Button size="small">Подробнее</Button>
          </CardActions>
        </Box>
      </Card>
    )
}

export default BuildCard;