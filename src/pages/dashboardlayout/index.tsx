import {FunctionComponent, useEffect, useState} from 'react';
import {Layout} from 'antd';
import Sidebar from '../../components/sidebar';
import {DashboardLayoutProps} from './type';

const {Sider, Content} = Layout;

const DashboardLayout: FunctionComponent<DashboardLayoutProps> = ({
  children,
}) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<string>('dashboard');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const siderWidth = collapsed ? 70 : 315;

  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={315}
        collapsedWidth={70}
        className="fixed left-0 top-0 h-screen z-[1000] sidebarbg border-r border-gray-200 overflow-hidden"
      >
        <Sidebar
          setActivePage={setActivePage}
          activePage={activePage}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </Sider>

      <Layout className={`transition-all duration-300 ml-[${siderWidth}px]`}>
        <Content className="whitebg h-screen overflow-y-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
