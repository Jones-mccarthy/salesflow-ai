import { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useData } from '../context/DataContext';

export default function DebtsPage() {
  const { debts, addCreditor, addDebtor } = useData();
  
  const [creditorForm, setCreditorForm] = useState({
    name: '',
    amount: '',
    dueDate: '',
  });
  
  const [debtorForm, setDebtorForm] = useState({
    name: '',
    amount: '',
    dueDate: '',
  });

  const handleCreditorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreditorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDebtorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDebtorForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreditorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addCreditor({
      name: creditorForm.name,
      amount: parseFloat(creditorForm.amount),
      dueDate: creditorForm.dueDate,
    });
    
    setCreditorForm({ name: '', amount: '', dueDate: '' });
  };

  const handleDebtorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addDebtor({
      name: debtorForm.name,
      amount: parseFloat(debtorForm.amount),
      dueDate: debtorForm.dueDate,
    });
    
    setDebtorForm({ name: '', amount: '', dueDate: '' });
  };

  return (
    <PageContainer title="Debt Management">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Creditors Section */}
        <div className="space-y-6">
          <Card title="What We Owe (Creditors)">
            <form onSubmit={handleCreditorSubmit}>
              <Input
                label="Supplier/Creditor Name"
                name="name"
                value={creditorForm.name}
                onChange={handleCreditorChange}
                required
                placeholder="Enter supplier name"
              />
              
              <Input
                label="Amount (GHS)"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                value={creditorForm.amount}
                onChange={handleCreditorChange}
                required
                placeholder="0.00"
              />
              
              <Input
                label="Due Date"
                name="dueDate"
                type="date"
                value={creditorForm.dueDate}
                onChange={handleCreditorChange}
                required
              />
              
              <div className="mt-6">
                <Button type="submit">Add Creditor</Button>
              </div>
            </form>
          </Card>
          
          <Card title="Creditors List">
            {debts.creditors.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700/50">
                  <thead className="bg-gray-800/30">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Supplier
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-transparent divide-y divide-gray-700/50">
                    {debts.creditors.map((creditor) => (
                      <tr key={creditor.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{creditor.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{creditor.amount.toFixed(2)} GHS</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{creditor.dueDate}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-800/30">
                    <tr>
                      <td colSpan={2} className="px-6 py-3 text-right text-sm font-medium text-gray-400">
                        Total Owed:
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-white">
                        {debts.creditors
                          .reduce((sum, creditor) => sum + creditor.amount, 0)
                          .toFixed(2)} GHS
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400">
                <p>No creditors added yet</p>
              </div>
            )}
          </Card>
        </div>
        
        {/* Debtors Section */}
        <div className="space-y-6">
          <Card title="What We Are Owed (Debtors)">
            <form onSubmit={handleDebtorSubmit}>
              <Input
                label="Customer/Debtor Name"
                name="name"
                value={debtorForm.name}
                onChange={handleDebtorChange}
                required
                placeholder="Enter customer name"
              />
              
              <Input
                label="Amount (GHS)"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                value={debtorForm.amount}
                onChange={handleDebtorChange}
                required
                placeholder="0.00"
              />
              
              <Input
                label="Due Date"
                name="dueDate"
                type="date"
                value={debtorForm.dueDate}
                onChange={handleDebtorChange}
                required
              />
              
              <div className="mt-6">
                <Button type="submit">Add Debtor</Button>
              </div>
            </form>
          </Card>
          
          <Card title="Debtors List">
            {debts.debtors.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700/50">
                  <thead className="bg-gray-800/30">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                        Due Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-transparent divide-y divide-gray-700/50">
                    {debts.debtors.map((debtor) => (
                      <tr key={debtor.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">{debtor.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{debtor.amount.toFixed(2)} GHS</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-300">{debtor.dueDate}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-800/30">
                    <tr>
                      <td colSpan={2} className="px-6 py-3 text-right text-sm font-medium text-gray-400">
                        Total Owing:
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-white">
                        {debts.debtors
                          .reduce((sum, debtor) => sum + debtor.amount, 0)
                          .toFixed(2)} GHS
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-400">
                <p>No debtors added yet</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}