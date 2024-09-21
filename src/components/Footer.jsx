import styled from "styled-components";

const Styled_Footer = styled.footer`
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  width: 100%; /* Makes footer full width */
  position: absolute;
  bottom: 0;

  span {
    display: block;
    margin-top: 5px; /* Adjust this for more/less spacing */
  }
`;

const Footer = () => {
    return (
        <Styled_Footer>
            <span>&copy; 2024 SW Hackathon Millenium Babies.</span>
            <span>All rights reserved.</span>
        </Styled_Footer>
    )
};

export default Footer;