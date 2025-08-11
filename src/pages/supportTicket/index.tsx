import DashboardLayout from '../dashboardlayout';
import ToolHeading from '../../components/toolHeading';
// import Button from '../../components/ui/button';

const SupportTicket = () => {
  // const handleClick = () => {
  //   const email = 'team@esgroadmap.com';
  //   const subject = 'Support Request';
  //   const body = 'Please describe your issue here.';
  //   window.location.href = `mailto:${email}?subject=${encodeURIComponent(
  //     subject
  //   )}&body=${encodeURIComponent(body)}`;
  // };

  return (
    <DashboardLayout>
      <div className="h-[10%]">
        <ToolHeading title="Support" />
      </div>
      <div className="flex justify-center items-center h-[90%]">
        <div className="text-center">
          {/* <p className="mb-4 text-lg">
            If you have any issues, feel free to reach out to our support team.
          </p>
          <Button
            onClick={handleClick}
            className="themebg text-white px-6 py-2 rounded-lg cursor-pointer"
            label="Open Support Mail"
          /> */}
          <p className="mb-4 text-lg font-semibold">
            Please contact{' '}
            <span className="font-normal text-blue-500">
              {import.meta.env.VITE_SUPPORT}
            </span>{' '}
            for any support questions
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SupportTicket;
