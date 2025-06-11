import DashboardContent from '../../components/dashboardContent';
import DashboardHeader from '../../components/dashboardHeader';
import DashboardLayout from '../dashboardlayout';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <DashboardHeader />
      <DashboardContent />
    </DashboardLayout>
  );
};

export default Dashboard;
