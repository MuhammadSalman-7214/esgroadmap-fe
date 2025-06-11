import DashboardLayout from '../dashboardlayout';
import ToolHeading from '../../components/toolHeading';
import ChangePasswordForm from '../../components/form/changePassword';
import EditProfileForm from '../../components/form/editProfile';

const Account = () => {
  return (
    <DashboardLayout>
      <ToolHeading title="Account Information" />

      <div className="w-full flex">
        <div className="w-1/2">
          <EditProfileForm />
          <ChangePasswordForm />
        </div>
        <div className="w-1/2">{/* <ChangePasswordForm /> */}</div>
      </div>
    </DashboardLayout>
  );
};

export default Account;
