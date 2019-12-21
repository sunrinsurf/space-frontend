import { css } from "styled-components";

function makeViewport(condition: string) {
  return (style: any) => css`
    @media (${condition}) {
      ${style}
    }
  `;
}

export const mobile = makeViewport("max-width: 640px");
export const tablet = makeViewport("min-width: 768px");
export const desktop = makeViewport("min-width: 1440px");
