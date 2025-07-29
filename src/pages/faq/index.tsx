import DashboardLayout from '../dashboardlayout';
import ToolHeading from '../../components/toolHeading';
import FrequentlyAskedQuestion from '../../components/frequentlyAskedQuestions';

const Faq = () => {
  return (
    <DashboardLayout>
      <ToolHeading title="FAQs" />
      <FrequentlyAskedQuestion />
    </DashboardLayout>
  );
};

export default Faq;
