// types.ts

export type Price = {
  id: string;
  product_id: string;
  name: string;
  description: string;
  billing_cycle: {
    interval: string;
    frequency: number;
  };
  unit_price: {
    amount: string;
    currency_code: string;
  };
};

export type Plan = {
  id: string;
  title: string;
  access: string;
  amount: string;
  currency: string;
  duration: string;
  features: string[];
};

export type PackageProp = {
  product: {
    data: any[]; // You can type this later if needed
    meta: any;
  };
  prices: {
    data: Price[];
    meta: any;
  };
};
