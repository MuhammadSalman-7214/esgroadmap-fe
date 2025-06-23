import {useState} from 'react';
import {faqData} from './constant';
import {ChevronDown, ChevronUp} from 'lucide-react';

const FrequentlyAskedQuestion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-2 px-3 sm:px-3 md:px-4 lg:px-5 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-full">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.id}
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
                <p className="text-gray-700 text-md">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FrequentlyAskedQuestion;
