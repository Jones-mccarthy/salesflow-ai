import PageContainer from '../components/layout/PageContainer';
import Card from '../components/ui/Card';
import { useData } from '../context/DataContext';

export default function InsightsPage() {
  const { products, sales, debts } = useData();
  
  // Generate insights based on actual data
  const generateInsights = () => {
    const insights = [];
    
    // Only generate insights if there's data
    if (products.length > 0) {
      // Inventory insights
      const lowStockItems = products.filter(p => p.quantity < 5);
      if (lowStockItems.length > 0) {
        insights.push({
          title: 'Low Stock Alert',
          content: `${lowStockItems.length} products are running low on stock. Consider restocking soon.`
        });
      }
      
      // High value items
      const highValueItems = [...products].sort((a, b) => (b.price * b.quantity) - (a.price * a.quantity)).slice(0, 3);
      if (highValueItems.length > 0) {
        insights.push({
          title: 'Inventory Value',
          content: `Your highest value items are ${highValueItems.map(p => p.name).join(', ')}.`
        });
      }
    }
    
    if (sales.length > 0) {
      // Sales insights
      const totalSales = sales.reduce((sum, sale) => sum + sale.amount, 0);
      insights.push({
        title: 'Sales Performance',
        content: `Total sales recorded: ${totalSales.toFixed(2)} GHS across ${sales.length} transactions.`
      });
      
      // Best selling products
      const salesByProduct = {};
      sales.forEach(sale => {
        if (!salesByProduct[sale.productId]) {
          salesByProduct[sale.productId] = 0;
        }
        salesByProduct[sale.productId] += sale.quantity;
      });
      
      const bestSellingIds = Object.entries(salesByProduct)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([id]) => id);
        
      const bestSellingProducts = products.filter(p => bestSellingIds.includes(p.id));
      
      if (bestSellingProducts.length > 0) {
        insights.push({
          title: 'Popular Products',
          content: `Your best selling products are ${bestSellingProducts.map(p => p.name).join(', ')}.`
        });
      }
    }
    
    if (debts.creditors.length > 0 || debts.debtors.length > 0) {
      // Debt insights
      const totalOwed = debts.creditors.reduce((sum, c) => sum + c.amount, 0);
      const totalOwing = debts.debtors.reduce((sum, d) => sum + d.amount, 0);
      const netDebt = totalOwing - totalOwed;
      
      insights.push({
        title: 'Debt Management',
        content: netDebt > 0 
          ? `You have a positive debt balance of ${netDebt.toFixed(2)} GHS (more owed to you than you owe).`
          : `You have a negative debt balance of ${Math.abs(netDebt).toFixed(2)} GHS (you owe more than is owed to you).`
      });
    }
    
    // If no insights could be generated, add a default message
    if (insights.length === 0) {
      insights.push({
        title: 'Getting Started',
        content: 'Add inventory, record sales, and manage debts to see AI-powered insights here.'
      });
    }
    
    return insights;
  };
  
  const insights = generateInsights();
  return (
    <PageContainer title="Business Insights">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Weekly Sales Chart */}
        <Card title="Weekly Sales">
          <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
            {/* In a real app, this would be a chart component */}
            <p className="text-slate-300">Weekly Sales Chart Placeholder</p>
          </div>
        </Card>
        
        {/* AI Insights */}
        <Card title="AI-Powered Insights">
          {insights.length > 0 ? (
            insights.map((insight, index) => (
              <div 
                key={index} 
                className={`p-4 mb-4 rounded-lg ${
                  index % 2 === 0 ? 'bg-gray-800/40' : 'bg-gray-800/60'
                }`}
              >
                <h3 className={`text-lg font-medium mb-2 ${
                  index % 2 === 0 ? 'text-cyan-400' : 'text-indigo-400'
                }`}>
                  {insight.title}
                </h3>
                <p className="text-gray-300">{insight.content}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-400">
              <p>Add data to generate insights</p>
            </div>
          )}
        </Card>
      </div>
      
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <Card title="Product Performance">
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700/50">
                <thead className="bg-gray-800/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {products.slice(0, 5).map((product) => {
                    // Calculate performance based on sales
                    const productSales = sales.filter(s => s.productId === product.id);
                    const totalSold = productSales.reduce((sum, s) => sum + s.quantity, 0);
                    const totalStock = product.quantity + totalSold;
                    
                    // Calculate performance as percentage of stock sold
                    const performance = totalStock > 0 ? Math.floor((totalSold / totalStock) * 100) : 0;
                    
                    let status;
                    let statusColor;
                    
                    if (performance > 75) {
                      status = 'Excellent';
                      statusColor = 'bg-green-900/30 text-green-400';
                    } else if (performance > 50) {
                      status = 'Good';
                      statusColor = 'bg-blue-900/30 text-blue-400';
                    } else if (performance > 25) {
                      status = 'Average';
                      statusColor = 'bg-yellow-900/30 text-yellow-400';
                    } else {
                      status = 'Low';
                      statusColor = 'bg-red-900/30 text-red-400';
                    }
                    
                    return (
                      <tr key={product.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{product.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-cyan-400 h-2.5 rounded-full" 
                              style={{ width: `${performance}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-300 mt-1">{performance}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                            {status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 text-center text-gray-400">
              <p>Add products to see performance metrics</p>
            </div>
          )}
        </Card>
        
        <Card title="Monthly Sales Comparison">
          <div className="h-64 flex items-center justify-center bg-slate-800/30 rounded-lg">
            {/* In a real app, this would be a chart component */}
            <p className="text-slate-300">Monthly Comparison Chart Placeholder</p>
          </div>
        </Card>
      </div>
      
      <div className="mt-6">
        <Card title="Business Health Overview">
          <div className="p-6">
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="p-4 bg-gray-800/40 rounded-lg h-full">
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Revenue</h3>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {sales.reduce((sum, sale) => sum + sale.amount, 0).toFixed(2)} GHS
                  </div>
                  <p className="text-sm text-gray-400">Total sales revenue</p>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="p-4 bg-gray-800/40 rounded-lg h-full">
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Inventory Value</h3>
                  <div className="text-3xl font-bold text-indigo-400 mb-2">
                    {products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2)} GHS
                  </div>
                  <p className="text-sm text-gray-400">Current stock value</p>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 px-2 mb-4">
                <div className="p-4 bg-gray-800/40 rounded-lg h-full">
                  <h3 className="text-lg font-medium text-gray-300 mb-2">Net Debt</h3>
                  {(() => {
                    const totalOwed = debts.creditors.reduce((sum, c) => sum + c.amount, 0);
                    const totalOwing = debts.debtors.reduce((sum, d) => sum + d.amount, 0);
                    const netDebt = totalOwing - totalOwed;
                    const isPositive = netDebt >= 0;
                    
                    return (
                      <>
                        <div className={`text-3xl font-bold mb-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                          {isPositive ? '+' : ''}{netDebt.toFixed(2)} GHS
                        </div>
                        <p className="text-sm text-gray-400">
                          {isPositive ? 'Net amount owed to you' : 'Net amount you owe'}
                        </p>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-white mb-4">Recommendations</h3>
              {(products.length > 0 || sales.length > 0 || debts.creditors.length > 0 || debts.debtors.length > 0) ? (
                <ul className="space-y-2 text-gray-300">
                  {products.length > 0 && (
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>
                        {products.filter(p => p.quantity < 5).length > 0 
                          ? `Restock ${products.filter(p => p.quantity < 5).length} low inventory items` 
                          : 'Maintain current inventory levels'}
                      </span>
                    </li>
                  )}
                  
                  {sales.length > 0 && (
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Continue tracking sales to build more detailed insights</span>
                    </li>
                  )}
                  
                  {debts.debtors.length > 0 && (
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Follow up on {debts.debtors.length} customer debts to improve cash flow</span>
                    </li>
                  )}
                  
                  {debts.creditors.length > 0 && (
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-cyan-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Plan payments for {debts.creditors.length} supplier debts</span>
                    </li>
                  )}
                </ul>
              ) : (
                <p className="text-gray-400">Add inventory, sales, and debt data to see recommendations</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}