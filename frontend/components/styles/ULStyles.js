import styled from 'styled-components';

const ULStyles = styled.ul`
    text-align: center;
    margin: 0;
    padding: 0;
    top: 15px;
    position: relative;
    li {
      margin: 0 0 10px;
      padding: 0;
      list-style: none;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      a, button {
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
  
`;

export default ULStyles;
