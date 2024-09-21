import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate 추가
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
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Firebase Auth 관련 import
import app from '../firebase';

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

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-right: 20px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
`;

const UserName = styled.span`
  font-size: 17px;
  color: #000;
  font-weight: bold;
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // useNavigate 추가
  
  // Firebase 인증 인스턴스 가져오기
  const auth = getAuth(app);

  // 로그인한 사용자 정보 가져오기
  useEffect(() => {
    // Firebase Authentication에서 현재 로그인한 유저를 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // 현재 로그인한 유저 정보 설정
        // Firestore나 Realtime Database에서 사용자 추가 정보(키워드)를 가져오려면 이곳에서 추가 가능
        // 예시로, 이메일을 기반으로 Firestore에서 추가 정보를 가져오는 로직을 작성할 수 있습니다.
      } else {
        setUser(null); // 로그아웃 시 null
      }
    });

    return () => unsubscribe(); // 컴포넌트가 언마운트되면 리스너 정리
  }, [auth]);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user'); // localStorage에서 사용자 정보 삭제
    alert('로그아웃 되었습니다.');
    navigate('/'); // 로그아웃 후 홈으로 이동
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
        {/* 로그아웃 버튼에 onClick 이벤트 추가 */}
        <StyledListItem button={true} onClick={() => { handleLogout(); toggleDrawer(false)(); }}>
          <StyledListItemIcon><AccountCircleIcon /></StyledListItemIcon>
          <StyledListItemText primary="Logout" />
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
          {/* 프로필 이미지와 사용자 이름 표시 */}
          {user && (
            <ProfileContainer>
              <ProfileImage
                src="https://img.freepik.com/free-psd/3d-rendering-avatar_23-2150833572.jpg"
                alt="Profile"
              />
              <UserName>{user.displayName || user.email} 님</UserName>
            </ProfileContainer>
          )}
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
