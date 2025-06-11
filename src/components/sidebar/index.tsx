import {FunctionComponent, useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {siderItems} from './constant';
import Logo from '../logo';
import {SidebarProps, SiderItem} from './type';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {toast} from 'react-toastify';
import {setIsActive, setIsLoggedIn} from '../../slice';
import {useDispatch} from 'react-redux';

const Sidebar: FunctionComponent<SidebarProps> = ({
  setActivePage,
  collapsed,
  setCollapsed,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCollapsed(true);
    }
  }, [setCollapsed]);

  useEffect(() => {
    const path = location.pathname.replace('/', '') || '/';
    setActivePage(path);
  }, [location, setActivePage]);

  const toggleSidebar = () => {
    if (window.innerWidth >= 768) {
      setCollapsed(!collapsed);
    }
  };

  const handleLogout = () => {
    dispatch(setIsLoggedIn(false));
    dispatch(setIsActive(false));
    toast.success('Logout successful!');
    setTimeout(() => {
      navigate('/auth/login');
    }, 1000);
  };

  const toggleIcon = collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />;
  const collapse = collapsed
    ? 'justify-center px-0 py-3'
    : 'px-6 py-3 justify-start';

  const getSvgIcon = (
    path: string,
    activeIcon: string,
    inactiveIcon: string
  ): string => {
    return location.pathname === path ? activeIcon : inactiveIcon;
  };
  const renderIcon = (path: string, icon: string, label: string) => (
    <img
      src={getSvgIcon(path, `${icon}-white.svg`, `${icon}-black.svg`)}
      alt={`${label} Icon`}
      className="w-5 h-5 mr-0"
    />
  );

  return (
    <div className="sidebarbg min-h-full w-full font-customFont">
      <div className="flex items-center justify-between mx-8 mt-9 mb-6 ">
        {!collapsed && <Logo />}
        <Button
          type="text"
          icon={toggleIcon}
          onClick={toggleSidebar}
          className="ml-auto"
        />
      </div>

      <div className="text-start text-lg md:text-base">
        {siderItems.map(({path, label, icon}: SiderItem) => {
          const isActive = location.pathname === path;
          const itemClass = `flex items-center cursor-pointer transition-all duration-300 ${
            collapsed ? 'justify-center px-0 py-2.5' : 'px-7 py-3 justify-start'
          } ${isActive ? 'themebg textwhite' : ''}`;

          return (
            <div
              key={label}
              className={itemClass}
              onClick={() => navigate(path)}
            >
              {renderIcon(path, icon, label)}
              {!collapsed && <span className="flex-1 ml-4">{label}</span>}
            </div>
          );
        })}

        <div
          className={`flex items-center cursor-pointer transition-all duration-300 ${collapse}`}
          onClick={handleLogout}
        >
          <img
            src="/icons/logout.svg"
            alt="Logout Icon"
            className="w-5 h-5 mr-0 ml-1"
          />
          {!collapsed && <span className="flex-1 ml-4">Logout</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
