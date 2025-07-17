import DashboardLayout from '../dashboardlayout';
import ToolHeading from '../../components/toolHeading';
import FrequentlyAskedQuestion from '../../components/frequentlyAskedQuestions';

const Faq = () => {
  return (
    <DashboardLayout>
      <ToolHeading title="FAQs" />
      <FrequentlyAskedQuestion />
      {/* <iframe
        src="https://esgroadmap.com/faq/"
        style={{width: '100%', height: '100vh', border: 'none'}}
        title="FAQ"
      ></iframe> */}
    </DashboardLayout>
  );
};

export default Faq;
