import React from 'react'

interface ArrowProps {
    strokeLen?: number,
    height?: number
}
function Arrow({ strokeLen, height, ...props }: React.SVGProps<SVGSVGElement> & ArrowProps) {
    if (!height) {
        height = 30;
    }
    return (
        <svg {...props} viewBox="0 0 300 300" height={height}>
            <path
                style={{ fill: 'black', stroke: (strokeLen && "black" as any), strokeWidth: strokeLen && strokeLen }}
                d="M149.9,220L11.8,81.8l1.8-1.8L150,216.4L286.4,80l1.8,1.8L150.1,220"
            />
        </svg>
    )
}

export default Arrow;