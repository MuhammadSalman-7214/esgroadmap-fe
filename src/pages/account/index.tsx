import DashboardLayout from '../dashboardlayout';
import ToolHeading from '../../components/toolHeading';
import ChangePasswordForm from '../../components/form/changePassword';
import EditProfileForm from '../../components/form/editProfile';
import UpgradePlan from '../../components/upgradePlan';

const Account = () => {
  return (
    <DashboardLayout>
      <ToolHeading title="Account Information" />

      <div className="w-full flex">
        <div className="w-1/2">
          <EditProfileForm />
          <ChangePasswordForm />
        </div>
        <div className="w-1/2">
          <UpgradePlan />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Account;
