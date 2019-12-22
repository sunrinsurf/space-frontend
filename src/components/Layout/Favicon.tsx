import React from "react";

interface FaviconProps {
  white?: boolean;
}
function Favicon({
  white,
  ...props
}: FaviconProps & React.SVGProps<SVGAElement>) {
  return (
    
    <svg
      viewBox="0 0 140 140"
      xmlns="http://www.w3.org/2000/svg"
      {...(props as any)}
    >
      <g>
        <linearGradient id="Favicon__1" x1="0%" y1="25.181%" y2="74.819%">
            <stop offset="0%" stop-color="#FF388A"/>
            <stop offset="100%" stop-color="#0091FF"/>
        </linearGradient>
        <path
          style={{ fill: white ? "white" : "url(#Favicon__1)" }}
          d="M127.7,20.5c-5.1,0.1-11.8,1.7-19.9,4.6c-4.6,1.7-9.7,3.8-14.9,6.3c-1.2,0.6-2.5,1.2-3.8,1.8l-1.3,0.6
			l1.2,0.7c9.5,5.6,16.1,14.9,18.3,25.7c-9.3,7.9-19.1,15.2-29.3,21.9C67.9,88.9,57.3,95,46.3,100.5l0,0l-0.4,0.2c-1,0.5-2,1-3,1.4
			c-1,0.4-2.2,1-3.3,1.5c-3.5,1.6-6.9,3-10,4.1c-8.5,3.1-13.8,4-16.6,4.1c-3.5,0.2-4.9-0.5-5.2-0.9c-0.3-0.4-0.3-1.3,0.4-3.2
			c1-2.7,3.8-7.7,11.2-15.5c1.8-2,3.9-4,6.1-6.1c1.2,2.8,2.6,5.5,4.2,8c1.4,2.2,3,4.2,4.8,6.2l0.4,0.4l0.5-0.2c1.9-0.8,4-1.8,6-2.7
			l1-0.5l-0.8-0.8C35.2,90.4,31.1,82.2,30,73.4l0,0c-0.3-2.5-0.4-5.1-0.2-7.6c0.4-5.9,2.1-11.7,5.1-16.9C41,38,52.1,30.8,64.5,29.4
			c5.9-0.6,11.9,0.1,17.6,2.1l0.3,0.1l0.3-0.1c2.4-1.3,4.9-2.5,7.2-3.6l1.4-0.7l-1.4-0.7c-3.6-1.8-7.5-3.2-11.5-4
			C53,17.1,28.2,33.5,23,58.8c0,0,0,0,0,0c-0.8,4-1.1,8.1-0.9,12.1c0.1,2.3,0.4,4.7,0.9,7c-3.4,3.1-6.4,6.1-9.1,9
			c-6,6.3-10,11.8-12.1,16.4c-2.2,4.8-2.3,8.8-0.3,11.8c2,3,5.7,4.5,10.9,4.4c5.1-0.1,11.8-1.7,19.9-4.6c4.2-1.5,8.8-3.5,13.6-5.7
			c22.6,12.7,51.2,4.7,64-17.8c4.8-8.5,6.8-18.3,5.8-28.1c4-3.5,7.5-7,10.6-10.2c6-6.3,10-11.8,12.1-16.4c2.2-4.8,2.3-8.8,0.3-11.8
			C136.6,21.9,132.9,20.4,127.7,20.5z M102.4,35.5c2.8-1.2,5.4-2.3,8-3.2c8.5-3.1,13.8-4,16.6-4.1c3.5-0.2,4.9,0.5,5.2,0.9
			c0.3,0.4,0.4,2-1.2,5.1c-1.3,2.6-4.1,7.1-10.4,13.7c-2.1,2.2-4.3,4.4-6.8,6.8c-0.5-1.8-1.2-3.5-1.9-5.2c-1.1-2.4-2.3-4.7-3.7-6.9
			C106.4,40,104.5,37.7,102.4,35.5z M90.5,101.1c-10.6,7-24,8.4-35.9,3.8c9.5-5,18.7-10.4,27.6-16.3c8.9-5.8,17.6-12.2,25.9-18.9
			C107.7,82.4,101.1,94.1,90.5,101.1L90.5,101.1z"
        />
      <linearGradient id="Favicon__2" x1="0%" y1="25.181%" y2="74.819%">
            <stop offset="0%" stop-color="#FF388A"/>
            <stop offset="100%" stop-color="#0091FF"/>
        </linearGradient>
        <path
          style={{ opacity: 0.33, fill: white ? "white" : `url(#Favicon__2)` }}
          d="M34 18a54.702 54.702 0 0 0 2.975-1.667 12.63 12.63 0 0 0-.07-2.333c-.96.762-1.54 1.21-2.63 1.97A11.16 11.16 0 0 1 34 18z" opacity=".33"
        />
      </g>
    </svg>
  );
}

export default Favicon;
