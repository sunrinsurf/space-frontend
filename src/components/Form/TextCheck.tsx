import React from 'react'
import styled, { css } from 'styled-components';

interface TextCheckProps {
    children: React.ReactNode,
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
};
interface TextCheckLabelProps {
    checked?: boolean
}
export const TextCheckLabel = styled.div<TextCheckLabelProps>`
    cursor: pointer;
    display: inline;
    padding: .1em .5em;
    transition: color .5s;
    ${props => {
        if (props.checked) {
            return css`
                color: #fd437c;
            `;
        }
        return css`
            color: #494949;
        `;
    }}
`;
function TextCheck({ children, state }: TextCheckProps) {
    const [checked, setChecked] = state;
    function click() {
        setChecked(!checked);
    }
    return (
        <TextCheckLabel checked={!!checked} onClick={click} role="button">
            {children}
        </TextCheckLabel>
    )
}

export default TextCheck;