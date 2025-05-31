import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import useVoiceInput from '../hooks/useVoiceInput';
import { useData } from '../context/DataContext';

export default function InventoryPage() {
  const { products, addProduct } = useData();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    supplier: '',
  });

  const { isListening, transcript, startListening, stopListening } = useVoiceInput({
    onResult: (text) => {
      // Simple parsing logic - in a real app, this would be more sophisticated
      if (text.includes('product name')) {
        const nameMatch = text.match(/product name(.*?)(?:,|$)/);
        if (nameMatch && nameMatch[1]) setFormData(prev => ({ ...prev, name: nameMatch[1].trim() }));
      }
      
      if (text.includes('quantity')) {
        const quantityMatch = text.match(/quantity (\d+)/);
        if (quantityMatch && quantityMatch[1]) setFormData(prev => ({ ...prev, quantity: quantityMatch[1] }));
      }
      
      if (text.includes('price')) {
        const priceMatch = text.match(/price (\d+)/);
        if (priceMatch && priceMatch[1]) setFormData(prev => ({ ...prev, price: priceMatch[1] }));
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addProduct({
      name: formData.name,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      category: formData.supplier, // Using supplier as category
    });
    
    setFormData({ name: '', price: '', quantity: '', supplier: '' });
  };

  return (
    <PageContainer title="Inventory Management">
      <div className="grid md:grid-cols-2 gap-6">
        <Card title="Add New Product">
          <form onSubmit={handleSubmit}>
            <Input
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
            
            <Input
              label="Price (GHS)"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="0.00"
            />
            
            <Input
              label="Quantity"
              name="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={handleChange}
              required
              placeholder="0"
            />
            
            <Input
              label="Supplier"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Enter supplier name"
            />
            
            <div className="mt-6 flex space-x-4">
              <Button type="submit">Add Product</Button>
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
        
        <Card title="Current Inventory">
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700/50">
                <thead className="bg-gray-800/30">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent divide-y divide-gray-700/50">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{product.name}</div>
                        <div className="text-sm text-gray-400">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{product.price.toFixed(2)} GHS</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{product.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">
                          {(product.price * product.quantity).toFixed(2)} GHS
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-gray-800/30">
                  <tr>
                    <td colSpan={3} className="px-6 py-3 text-right text-sm font-medium text-gray-400">
                      Total Inventory Value:
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-white">
                      {products
                        .reduce((sum, product) => sum + product.price * product.quantity, 0)
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-300">No products in inventory</h3>
                <p className="mt-1 text-sm text-gray-400">Get started by adding your first product.</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </PageContainer>
  );
}