import {Link} from 'react-router-dom';
import {navItems} from './constant';
import Logo from '../logo';
import Button from '../ui/button';
import {NavItem} from './type';

const Navbar = () => {
  return (
    <div className="w-full flex flex-col items-center gap-1 px-5">
      <div className="flex flex-1 w-full py-5 justify-between items-center">
        <Link to={'/'}>
          <Logo />
        </Link>

        <nav className="md:block hidden">
          <ul className="flex items-center gap-4">
            {navItems.map((item: NavItem) => {
              return (
                <li key={item.id} className="text-md">
                  {item.isButton ? (
                    <Button label={item.title} className="buttonbg1" />
                  ) : (
                    <Link to={item.link} className="themetext">
                      {item.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
