import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import structures from "../../data";
import {Box, ImageListItemBar, Link, useMediaQuery, useTheme} from "@mui/material";
import Container from "@mui/material/Container";
import {Link as RouterLink} from "react-router";
import Footer from "../../components/Footer";


const imgData = structures.slice(0, -1);

function Gallery() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const imgDataEdited = imgData.slice(0, 6)

    return (
        <Container maxWidth="lg">
            <Box sx={{height: 585, overflowY: 'scroll', m: '20px auto'}}>
                <ImageList
                    gap={8}
                    variant="quilted"
                    cols={isMobile ? 1 : 4}
                    rowHeight={260}
                >
                    {imgDataEdited.map((item, index) => (
                        <ImageListItem
                            key={item.img}
                            cols={isMobile ? 1 : index % 5 === 0 ? 2 : 1}
                            rows={1}
                            component={RouterLink}
                            to={`/artist/${index}`}
                        >
                            <img srcSet={item.img} src={item.img} alt={item.title} loading="lazy"/>
                            <ImageListItemBar position="bottom" title={item.title}/>
                        </ImageListItem>
                    ))}
                </ImageList>
            </Box>
        </Container>
    );
}

export default Gallery;