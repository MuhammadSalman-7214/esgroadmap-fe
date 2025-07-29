import {useEffect, useState} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const FrequentlyAskedQuestion = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    const fetchFAQ = async () => {
      try {
        const res = await fetch(
          'https://esgroadmap.com/wp-json/wp/v2/pages?slug=faq'
        );
        const data = await res.json();
        const html = data[0]?.content?.rendered;

        if (html) {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const toggleItems = Array.from(
            doc.querySelectorAll('.elementor-toggle-item')
          );

          const faqs: FAQItem[] = toggleItems.map((item, idx) => {
            const question =
              item
                .querySelector('.elementor-toggle-title')
                ?.textContent?.trim() || `Question ${idx + 1}`;
            const answerHTML =
              item.querySelector('.elementor-tab-content')?.innerHTML?.trim() ||
              '<p>No answer found.</p>';
            return {question, answer: answerHTML};
          });

          setFaqItems(faqs);
        } else {
          console.warn('⚠️ No HTML content found.');
        }
      } catch (error) {
        console.error('❌ Error fetching FAQ:', error);
      }
    };

    fetchFAQ();
  }, []);

  return (
    <div className="py-2 px-3 sm:px-3 md:px-4 lg:px-5 w-full">
      <div className="grid grid-cols-1 md:grid-cols-1 gap-3 max-w-full">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm transition-all duration-300"
            >
              <div
                onClick={() => toggleFAQ(index)}
                className={`cursor-pointer px-6 py-4 flex justify-between items-center transition-colors ${
                  isOpen ? 'themebg text-white' : 'bg-white text-black'
                }`}
              >
                <p className="text-md font-semibold">{item.question}</p>
                <span>
                  {isOpen ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </span>
              </div>

              <div
                className={`overflow-hidden transition-[max-height] duration-500 ease-in-out px-6 ${
                  isOpen ? 'max-h-[300px] py-4' : 'max-h-0'
                }`}
              >
                <div
                  className="text-gray-700 text-md"
                  dangerouslySetInnerHTML={{__html: item.answer}}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestion;
