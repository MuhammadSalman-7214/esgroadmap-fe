import {Link} from 'react-router-dom';
import Input from '../ui/input';
import Button from '../ui/button';
import Logo1 from '../logo1';
import {quickLinks} from './constant';
import LinkedIn from '../linkedIn';
import {QuickLinkType} from './type';

const Footer = () => {
  return (
    <footer className="pt-10 pb-5 px-4 md:px-10 footerbg">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <div className="flex justify-center lg:justify-start">
          <Logo1 />
        </div>

        <div>
          <h3 className=" font-semibold mb-4 text-lg themetext">QUICK LINKS</h3>
          <ul className="space-y-2 text-sm themetext">
            {quickLinks.map((item: QuickLinkType) => (
              <li key={item.id} className="border-b borderwhite pb-3">
                <Link to={item.link} className="hover:underline">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="themetext font-semibold mb-4 text-lg">
            CONNECT WITH US
          </h3>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block themetext"
          >
            <LinkedIn />
          </a>
        </div>

        <div className="space-y-3">
          <Input placeholder="Name" />
          <Input placeholder="Your Email Address" />
          <Button label="Sign Up" className="buttonbg" />
        </div>
      </div>

      <div className="mt-10 text-center text-xs themetext">
        © 2024 ESGRoadmap
      </div>
    </footer>
  );
};

export default Footer;
