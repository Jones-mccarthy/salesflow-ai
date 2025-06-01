import { useState } from 'react';
import PageContainer from '../../components/layout/PageContainer';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { useAuth } from '../../context/AuthContext';

export default function StaffManagementPage() {
  const { staffMembers, addStaffMember, updateStaffStatus, resetStaffPassword } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
  });
  
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [resetPasswordId, setResetPasswordId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addStaffMember({
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password,
      status: 'active',
    });
    
    setFormData({ name: '', email: '', role: '', password: '' });
    setIsAddingStaff(false);
    setSuccessMessage(`Staff member ${formData.name} has been added successfully.`);
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (resetPasswordId && newPassword) {
      resetStaffPassword(resetPasswordId, newPassword);
      setResetPasswordId(null);
      setNewPassword('');
      setSuccessMessage('Password has been reset successfully.');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
  };

  return (
    <PageContainer title="Staff Management">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Staff Members</h2>
        <Button onClick={() => setIsAddingStaff(true)}>Add New Staff</Button>
      </div>
      
      {successMessage && (
        <div className="mb-6 p-4 bg-green-900/30 border border-green-500/50 text-green-400 rounded-lg">
          {successMessage}
        </div>
      )}
      
      {isAddingStaff ? (
        <Card title="Add New Staff Member">
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter staff name"
            />
            
            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="staff@example.com"
            />
            
            <Input
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              placeholder="e.g. Sales Associate"
            />
            
            <Input
              label="Initial Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
            
            <div className="mt-6 flex space-x-4">
              <Button type="submit">Add Staff Member</Button>
              <Button type="button" variant="secondary" onClick={() => setIsAddingStaff(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : resetPasswordId ? (
        <Card title="Reset Password">
          <form onSubmit={handleResetPassword}>
            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
            />
            
            <div className="mt-6 flex space-x-4">
              <Button type="submit">Reset Password</Button>
              <Button type="button" variant="secondary" onClick={() => setResetPasswordId(null)}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700/50">
              <thead className="bg-slate-800/30">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {staffMembers.map((staff) => (
                  <tr key={String(staff.id)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">{String(staff.name)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300">{String(staff.email)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-300">{String(staff.role)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        String(staff.status) === 'active' 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-red-900/30 text-red-400'
                      }`}>
                        {String(staff.status) === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button 
                        onClick={() => updateStaffStatus(String(staff.id), String(staff.status) === 'active' ? 'inactive' : 'active')}
                        className={`mr-2 text-xs px-2 py-1 rounded ${
                          String(staff.status) === 'active'
                            ? 'bg-red-900/30 text-red-400 hover:bg-red-900/50'
                            : 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                        }`}
                      >
                        {String(staff.status) === 'active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => setResetPasswordId(String(staff.id))}
                        className="text-xs px-2 py-1 rounded bg-blue-900/30 text-blue-400 hover:bg-blue-900/50"
                      >
                        Reset Password
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </PageContainer>
  );
}