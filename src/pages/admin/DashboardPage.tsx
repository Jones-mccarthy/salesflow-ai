import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../../components/layout/PageContainer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function DashboardPage() {
  const { businessName } = useAuth();
  const { products, sales, debts } = useData();
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  
  // Calculate today's sales
  const today = new Date().toISOString().split('T')[0];
  const todaySales = sales.filter(sale => sale.date === today);
  const todaySalesTotal = todaySales.reduce((sum, sale) => sum + sale.amount, 0);
  
  // Calculate stock balance
  const stockBalance = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  
  // Calculate profit margin (simplified)
  const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
  const costOfGoods = totalSales * 0.7; // Assuming 30% profit margin
  const profitMargin = totalSales > 0 ? ((totalSales - costOfGoods) / totalSales) * 100 : 0;
  
  // Calculate debts
  const totalOwed = debts.creditors.reduce((sum, creditor) => sum + creditor.amount, 0);
  const totalOwing = debts.debtors.reduce((sum, debtor) => sum + debtor.amount, 0);
  
  // Identify low stock items
  const lowStockItems = products.filter(product => product.quantity < 10);
  
  // Identify top selling products
  const productSales = products.map(product => {
    const productSales = sales.filter(sale => sale.productId === product.id);
    const totalQuantity = productSales.reduce((sum, sale) => sum + sale.quantity, 0);
    return { ...product, totalQuantity };
  });
  
  const topSellingProducts = [...productSales]
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 5);

  const { addSale } = useData();
  
  const handleQuickSale = (e: React.FormEvent) => {
    e.preventDefault();
    
    const product = products.find(p => p.id === selectedProduct);
    if (product && quantity) {
      const quantityNum = parseInt(quantity);
      const amount = product.price * quantityNum;
      
      addSale({
        productId: selectedProduct,
        quantity: quantityNum,
        amount: amount,
        date: today
      });
      
      alert(`Sale recorded: ${quantity} units of ${product.name}`);
      setSelectedProduct('');
      setQuantity('');
    }
  };

  return (
    <PageContainer>
      {/* Summary Cards */}
      <div className="card-grid-4 mb-6">
        <Card className="card-accent-left border-cyan-500 card-hover">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Today's Sales</p>
              <p className="text-lg font-semibold text-white">{todaySalesTotal.toFixed(2)} GHS</p>
            </div>
          </div>
        </Card>
        
        <Card className="card-accent-left border-green-500 card-hover">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Stock Balance</p>
              <p className="text-lg font-semibold text-white">{stockBalance.toFixed(2)} GHS</p>
            </div>
          </div>
        </Card>
        
        <Card className="card-accent-left border-purple-500 card-hover">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Profit Margin</p>
              <p className="text-lg font-semibold text-white">{profitMargin.toFixed(1)}%</p>
            </div>
          </div>
        </Card>
        
        <Card className="card-accent-left border-yellow-500 card-hover">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 text-white mr-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Net Debt</p>
              <p className="text-lg font-semibold text-white">{(totalOwing - totalOwed).toFixed(2)} GHS</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Today's Sales and Quick Sale Form */}
      <div className="card-grid-2 mb-6">
        <Card title="Today's Sales" className="card-hover">
          {sales.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700/50">
                <thead className="bg-gray-800/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {todaySales.length > 0 ? (
                    todaySales.map((sale) => {
                      const product = products.find(p => p.id === sale.productId);
                      return (
                        <tr key={sale.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">
                              {product?.name || 'Unknown Product'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{sale.quantity}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-300">{sale.amount.toFixed(2)} GHS</div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-center text-gray-400">
                        No sales recorded today
                      </td>
                    </tr>
                  )}
                </tbody>
                <tfoot className="bg-gray-800/30">
                  <tr>
                    <td colSpan={2} className="px-6 py-3 text-right text-sm font-medium text-gray-400">
                      Total:
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-white">
                      {todaySalesTotal.toFixed(2)} GHS
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="py-8">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-300">No sales data</h3>
                <p className="mt-1 text-sm text-gray-400">Start by adding products to inventory and recording sales.</p>
                <div className="mt-6">
                  <Link to="/inventory">
                    <Button>Add Inventory</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        <Card title="Quick Sale" className="card-hover">
          <form onSubmit={handleQuickSale} className="p-2">
            <Select
              label="Product"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              required
              options={products.length > 0 ? products.map(product => ({
                value: product.id,
                label: `${product.name} - ${product.price.toFixed(2)} GHS (${product.quantity} in stock)`
              })) : [{ value: '', label: 'No products available - add inventory first' }]}
            />
            
            <Input
              label="Quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              placeholder="0"
            />
            
            {selectedProduct && quantity && (
              <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  Total: {(
                    products.find(p => p.id === selectedProduct)?.price || 0
                  ) * parseInt(quantity || '0')} GHS
                </p>
              </div>
            )}
            
            <div className="mt-6 flex space-x-4">
              <Button type="submit">Record Sale</Button>
              <Link to="/sales">
                <Button variant="secondary">Go to Sales Page</Button>
              </Link>
            </div>
          </form>
        </Card>
      </div>
      
      <div className="card-grid-2">
        <Card title="Low Stock Alerts" className="card-hover">
          {products.length > 0 ? (
            lowStockItems.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700/50">
                  <thead className="bg-gray-800/30">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Current Stock
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/50">
                    {lowStockItems.map((product) => (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{product.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-900/30 text-red-400">
                              {product.quantity} left
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm text-gray-400 p-4">No low stock items.</p>
            )
          ) : (
            <div className="py-8">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-300">No inventory data</h3>
                <p className="mt-1 text-sm text-gray-400">Start by adding products to your inventory.</p>
                <div className="mt-6">
                  <Link to="/inventory">
                    <Button>Add Inventory</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Card>
        
        <Card title="Debt Overview" className="card-hover">
          {debts.creditors.length > 0 || debts.debtors.length > 0 ? (
            <div className="space-y-4">
              <div className="p-4 bg-red-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-red-400 mb-2">Amount Owed to Suppliers</h4>
                <p className="text-lg font-semibold text-white">{totalOwed.toFixed(2)} GHS</p>
                <p className="text-xs text-gray-400 mt-1">{debts.creditors.length} creditors</p>
              </div>
              
              <div className="p-4 bg-green-900/20 rounded-lg">
                <h4 className="text-sm font-medium text-green-400 mb-2">Amount Owed by Customers</h4>
                <p className="text-lg font-semibold text-white">{totalOwing.toFixed(2)} GHS</p>
                <p className="text-xs text-gray-400 mt-1">{debts.debtors.length} debtors</p>
              </div>
            </div>
          ) : (
            <div className="py-8">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-300">No debt records</h3>
                <p className="mt-1 text-sm text-gray-400">Track what you owe and what others owe you.</p>
                <div className="mt-6">
                  <Link to="/debts">
                    <Button>Manage Debts</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}