import styled from 'styled-components';

const NavStyles = styled.nav`
  position: relative;
  height: 100vh;
  border:1px solid transparent;
  border-radius: 4px;
  width: auto;
  background: ${props => props.theme.lightgrey};
  width: 250px;
  div {
    display: block;
  }
  .bar {
    text-align: center;
    width: 100%;
    margin: 0;
    padding: 0;
    padding-top: 25px;
  }
  ul {
    text-align: center;
    margin: 0;
    padding: 0;
    top: 10vh;
    position: relative;
    li {
      margin: 0 0 10px;
      padding: 0;
      list-style: none;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      a {
        color: rgba(0,0,0,.7);
        text-decoration: none;
        position: relative;
        padding: 10px 0;
        font-family: quicksand,Arial,sans-serif;
        -webkit-transition: .3s;
        -o-transition: .3s;
        transition: .3s;
        &:after {
          content: '';
          display: block;
          width: 0;
          left: 50%;
          height: 2px;
          position: absolute;
          background: ${props => props.theme.blue};
          transition: .3s;
        }
        &:hover {

          &:after {
            width: 100%;
            left: 0;
            transition: .3s;
          }
        }

      }
    }
    .active {
      a {
        color: ${props => props.theme.blue};
      }
    }
  }
`;

export default NavStyles;
