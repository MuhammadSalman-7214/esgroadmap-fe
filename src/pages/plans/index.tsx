import {useEffect} from 'react';
import {plans} from './constant';
import * as Paddle from '@paddle/paddle-js';

const Plans = () => {
  useEffect(() => {
    const init = async () => {
      await Paddle.initializePaddle({
        token: 'test_7547424577fb73764f19e04eeb2',
        environment: 'sandbox',
      });
    };
    init();
  }, []);

  const openCheckout = (priceId: string) => {
    const paddle = Paddle.getPaddleInstance('v1');

    if (!paddle) {
      console.error('Paddle not initialized');
      return;
    }

    console.log('Attempting checkout with:', priceId);

    paddle.Checkout.open({
      items: [{priceId, quantity: 1}],
      settings: {displayMode: 'overlay'},
    });
  };

  return (
    <div className="bg-black text-white px-6 py-12 font-sans">
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold">ESGROADMAP</h2>
        <p className="text-gray-400 mt-2">
          No surprises or hidden fees. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="p-6 rounded-lg overflow-hidden shadow-md relative transition-colors duration-300 border-blue-500 bg-gradient bg-gradient-to-t to-blue-800 from-blue-300 border-0"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">{plan.name}</h3>
            </div>
            <p className="text-4xl font-bold mt-2">
              {plan.price}
              <span className="text-lg font-normal">/month</span>
            </p>

            <button
              className="mt-6 w-full py-2 border-0 rounded-full text-white bg-blue-500 hover:bg-blue-700"
              onClick={() => openCheckout(plan.priceId)} // assuming `plan.priceId` exists
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
