
import { Button } from '@v1/ui-shared'


export function Settings() {


    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            {/* <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6"> */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-6">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Settings</h2>
                    <p className="text-gray-600">Manage your account and system preferences.</p>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex">
                            <button
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                            >
                                General
                            </button>
                            <button
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                            >
                                Security
                            </button>
                            <button
                                className={`py-4 px-6 text-center border-b-2 font-medium text-sm 
                         'border-blue-500 text-blue-600'
                    }`}
                            >
                                Notifications
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">General Settings</h3>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Site Name
                                    </label>
                                    <input
                                        type="text"
                                        id="site-name"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        defaultValue="Company Dashboard"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="site-url" className="block text-sm font-medium text-gray-700 mb-1">
                                        Site URL
                                    </label>
                                    <input
                                        type="text"
                                        id="site-url"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                        defaultValue="https://company.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Timezone
                                    </label>
                                    <select
                                        id="timezone"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    >
                                        <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                                        <option>(GMT-05:00) Eastern Time (US & Canada)</option>
                                        <option>(GMT+00:00) London</option>
                                        <option>(GMT+01:00) Berlin</option>
                                        <option>(GMT+08:00) Beijing</option>
                                    </select>
                                </div>
                            </div>
                        </div>




                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        id="current-password"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="new-password"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="two-factor"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="two-factor" className="ml-2 block text-sm text-gray-900">
                                        Enable two-factor authentication
                                    </label>
                                </div>
                            </div>
                        </div>



                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Preferences</h3>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <input
                                        id="email-notifications"
                                        type="checkbox"
                                        defaultChecked
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="email-notifications" className="ml-2 block text-sm text-gray-900">
                                        Email notifications
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="push-notifications"
                                        type="checkbox"
                                        defaultChecked
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="push-notifications" className="ml-2 block text-sm text-gray-900">
                                        Push notifications
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        id="sms-notifications"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="sms-notifications" className="ml-2 block text-sm text-gray-900">
                                        SMS notifications
                                    </label>
                                </div>
                            </div>
                        </div>




                        <div className="mt-8 flex justify-end">
                            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                Cancel
                            </button>
                            <button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">

                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings