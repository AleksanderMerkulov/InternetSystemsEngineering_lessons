import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {styled} from '@mui/material/styles';
import Container from '@mui/material/Container';
import {Box, Button, Drawer, IconButton, Link, MenuItem, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import React from "react";
import '../styles/Navbar.css'
import {Link as RouterLink} from "react-router";

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    border: '1px solid',
    borderColor: theme.palette.divider,
    padding: '8px 12px',
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,

    '&:hover': {
        backgroundColor: "rgba(2,136,209,0.4)",
    },
    '&.Mui-selected': {
        backgroundColor: '#0288d1',
        color: theme.palette.primary.contrastText,
    },

}));

interface ComponentProps {
    active: string;
}

function Navbar({active}: ComponentProps) {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean | ((prevState: boolean) => boolean)) => () => {
        setOpen(newOpen);
    };

    const menuItems = [
        { id: '1', label: 'Главная', link: '/' },
        { id: '2', label: 'Список треков', link: '/list' },
        { id: '3', label: 'Диаграммы', link:'/chart' },
        { id: '4', label: 'Проверь себя', link:'/test' },
        { id: '5', label: 'Редактировать', link:'/edit' },
    ];

    return (
        <AppBar
            position="static"
            sx={{
                boxShadow: 0,
                bgcolor: "#5a5a5a",
                mt: '28px',
            }}
        >
            <Container maxWidth="xl">
                <StyledToolbar>
                    <Box sx={{display: {xs: 'none', md: 'flex'}, justifyContent:'center'}}>


                        {menuItems.map((item) => (

                            <Link to={item.link} component={RouterLink}>
                                <Button
                                    key={item.id}
                                    color="success"
                                    size="medium"
                                    variant={active === item.id ? 'contained' : 'text'}
                                    sx={{
                                        color:"#fff"
                                    }}
                                >
                                    {item.label}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                        >
                            <Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon/>
                                    </IconButton>
                                </Box>
                                {menuItems.map((item) => (
                                    <Link to={item.link} component={RouterLink}>
                                        <StyledMenuItem
                                            key={item.id}
                                            selected={active === item.id}
                                            onClick={toggleDrawer(false)}
                                        >
                                            {item.label}
                                        </StyledMenuItem>
                                    </Link>
                                ))}
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;