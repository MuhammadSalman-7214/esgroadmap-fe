import Button from '../ui/button';
import {dashboardContent} from './constant';
import {DashboardItem, DashboardProp} from './type';

const DashboardContent = () => {
  return (
    <div className="px-5 lg:w-11/12 md:w-11/12 w-full mb-8">
      {Object.keys(dashboardContent).map((key) => {
        const section = dashboardContent[key as keyof DashboardProp];

        return (
          <div key={key}>
            <h2 className="text-md md:text-lg font-bold my-3">
              {section.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {section.data.map((item: DashboardItem) => (
                <div key={item.id} className="relative rounded overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-34  object-cover rounded-md"
                  />

                  <div className="absolute inset-0 rounded-md bg-gradient-to-t from-[#3a2b2b]/80 to-[#2c2c2c]/60" />

                  <div className="absolute inset-0 top-0 bottom-0 right-5 left-5 flex flex-col justify-between p-3">
                    <h3 className="text-sm md:text-base font-semibold textwhite text-center">
                      {item.name}
                    </h3>
                    <Button
                      className="buttonbg2 textwhite text-md sm:text-xs  px-3 py-1 mt-2 mx-auto"
                      label={item.todo}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardContent;
