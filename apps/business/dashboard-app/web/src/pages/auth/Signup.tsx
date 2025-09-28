
import { useState, useEffect, useRef } from 'react';
import { Button } from '@v1/ui-shared';

export function Signup() {
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLocaleDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [locale, setLocale] = useState('US');
    const [isLocaleDropdownOpen, setIsLocaleDropdownOpen] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [termsError, setTermsError] = useState('');
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const [wasEmailTouched, setWasEmailTouched] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        if (!value) {
            setEmailError('Please enter your email');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setEmailError('The email address you entered does not appear to be valid.');
        } else {
            setEmailError('');
        }
    };

    const handleEmailBlur = () => {
        setWasEmailTouched(true);
        if (!email) {
            setEmailError('Please enter your email');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('The email address you entered does not appear to be valid.');
        }
    };

    const [wasPasswordTouched, setWasPasswordTouched] = useState(false);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);

        if (!value) {
            setPasswordError('Please enter a password');
        } else if (value.length < 4) {
            setPasswordError('Your password must be at least 4 characters');
        } else {
            setPasswordError('');
        }
    };



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setEmailError('');
        setPasswordError('');
        setTermsError('');

        let isValid = true;

        // Email validation
        if (!email) {
            setEmailError('Please enter your email or phone number');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('The email address you entered does not appear to be valid.');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Password validation
        if (!password) {
            setPasswordError('Please enter a password');
            isValid = false;
        } else if (password.length < 4) {
            setPasswordError('Your password must be at least 4 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!agreeToTerms) {
            setTermsError('Please agree to the terms and conditions');
            isValid = false;
        }

        if (!isValid) return;

        // Handle signup logic here
        console.log('Signup submitted');
    };

    return (
        <div className="min-h-screen w-full bg-white overflow-auto">
            {/* Header */}
            <header className="w-full p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="sq-logo-wrapper">
                        <svg width="88" height="22" viewBox="0 0 88 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.3236 6.66478e-09H3.67618C3.19341 -2.90435e-05 2.71536 0.0950383 2.26933 0.279773C1.8233 0.464508 1.41803 0.735292 1.07666 1.07666C0.735292 1.41803 0.464508 1.8233 0.279773 2.26933C0.0950383 2.71536 -2.90435e-05 3.19341 6.65575e-09 3.67618L6.65575e-09 18.3232C-9.22306e-09 19.2982 0.387289 20.2333 1.07669 20.9228C1.76609 21.6124 2.70113 21.9998 3.67618 22H18.3236C19.2987 21.9999 20.2339 21.6125 20.9234 20.9229C21.6129 20.2334 22.0003 19.2983 22.0004 18.3232V3.67618C22.0003 2.70112 21.6129 1.76603 20.9233 1.07662C20.2338 0.387212 19.2987 -5.86613e-05 18.3236 6.66478e-09ZM18.0002 16.8401C18.0002 17.1478 17.878 17.443 17.6604 17.6607C17.4428 17.8783 17.1476 18.0006 16.8399 18.0007H5.16103C5.00865 18.0006 4.85776 17.9706 4.71699 17.9123C4.57622 17.8539 4.44832 17.7684 4.34059 17.6606C4.23286 17.5529 4.14741 17.4249 4.08913 17.2841C4.03084 17.1434 4.00086 16.9925 4.00088 16.8401V5.16125C4.00086 5.00888 4.03084 4.85799 4.08913 4.71721C4.14742 4.57643 4.23287 4.44851 4.3406 4.34076C4.44834 4.23301 4.57624 4.14753 4.71701 4.08922C4.85778 4.0309 5.00866 4.00088 5.16103 4.00088H16.8399C17.1476 4.00088 17.4427 4.12314 17.6604 4.34075C17.878 4.55836 18.0002 4.8535 18.0002 5.16125V16.8401Z" fill="#1A1A1A"></path>
                            <path d="M27.8328 13.6673H30.2349C30.355 15.0285 31.2758 16.0894 33.1374 16.0894C34.7987 16.0894 35.8197 15.2687 35.8197 14.0276C35.8197 12.8666 35.019 12.3466 33.5777 12.006L31.7162 11.6056C29.6945 11.1652 28.1732 9.86507 28.1732 7.74165C28.1732 5.39969 30.2548 3.79827 32.9571 3.79827C35.8197 3.79827 37.6611 5.29949 37.8213 7.52157H35.4988C35.2192 6.48087 34.3583 5.86154 32.9573 5.86154C31.4753 5.86154 30.4552 6.66224 30.4552 7.68326C30.4552 8.70427 31.336 9.32449 32.8573 9.6649L34.699 10.0653C36.7206 10.5056 38.1017 11.7266 38.1017 13.8684C38.1017 16.5908 36.0599 18.2121 33.1376 18.2121C29.8545 18.2112 28.033 16.4298 27.8328 13.6673Z" fill="#1A1A1A"></path>
                            <path d="M46.695 22V18.0148L46.852 16.2674H46.695C46.1453 17.5238 44.9869 18.211 43.4165 18.211C40.8841 18.211 38.9993 16.1497 38.9993 12.9889C38.9993 9.82813 40.8841 7.76687 43.4165 7.76687C44.9675 7.76687 46.0668 8.49325 46.695 9.63194H46.852V7.96284H48.933V22H46.695ZM46.7735 12.9892C46.7735 10.967 45.5368 9.78921 44.025 9.78921C42.5132 9.78921 41.2767 10.967 41.2767 12.9892C41.2767 15.0113 42.5127 16.1891 44.025 16.1891C45.5373 16.1891 46.7735 15.0113 46.7735 12.9892Z" fill="#1A1A1A"></path>
                            <path d="M50.5954 14.0288V7.96284H52.8334V13.8332C52.8334 15.4236 53.599 16.1891 54.875 16.1891C56.4455 16.1891 57.4665 15.0701 57.4665 13.3229V7.96284H59.7045V18.0148H57.6235V15.9339H57.4665C56.9757 17.269 55.896 18.2121 54.2274 18.2121C51.8321 18.2112 50.5954 16.6799 50.5954 14.0296V14.0288Z" fill="#1A1A1A"></path>
                            <path d="M61.0692 15.2066C61.0692 13.3221 62.3846 12.2227 64.7209 12.0852L67.4888 11.9082V11.123C67.4888 10.1807 66.8018 9.61137 65.5846 9.61137C64.4656 9.61137 63.798 10.1807 63.6213 10.9856H61.3833C61.6189 8.94382 63.3077 7.76598 65.5846 7.76598C68.1564 7.76598 69.7268 8.8653 69.7268 10.9856V18.0148H67.6459V16.15H67.4888C67.0177 17.3866 66.036 18.2112 64.1515 18.2112C62.3453 18.2112 61.0692 16.994 61.0692 15.2075V15.2066ZM67.4888 13.9699V13.4391L65.2311 13.5961C64.0146 13.6746 63.4643 14.127 63.4643 15.0294C63.4643 15.795 64.0927 16.3446 64.9761 16.3446C66.5662 16.3459 67.4888 15.3254 67.4888 13.9708V13.9699Z" fill="#1A1A1A"></path>
                            <path d="M71.3935 18.0148V7.96284H73.4744V9.88719H73.6315C73.9261 8.57178 74.9272 7.96284 76.4185 7.96284H77.4393V9.98474H76.1632C74.7105 9.98474 73.6306 10.9272 73.6306 12.7136V18.0148H71.3935Z" fill="#1A1A1A"></path>
                            <path d="M87.6826 13.4015H80.0458C80.1637 15.2468 81.4594 16.2873 82.8925 16.2873C84.109 16.2873 84.8752 15.7965 85.3072 14.9719H87.5249C86.9164 17.0137 85.1298 18.2112 82.8721 18.2112C79.9082 18.2112 77.8268 15.9929 77.8268 12.9892C77.8268 9.9854 79.9666 7.76709 82.8921 7.76709C85.8368 7.76709 87.7607 9.78921 87.7607 12.3015C87.7611 12.7927 87.722 13.048 87.6826 13.4015ZM85.5428 11.8505C85.4643 10.457 84.3059 9.51427 82.8925 9.51427C81.5576 9.51427 80.4386 10.3585 80.1637 11.8505H85.5428Z" fill="#1A1A1A"></path>
                        </svg>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="w-full flex justify-center px-4 py-8 sm:px-6 lg:px-8 min-h-0">
                <div className="max-w-md w-full  py-4">
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">Let's create your account</h1>
                    <p className="text-gray-600 mb- text-[15px] mb-6">
                        Signing up for Square is fast and free—no commitments or long-term contracts.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Email/Phone Input */}
                        <div className="relative">
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => {
                                    setIsEmailFocused(false);
                                    handleEmailBlur();
                                }}
                                className={`w-full h-[60px] pt-5 px-4 pb-1 border-2 ${emailError
                                    ? 'border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500 focus:border-2'
                                    : 'border-gray-200 focus:border-2 focus:border-[#1e73ff] focus:ring-0 focus:ring-inset focus:ring-[#1e73ff] focus:ring-opacity-20'} 
                                    rounded-md outline-none box-border`}
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${isEmailFocused || email
                                    ? 'text-[11px] text-gray-700 top-1.5 font-light'
                                    : 'text-gray-500/90 top-5 text-[14px] font-light'}`}
                            >
                                Email or phone number
                            </label>
                            {emailError && (
                                <div className="flex items-center mt-1 text-red-600 text-sm">
                                    <div className="w-4 h-4 rounded-full border border-red-500 mr-1 flex items-center justify-center">
                                        <span className="text-red-500 text-xs font-bold">!</span>
                                    </div>
                                    {emailError}
                                </div>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                onFocus={() => setIsPasswordFocused(true)}
                                onBlur={() => {
                                    setIsPasswordFocused(false);
                                }}
                                className={`w-full h-[60px] pt-5 px-4 pb-1 border-2 ${passwordError
                                    ? 'border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500 focus:border-2'
                                    : 'border-gray-200 focus:border-2 focus:border-[#1e73ff] focus:ring-0 focus:ring-inset focus:ring-[#1e73ff] focus:ring-opacity-20'} 
                                    rounded-md outline-none box-border`}
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-4 transition-all duration-200 pointer-events-none ${isPasswordFocused || password
                                    ? 'text-[11px] text-gray-700 top-1.5 font-light'
                                    : 'text-gray-500/90 top-5 text-[14px] font-light'}`}
                            >
                                Password
                            </label>
                            {passwordError && (
                                <div className="flex items-center mt-1 text-red-600 text-sm">
                                    <div className="w-4 h-4 rounded-full border border-red-500 mr-1 flex items-center justify-center">
                                        <span className="text-red-500 text-xs font-bold">!</span>
                                    </div>
                                    {passwordError}
                                </div>
                            )}
                        </div>

                        {/* Locale Selector */}
                        <div className="relative" ref={dropdownRef}>
                            <div
                                className="relative cursor-pointer"
                                onClick={() => setIsLocaleDropdownOpen(!isLocaleDropdownOpen)}
                            >
                                <div className="w-full h-[60px] pt-5 px-4 pb-1 border-2 border-gray-200 rounded-md outline-none box-border bg-white flex items-center">
                                    <div className="flex-1">
                                        <div className="text-sm text-gray-900">
                                            {locale === 'US' ? 'United States (English)' : 'Saudi Arabia (Arabic)'}
                                        </div>
                                    </div>
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <svg
                                            className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${isLocaleDropdownOpen ? 'transform rotate-180' : ''}`}
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <label className="absolute left-4 text-[11px] text-gray-700 top-1.5 font-light pointer-events-none">
                                    Language/Region
                                </label>
                            </div>

                            {/* Custom Dropdown Menu */}
                            {isLocaleDropdownOpen && (
                                <div className="px-3 py-3 absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200">
                                    <div
                                        className={`rounded-md px-4 py-4 text-sm text-gray-900 cursor-pointer flex items-center ${locale === 'US' ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLocale('US');
                                            setIsLocaleDropdownOpen(false);
                                        }}
                                    >
                                        <span className={`flex-1 ${locale === 'US' ? 'font-medium' : ''}`}>United States (English)</span>
                                        {locale === 'US' && (
                                            <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <div className="border-t border-gray-200 my-1"></div>
                                    <div
                                        className={`rounded-md px-4 py-4 text-sm text-gray-900 cursor-pointer flex items-center ${locale === 'SA' ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLocale('SA');
                                            setIsLocaleDropdownOpen(false);
                                        }}
                                    >
                                        <span className={`flex-1 ${locale === 'SA' ? 'font-medium' : ''}`}>Saudi Arabia (Arabic)</span>
                                        {locale === 'SA' && (
                                            <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Terms Checkbox */}
                        <div className="space-y-2">
                            <div className="flex items-start">
                                <div className="py-1 pb-0 relative flex items-start">
                                    <div className="flex items-center h-5 relative">
                                        <input
                                            type="checkbox"
                                            id="terms"
                                            checked={agreeToTerms}
                                            onChange={(e) => {
                                                setAgreeToTerms(e.target.checked);
                                                if (termsError) setTermsError('');
                                            }}
                                            className="absolute inset-0 h-5 w-5 opacity-0 z-10 cursor-pointer"
                                        />
                                        <div className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${termsError ? 'border-red-500' : 'border-gray-300'} ${agreeToTerms ? 'bg-blue-600 border-blue-600' : 'bg-white'}`}>
                                            {agreeToTerms && (
                                                <svg className="w-3 h-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700 cursor-pointer">
                                        I agree to the <a href="#" className="text-blue-600 hover:text-blue-500 underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:text-blue-500 underline ">Privacy Policy</a>
                                    </label>
                                </div>
                            </div>
                            {termsError && (
                                <div className="flex items-center text-red-600 text-sm">
                                    <div className="w-4 h-4 rounded-full border border-red-500 mr-1 flex items-center justify-center flex-shrink-0">
                                        <span className="text-red-500 text-xs font-bold">!</span>
                                    </div>
                                    <span>{termsError}</span>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="h-[53px] w-full justify-center py-3 px-4 border border-transparent rounded-md  text-[16px] font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none "
                        >
                            Create Account
                        </Button>
                    </form>

                    {/* Sign In Link */}
                    <div className="mt-4 text-sm">
                        <p className="text-gray-600 font-medium ">
                            Already have a Square account?{' '}
                            <a href="/login" className="font-semibold text-blue-600 hover:text-blue-500">
                                Sign in
                            </a>
                        </p>
                    </div>

                    {/* Recaptcha Notice */}
                    <p className="mt-10 text-[13px] text-gray-500 ">
                        This site is protected by reCAPTCHA Enterprise and the Google{' '}
                        <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and{' '}
                        <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> apply.
                    </p>
                </div>
            </div>

            {/* Footer */}
            {/* <footer className="bg-white py-4 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} Square. All rights reserved.
                    </p>
                </div>
                <div className="text-center text-sm text-gray-500 mt-2">
                    <p>Join the 4 million+ businesses running with Square.</p>
                </div>
            </footer> */}
        </div>
    );
}

export default Signup