import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
let prev: string = '';
function ScrollToTop() {
    const location = useLocation();
    useEffect(() => {
        if (location.pathname !== prev) {
            window.scrollTo(0, 0);
            prev = location.pathname;
        }
    }, [location]);
    return null;
}
export default ScrollToTop;