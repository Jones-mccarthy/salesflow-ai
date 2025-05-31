// Mock data for the application

export const mockProducts = [
  { id: '1', name: 'Rice (5kg)', price: 50, quantity: 20, supplier: 'Global Foods Ltd' },
  { id: '2', name: 'Cooking Oil (1L)', price: 25, quantity: 30, supplier: 'Quality Goods Inc' },
  { id: '3', name: 'Sugar (1kg)', price: 15, quantity: 40, supplier: 'Sweet Supplies Co' },
  { id: '4', name: 'Milk (500ml)', price: 8, quantity: 25, supplier: 'Dairy Farms' },
  { id: '5', name: 'Bread', price: 5, quantity: 15, supplier: 'Local Bakery' },
  { id: '6', name: 'Eggs (Crate)', price: 20, quantity: 10, supplier: 'Poultry Farm' },
  { id: '7', name: 'Tomato Paste', price: 3, quantity: 50, supplier: 'Canned Goods Inc' },
  { id: '8', name: 'Soap', price: 4, quantity: 35, supplier: 'Hygiene Products Ltd' },
];

export const mockSales = [
  { id: '1', date: '2023-06-01', productId: '1', quantity: 5, amount: 250 },
  { id: '2', date: '2023-06-01', productId: '3', quantity: 3, amount: 45 },
  { id: '3', date: '2023-06-02', productId: '2', quantity: 2, amount: 50 },
  { id: '4', date: '2023-06-02', productId: '5', quantity: 10, amount: 50 },
  { id: '5', date: '2023-06-03', productId: '4', quantity: 5, amount: 40 },
  { id: '6', date: '2023-06-03', productId: '6', quantity: 2, amount: 40 },
  { id: '7', date: '2023-06-04', productId: '7', quantity: 8, amount: 24 },
  { id: '8', date: '2023-06-04', productId: '8', quantity: 4, amount: 16 },
];

export const mockDebts = {
  creditors: [
    { id: '1', name: 'Global Foods Ltd', amount: 500, dueDate: '2023-07-15' },
    { id: '2', name: 'Quality Goods Inc', amount: 300, dueDate: '2023-07-20' },
  ],
  debtors: [
    { id: '1', name: 'John Doe', amount: 150, dueDate: '2023-07-10' },
    { id: '2', name: 'Jane Smith', amount: 75, dueDate: '2023-07-05' },
    { id: '3', name: 'Mike Johnson', amount: 200, dueDate: '2023-07-25' },
  ],
};

export const mockSubscription = {
  status: 'trial',
  expiryDate: '2023-07-30',
  daysRemaining: 15,
};

export const mockInsights = [
  { title: 'High Sales Months', content: 'March, June, and December show highest sales volumes.' },
  { title: 'Underperforming Products', content: 'Soap and Eggs have lower turnover rates compared to other products.' },
  { title: 'Business Health', content: 'Overall business health is good with 15% growth compared to last quarter.' },
  { title: 'Improvement Suggestions', content: 'Consider increasing stock of fast-moving items like Rice and Cooking Oil.' },
];