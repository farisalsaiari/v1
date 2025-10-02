import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../components/ui/Spinner';

const tabs = [
  { name: 'Profile', id: 'profile' },
  { name: 'Account', id: 'account' },
  { name: 'Notifications', id: 'notifications' },
  { name: 'Billing', id: 'billing' },
  { name: 'Team', id: 'team' },
  { name: 'Integrations', id: 'integrations' },
  { name: 'API', id: 'api' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type TabId = 'profile' | 'account' | 'notifications' | 'billing' | 'team' | 'integrations' | 'api';

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
}

const FormField = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  error = '',
  helpText = '',
}: FormFieldProps) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500">*</span>}
    </label>
    <div className="mt-1">
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={classNames(
          'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
          error ? 'border-red-300' : 'border-gray-300',
          disabled ? 'bg-gray-100' : ''
        )}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    {helpText && !error && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
  </div>
);

const ProfileTab = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    bio: 'Business owner and entrepreneur with a passion for e-commerce.',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Profile updated:', formData);
      setIsLoading(false);
      // Show success message
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <FormField
                id="firstName"
                label="First name"
                value={formData.firstName}
                onChange={(value) => handleChange('firstName', value)}
                required
              />
            </div>
            <div className="sm:col-span-3">
              <FormField
                id="lastName"
                label="Last name"
                value={formData.lastName}
                onChange={(value) => handleChange('lastName', value)}
                required
              />
            </div>
            <div className="sm:col-span-4">
              <FormField
                id="email"
                label="Email address"
                type="email"
                value={formData.email}
                onChange={(value) => handleChange('email', value)}
                required
              />
            </div>
            <div className="sm:col-span-4">
              <FormField
                id="phone"
                label="Phone number"
                type="tel"
                value={formData.phone}
                onChange={(value) => handleChange('phone', value)}
              />
            </div>
            <div className="sm:col-span-6">
              <FormField
                id="bio"
                label="About"
                value={formData.bio}
                onChange={(value) => handleChange('bio', value)}
                helpText="Brief description for your profile."
              />
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Saving...
              </>
            ) : 'Save'}
          </button>
        </div>
      </div>
    </form>
  );
};

const AccountTab = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Password changed');
      setIsLoading(false);
      setSuccess('Your password has been updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(''), 5000);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Change Password</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Update your account password.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {success && (
            <div className="rounded-md bg-green-50 p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{success}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <FormField
              id="currentPassword"
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
              required
            />
            <FormField
              id="newPassword"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              required
              helpText="Must be at least 8 characters long."
            />
            <FormField
              id="confirmPassword"
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading || !currentPassword || !newPassword || !confirmPassword}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Updating...
              </>
            ) : 'Update Password'}
          </button>
        </div>
      </div>
    </form>
  );
};

