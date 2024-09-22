// import ItemCards from "./ItemCards";
import Carousel from 'react-material-ui-carousel';
import styled from 'styled-components';
import ItemCarousel from './ItemCarousel';
import { ItemInfo } from '../constants/ItemInfo';

const StyledCarousel = styled(Carousel)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
`;

const ItemSlider = () => {
  return (
    <StyledCarousel>
      {
        ItemInfo.map((item, index) => {
          return (
            <ItemCarousel key={index} item={item} />
          );
        })
      }
    </StyledCarousel>
  );
};

export default ItemSlider;
