import PropTypes from 'prop-types';
import { Box, Typography, Link as MuiLink } from '@mui/material';

const CreatorDetailsContainer = (props) => (
  <Box
    sx={{
      width: '600px',
      display: 'flex',
      marginTop: '20px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 0px 8px rgba(0, 0, 0, 0.2)',
    }}
    {...props}
  />
);

const CreatorImage = (props) => (
  <Box
    component="img"
    sx={{
      width: '160px',
      height: '160px',
      borderRadius: '10px',
      objectFit: 'cover',
      marginRight: '20px',
    }}
    {...props}
  />
);

const CreatorDetailsWrapper = (props) => (
  <Box
    sx={{
      flex: 1,
    }}
    {...props}
  />
);

const CreatorDetails = ({ creator, extractedText }) => {
  return (
    <CreatorDetailsContainer>
      <CreatorImage src={creator.imageUrl} alt={creator.name} />
      <CreatorDetailsWrapper>
        <Typography variant="p" component="h2" gutterBottom>
          {creator.name}
        </Typography>
        <Typography variant="body1" gutterBottom>
          7대 분야: {creator.category}
        </Typography>
        <Typography variant="body1" gutterBottom>
          아이템: {extractedText}
        </Typography>
        {/* <Typography variant="body1" gutterBottom>
          아이템 설명: {creator.item}
        </Typography> */}
        <Typography variant="body1" gutterBottom>
          지역: {creator.region} {creator.subregion}
        </Typography>
        <Typography variant="body1" gutterBottom>
          홈페이지: <MuiLink href={creator.homepage} target="_blank" rel="noopener noreferrer">{creator.homepage}</MuiLink>
        </Typography>
      </CreatorDetailsWrapper>
    </CreatorDetailsContainer>
  );
};

CreatorDetails.propTypes = {
  creator: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    item: PropTypes.string.isRequired,
    region: PropTypes.string.isRequired,
    subregion: PropTypes.string.isRequired,
    homepage: PropTypes.string.isRequired,
  }).isRequired,
  extractedText: PropTypes.string.isRequired,
};

export default CreatorDetails;