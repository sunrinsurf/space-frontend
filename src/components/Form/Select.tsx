import styled from 'styled-components';

const Select = styled.select`
    display: block;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    padding: .5em;
    border-radius: 4px;
    border: solid 1px #cecece;
    &:focus {
        outline: 0;
    }
`;

export default Select;