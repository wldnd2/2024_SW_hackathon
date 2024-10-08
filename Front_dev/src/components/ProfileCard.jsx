import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import ProfileModal from './ProfileModal';

const ProfileCard = ({ person }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem alignItems="flex-start" button onClick={handleOpen}>
          <ListItemAvatar>
            <Avatar alt={person.name} src={person.imgPath} />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ color: 'text.primary', display: 'inline' }}
                >
                  {person.name}
                </Typography>
                {` — ${person.description}`}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
      <ProfileModal open={open} handleClose={handleClose} person={person} />
    </>
  );
}

ProfileCard.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    imgPath: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

export default ProfileCard;