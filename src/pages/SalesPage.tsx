import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import useVoiceInput from '../hooks/useVoiceInput';
import { useData } from '../context/DataContext';

export default function SalesPage() {
  const { products, sales, addSale } = useData();
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
  });

  const { isListening, transcript, startListening, stopListening } = useVoiceInput({
    onResult: (text) => {
      // Simple parsing logic for voice input
      if (text.includes('product')) {
        const productMatch = text.match(/product (.*?)(?:,|$)/);
        if (productMatch && productMatch[1]) {
          const productName = productMatch[1].trim();
          const product = products.find(p => 
            p.name.toLowerCase().includes(productName.toLowerCase())
          );
          if (product) setFormData(prev => ({ ...prev, productId: product.id }));
        }
      }
      
      if (text.includes('quantity')) {
        const quantityMatch = text.match(/quantity (\d+)/);
        if (quantityMatch && quantityMatch[1]) setFormData(prev => ({ ...prev, quantity: quantityMatch[1] }));
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const product = products.find(p => p.id === formData.productId);
    if (!product) return;
    
    const quantity = parseInt(formData.quantity);
    const amount = product.price * quantity;
    
    addSale({
      productId: formData.productId,
      quantity,
      amount,
      date: new Date().toISOString().split('T')[0]
    });
    
    setFormData({ productId: '', quantity: '' });
  };

  // Get today's sales
  const today = new Date().toISOString().split('T')[0];
  const todaySales = sales.filter(sale => sale.date === today);

  return (
    <PageContainer title="Sales Management">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Record New Sale">
          <form onSubmit={handleSubmit}>
            <Select
              label="Product"
              name="productId"
              value={formData.productId}
              onChange={handleChange}
              required
              options={products.length > 0 ? products.map(product => ({
                value: product.id,
                label: `${product.name} - ${product.price.toFixed(2)} GHS`,
              })) : [{ value: '', label: 'No products available - add inventory first' }]}
            />
            
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="0"
            />
            
            {formData.productId && formData.quantity && (
              <div className="mt-4 p-3 bg-gray-800/30 rounded-lg">
                <p className="text-sm text-gray-300">
                  Total: {(
                    products.find(p => p.id === formData.productId)?.price || 0
                  ) * parseInt(formData.quantity || '0')} GHS
                </p>
              </div>
            )}
            
            <div className="mt-6 flex space-x-4">
              <Button type="submit">Record Sale</Button>
              <Button 
                type="button" 
                variant={isListening ? 'danger' : 'secondary'}
                onClick={isListening ? stopListening : startListening}
              >
                {isListening ? 'Stop Voice Input' : 'Start Voice Input'}
              </Button>
            </div>
            
            {isListening && (
              <div className="mt-4 p-3 bg-blue-900/30 text-blue-400 rounded-lg">
                Listening... Speak now.
              </div>
            )}
            
            {transcript && (
              <div className="mt-4 p-3 bg-slate-800/30 text-slate-300 rounded-lg">
                <p className="font-medium">Transcript:</p>
                <p>{transcript}</p>
              </div>
            )}
          </form>
        </Card>
        
        <Card title="Today's Sales">
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
                <tbody className="bg-transparent divide-y divide-gray-700/50">
                  {todaySales.map((sale) => {
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
                  })}
                </tbody>
                <tfoot className="bg-gray-800/30">
                  <tr>
                    <td colSpan={2} className="px-6 py-3 text-right text-sm font-medium text-gray-400">
                      Total Sales Today:
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-white">
                      {todaySales
                        .reduce((sum, sale) => sum + sale.amount, 0)
                        .toFixed(2)} GHS
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          ) : (
            <div className="py-8">
              <div className="text-center">
                <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-300">No sales recorded</h3>
                <p className="mt-1 text-sm text-gray-400">Start by recording your first sale.</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}