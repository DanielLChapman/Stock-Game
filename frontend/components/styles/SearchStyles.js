import styled from 'styled-components';

const SearchStyles = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    border: 1px solid black;
    .search {
        width: 100%;
        padding: 50px 15px;
        height: auto;
        position: relative;
        border:1px solid green;
        .search-area {
            width: 80%;
            min-width: 500px;
            margin: 0 auto;
            height: 200px;
            border:1px solid orange;
            position: relative;
            padding: 5vh;
        }
        .results {
            width: 80%;
            min-width: 500px;
            margin: 0 auto;
            min-height: 200px;
            height: auto;
            border:1px solid orange;
            position: relative;
            padding: 5vh;
        }
  }
`;

export default SearchStyles;