const NotificationsTab = () => {
  const [formData, setFormData] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
    securityAlerts: true,
    orderUpdates: true,
    newFeatures: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Notification settings updated:', formData);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Notification Preferences</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage how you receive notifications.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-8">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Email Notifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-500">Receive email notifications</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('email')}
                    className={`${
                      formData.email ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    role="switch"
                    aria-checked={formData.email}
                  >
                    <span className="sr-only">Email notifications</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        formData.email ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Marketing Emails</p>
                    <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('marketing')}
                    className={`${
                      formData.marketing ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    role="switch"
                    aria-checked={formData.marketing}
                  >
                    <span className="sr-only">Marketing emails</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        formData.marketing ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Security Alerts</p>
                    <p className="text-sm text-gray-500">Receive important security notifications</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('securityAlerts')}
                    className={`${
                      formData.securityAlerts ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    role="switch"
                    aria-checked={formData.securityAlerts}
                  >
                    <span className="sr-only">Security alerts</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        formData.securityAlerts ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">Push Notifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('push')}
                    className={`${
                      formData.push ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    role="switch"
                    aria-checked={formData.push}
                  >
                    <span className="sr-only">Push notifications</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        formData.push ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Order Updates</p>
                    <p className="text-sm text-gray-500">Get notified about order status changes</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('orderUpdates')}
                    className={`${
                      formData.orderUpdates ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    role="switch"
                    aria-checked={formData.orderUpdates}
                  >
                    <span className="sr-only">Order updates</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        formData.orderUpdates ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-4">SMS Notifications</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">SMS Alerts</p>
                    <p className="text-sm text-gray-500">Receive important alerts via SMS</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggle('sms')}
                    className={`${
                      formData.sms ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                    role="switch"
                    aria-checked={formData.sms}
                  >
                    <span className="sr-only">SMS notifications</span>
                    <span
                      aria-hidden="true"
                      className={`${
                        formData.sms ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner size="sm" className="mr-2" />
                Saving...
              </>
            ) : 'Save Preferences'}
          </button>
        </div>
      </div>
    </form>
  );
};

const BillingTab = () => {
  const [billingInfo, setBillingInfo] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/25',
    cardCvc: '•••',
    nameOnCard: 'John Doe',
    address: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94103',
    country: 'United States',
  });
  
  const [invoices, setInvoices] = useState([
    { id: 'INV-2023-001', date: '2023-10-15', amount: 99.99, status: 'Paid' },
    { id: 'INV-2023-002', date: '2023-09-15', amount: 99.99, status: 'Paid' },
    { id: 'INV-2023-003', date: '2023-08-15', amount: 99.99, status: 'Paid' },
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setBillingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Billing info updated:', billingInfo);
      setIsLoading(false);
      setIsEditing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Billing Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Manage your billing information and view invoices.
              </p>
            </div>
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Edit
              </button>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="px-4 py-5 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Payment Method</h4>
                </div>
                
                <div className="sm:col-span-6">
                  <FormField
                    id="cardNumber"
                    label="Card Number"
                    value={billingInfo.cardNumber}
                    onChange={(value) => handleInputChange('cardNumber', value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <FormField
                    id="cardExpiry"
                    label="Expiration Date"
                    value={billingInfo.cardExpiry}
                    onChange={(value) => handleInputChange('cardExpiry', value)}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <FormField
                    id="cardCvc"
                    label="CVC"
                    value={billingInfo.cardCvc}
                    onChange={(value) => handleInputChange('cardCvc', value)}
                    placeholder="CVC"
                    required
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <FormField
                    id="nameOnCard"
                    label="Name on Card"
                    value={billingInfo.nameOnCard}
                    onChange={(value) => handleInputChange('nameOnCard', value)}
                    required
                  />
                </div>
                
                <div className="sm:col-span-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Billing Address</h4>
                </div>
                
                <div className="sm:col-span-6">
                  <FormField
                    id="address"
                    label="Street Address"
                    value={billingInfo.address}
                    onChange={(value) => handleInputChange('address', value)}
                    required
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <FormField
                    id="city"
                    label="City"
                    value={billingInfo.city}
                    onChange={(value) => handleInputChange('city', value)}
                    required
                  />
                </div>
                
                <div className="sm:col-span-3">
                  <FormField
                    id="state"
                    label="State/Province"
                    value={billingInfo.state}
                    onChange={(value) => handleInputChange('state', value)}
                    required
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <FormField
                    id="zipCode"
                    label="ZIP / Postal Code"
                    value={billingInfo.zipCode}
                    onChange={(value) => handleInputChange('zipCode', value)}
                    required
                  />
                </div>
                
                <div className="sm:col-span-4">
                  <FormField
                    id="country"
                    label="Country"
                    value={billingInfo.country}
                    onChange={(value) => handleInputChange('country', value)}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner size="sm" className="mr-2" />
                    Saving...
                  </>
                ) : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h4>
                <div className="mt-1 text-sm text-gray-900">
                  <p>Visa ending in 4242</p>
                  <p className="text-gray-500">Expires {billingInfo.cardExpiry}</p>
                </div>
              </div>
              
              <div className="sm:col-span-6">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Billing Address</h4>
                <div className="mt-1 text-sm text-gray-900">
                  <p>{billingInfo.nameOnCard}</p>
                  <p>{billingInfo.address}</p>
                  <p>{billingInfo.city}, {billingInfo.state} {billingInfo.zipCode}</p>
                  <p>{billingInfo.country}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Invoices</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            View and download your previous invoices.
          </p>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invoice ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Download</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {invoice.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(invoice.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${invoice.amount.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  const [currentTab, setCurrentTab] = useState<TabId>('profile');
  const navigate = useNavigate();

  const renderTabContent = () => {
    switch (currentTab) {
      case 'profile':
        return <ProfileTab />;
      case 'account':
        return <AccountTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'billing':
        return <BillingTab />;
      case 'team':
      case 'integrations':
      case 'api':
      default:
        return (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <h3 className="mt-2 text-lg font-medium text-gray-900">Coming Soon</h3>
                <p className="mt-1 text-sm text-gray-500">
                  This section is under development and will be available soon.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Go back to dashboard
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={currentTab}
            onChange={(e) => setCurrentTab(e.target.value as TabId)}
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => setCurrentTab(tab.id as TabId)}
                  className={classNames(
                    tab.id === currentTab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                  )}
                  aria-current={tab.id === currentTab ? 'page' : undefined}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div>{renderTabContent()}</div>
    </div>
  );
}
