import HomePage from '../../pages/Home/HomePage';
import './DefaultLayout.scss';
import DefaultLayoutFooter from './DefaultLayoutFooter';
import DefaultLayoutHeader from './DefaultLayoutHeader';
import DefaultLayoutSidebar from './DefaultLayoutSidebar';

const DefaultLayout = () => {
  return (
    <div className="layouts-default-layout-wrapper">
      <DefaultLayoutHeader />
      <div className="main-content">
        <HomePage />
      </div>
      <DefaultLayoutFooter />
      <DefaultLayoutSidebar />
    </div>
  );
};

export default DefaultLayout;
