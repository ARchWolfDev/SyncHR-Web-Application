import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
// import LoadingPage from './LoadingPage';
// import { useLocation } from 'react-router-dom';

function PageContent({children}) {

  // const location = useLocation();

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   // When location changes, start loading
  //   setLoading(true);

  //   // Simulate a delay (optional: you can remove this if you don't need a delay)
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000); // Set delay time in milliseconds

  //   // Clean up the timer
  //   return () => clearTimeout(timer);
  // }, [location]);

  return (
    <>
      <Sidebar />
      <Header />
      <div className='content'>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default PageContent
