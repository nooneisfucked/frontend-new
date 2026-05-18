// components/layout/Layout.jsx
import { Outlet } from 'react-router-dom';
import SideBar from './SideBar';

function Layout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;