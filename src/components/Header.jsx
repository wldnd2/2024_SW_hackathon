import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  padding-bottom: 5px;
`;

const StyledDrawerList = styled.div`
  width: 240px;
  background-color: #f5f5f5;
  height: 100%;
`;

const StyledListItem = styled(ListItem)`
  &:hover {
    background-color: #e0e0e0;
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  color: #3f51b5;
`;

const StyledListItemText = styled(ListItemText)`
  color: #3f51b5;
`;

const Logo = styled.img`
  height: 30px;
  margin-right: 16px;
`;

const FlexGrowDiv = styled.div`
  flex-grow: 1;
  color: #000;
`;

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <StyledDrawerList>
      <List>
        <StyledListItem button={true} component={Link} to="/" onClick={toggleDrawer(false)}>
          <StyledListItemIcon><HomeIcon /></StyledListItemIcon>
          <StyledListItemText primary="Home" />
        </StyledListItem>
        <StyledListItem button={true} component={Link} to="/search" onClick={toggleDrawer(false)}>
          <StyledListItemIcon><SearchIcon /></StyledListItemIcon>
          <StyledListItemText primary="Search" />
        </StyledListItem>
        <StyledListItem button={true} component={Link} to="/mypage" onClick={toggleDrawer(false)}>
          <StyledListItemIcon><AccountCircleIcon /></StyledListItemIcon>
          <StyledListItemText primary="My Page" />
        </StyledListItem>
        <StyledListItem button={true} component={Link} to="/login" onClick={toggleDrawer(false)}>
          <StyledListItemIcon><AccountCircleIcon /></StyledListItemIcon>
          <StyledListItemText primary="Login" />
        </StyledListItem>
      </List>
    </StyledDrawerList>
  );

  return (
    <HeaderContainer>
      <AppBar position="fixed" sx={{ backgroundColor: '#fff', borderRadius: "0 0 15px 15px" }}>
        <Toolbar>
          <Logo src="https://www.daegu.go.kr/cmsh/daegu.go.kr/images/2023/common/logo_header_m.png" alt="Logo" />
          <FlexGrowDiv />
          <MenuIcon onClick={toggleDrawer(true)} sx={{ color: '#000' }} />
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* This is to offset the content below the AppBar */}
    </HeaderContainer>
  );
}

export default Header;