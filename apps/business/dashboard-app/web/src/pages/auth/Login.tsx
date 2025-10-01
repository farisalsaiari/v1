import { useNetworkStatus } from '../../contexts/NetworkStatusContext';
import { Link } from 'react-router-dom';
import { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@v1/ui-shared';
import { SpinnerLoader } from '../../components/loaders/SpinnerLoader';
export function Login() {

    const { isOnline } = useNetworkStatus();
    // UI State
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [showPasskey, setShowPasskey] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordScreen, setShowPasswordScreen] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    // Form State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Forgot Password State
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordError, setForgotPasswordError] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Error State
    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isForgotEmailFocused, setIsForgotEmailFocused] = useState(false);

    // Navigation
    const navigate = useNavigate();

    const validateEmailOrPhone = (value: string): boolean => {
        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Phone validation regex (supports international format with optional +)
        const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

        return emailRegex.test(value) || phoneRegex.test(value);
    };

    const handleSignIn = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (isSubmitting) return;

        // Clear previous errors
        setPasswordError('');

        if (!password) {
            setPasswordError('Please enter your password');
            return;
        }

        try {
            setIsSubmitting(true);
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 400));

            if (password === '111') {
                // Handle successful sign in
                console.log('Sign in successful');
                // Redirect to dashboard or home page
                navigate('/');
            } else {
                // Show error with minimal delay
                await new Promise(resolve => setTimeout(resolve, 100));
                setPasswordError('Incorrect password. Please try again.');
            }
        } catch (err) {
            setPasswordError('An error occurred. Please try again.');
            console.error('Sign in error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };
    // Form state is now declared above

    // Simulate initial loading
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 800); // Match this with your actual auth check

        return () => clearTimeout(timer);
    }, []);

    // Show full page loader while loading
    if (isPageLoading) {
        return <SpinnerLoader />;
    }

    return (
        <div className="min-h-screen flex flex-col w-full bg-white">
            {/* Header Section */}

            <header className="w-full p-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="sq-logo-wrapper">
                        <svg width="88" height="22" viewBox="0 0 88 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.3236 6.66478e-09H3.67618C3.19341 -2.90435e-05 2.71536 0.0950383 2.26933 0.279773C1.8233 0.464508 1.41803 0.735292 1.07666 1.07666C0.735292 1.41803 0.464508 1.8233 0.279773 2.26933C0.0950383 2.71536 -2.90435e-05 3.19341 6.65575e-09 3.67618L6.65575e-09 18.3232C-9.22306e-09 19.2982 0.387289 20.2333 1.07669 20.9228C1.76609 21.6124 2.70113 21.9998 3.67618 22H18.3236C19.2987 21.9999 20.2339 21.6125 20.9234 20.9229C21.6129 20.2334 22.0003 19.2983 22.0004 18.3232V3.67618C22.0003 2.70112 21.6129 1.76603 20.9233 1.07662C20.2338 0.387212 19.2987 -5.86613e-05 18.3236 6.66478e-09ZM18.0002 16.8401C18.0002 17.1478 17.878 17.443 17.6604 17.6607C17.4428 17.8783 17.1476 18.0006 16.8399 18.0007H5.16103C5.00865 18.0006 4.85776 17.9706 4.71699 17.9123C4.57622 17.8539 4.44832 17.7684 4.34059 17.6606C4.23286 17.5529 4.14741 17.4249 4.08913 17.2841C4.03084 17.1434 4.00086 16.9925 4.00088 16.8401V5.16125C4.00086 5.00888 4.03084 4.85799 4.08913 4.71721C4.14742 4.57643 4.23287 4.44851 4.3406 4.34076C4.44834 4.23301 4.57624 4.14753 4.71701 4.08922C4.85778 4.0309 5.00866 4.00088 5.16103 4.00088H16.8399C17.1476 4.00088 17.4427 4.12314 17.6604 4.34075C17.878 4.55836 18.0002 4.8535 18.0002 5.16125V16.8401ZM8.666 13.9854C8.57827 13.9853 8.49142 13.9679 8.41043 13.9342C8.32945 13.9004 8.25593 13.851 8.19408 13.7888C8.13224 13.7266 8.0833 13.6527 8.05007 13.5715C8.01684 13.4903 7.99998 13.4034 8.00044 13.3156V8.65472C8 8.567 8.01689 8.48005 8.05013 8.39887C8.08337 8.31769 8.13232 8.24387 8.19415 8.18164C8.25599 8.11942 8.3295 8.07001 8.41047 8.03626C8.49144 8.00251 8.57828 7.98507 8.666 7.98496H13.3349C13.4227 7.98505 13.5095 8.00245 13.5906 8.03618C13.6716 8.06991 13.7452 8.1193 13.8071 8.18152C13.869 8.24374 13.918 8.31757 13.9514 8.39877C13.9847 8.47997 14.0017 8.56695 14.0013 8.65472V13.3156C14.0016 13.4033 13.9846 13.4901 13.9513 13.5712C13.9179 13.6522 13.869 13.7259 13.8072 13.788C13.7454 13.8501 13.6719 13.8995 13.591 13.9332C13.5101 13.9669 13.4234 13.9843 13.3358 13.9845L8.666 13.9854ZM27.8328 13.6673H30.2349C30.355 15.0285 31.2758 16.0894 33.1374 16.0894C34.7987 16.0894 35.8197 15.2687 35.8197 14.0276C35.8197 12.8666 35.019 12.3466 33.5777 12.006L31.7162 11.6056C29.6945 11.1652 28.1732 9.86507 28.1732 7.74165C28.1732 5.39969 30.2548 3.79827 32.9571 3.79827C35.8197 3.79827 37.6611 5.29949 37.8213 7.52157H35.4988C35.2192 6.48087 34.3583 5.86154 32.9573 5.86154C31.4753 5.86154 30.4552 6.66224 30.4552 7.68326C30.4552 8.70427 31.336 9.32449 32.8573 9.6649L34.699 10.0653C36.7206 10.5056 38.1017 11.7266 38.1017 13.8684C38.1017 16.5908 36.0599 18.2121 33.1376 18.2121C29.8545 18.2112 28.033 16.4298 27.8328 13.6673ZM46.695 22V18.0148L46.852 16.2674H46.695C46.1453 17.5238 44.9869 18.211 43.4165 18.211C40.8841 18.211 38.9993 16.1497 38.9993 12.9889C38.9993 9.82813 40.8841 7.76687 43.4165 7.76687C44.9675 7.76687 46.0668 8.49325 46.695 9.63194H46.852V7.96284H48.933V22H46.695ZM46.7735 12.9892C46.7735 10.967 45.5368 9.78921 44.025 9.78921C42.5132 9.78921 41.2767 10.967 41.2767 12.9892C41.2767 15.0113 42.5127 16.1891 44.025 16.1891C45.5373 16.1891 46.7735 15.0113 46.7735 12.9892ZM50.5954 14.0288V7.96284H52.8334V13.8332C52.8334 15.4236 53.599 16.1891 54.875 16.1891C56.4455 16.1891 57.4665 15.0701 57.4665 13.3229V7.96284H59.7045V18.0148H57.6235V15.9339H57.4665C56.9757 17.269 55.896 18.2121 54.2274 18.2121C51.8321 18.2112 50.5954 16.6799 50.5954 14.0296V14.0288ZM61.0692 15.2066C61.0692 13.3221 62.3846 12.2227 64.7209 12.0852L67.4888 11.9082V11.123C67.4888 10.1807 66.8018 9.61137 65.5846 9.61137C64.4656 9.61137 63.798 10.1807 63.6213 10.9856H61.3833C61.6189 8.94382 63.3077 7.76598 65.5846 7.76598C68.1564 7.76598 69.7268 8.8653 69.7268 10.9856V18.0148H67.6459V16.15H67.4888C67.0177 17.3866 66.036 18.2112 64.1515 18.2112C62.3453 18.2112 61.0692 16.994 61.0692 15.2075V15.2066ZM67.4888 13.9699V13.4391L65.2311 13.5961C64.0146 13.6746 63.4643 14.127 63.4643 15.0294C63.4643 15.795 64.0927 16.3446 64.9761 16.3446C66.5662 16.3459 67.4888 15.3254 67.4888 13.9708V13.9699ZM71.3935 18.0148V7.96284H73.4744V9.88719H73.6315C73.9261 8.57178 74.9272 7.96284 76.4185 7.96284H77.4393V9.98474H76.1632C74.7105 9.98474 73.6306 10.9272 73.6306 12.7136V18.0148H71.3935ZM87.6826 13.4015H80.0458C80.1637 15.2468 81.4594 16.2873 82.8925 16.2873C84.109 16.2873 84.8752 15.7965 85.3072 14.9719H87.5249C86.9164 17.0137 85.1298 18.2112 82.8721 18.2112C79.9082 18.2112 77.8268 15.9929 77.8268 12.9892C77.8268 9.9854 79.9666 7.76709 82.8921 7.76709C85.8368 7.76709 87.7607 9.78921 87.7607 12.3015C87.7611 12.7927 87.722 13.048 87.6826 13.4015ZM85.5428 11.8505C85.4643 10.457 84.3059 9.51427 82.8925 9.51427C81.5576 9.51427 80.4386 10.3585 80.1637 11.8505H85.5428Z" fill="#1A1A1A"></path>
                        </svg>
                    </div>
                    {!showPasswordScreen && !showPasskey && (
                        <a href="http://localhost:3008/help" target="_blank" className="text-blue-600 font-semibold text-[16px]">Learn more</a>
                    )}
                </div>
            </header>



            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center px-6 pb-6 mb-6 md:px-6">
                <div className="w-full max-w-xl">
                    {!showPasskey && !showPasswordScreen && !showForgotPassword ? (
                        <>
                            <div className="mb-4">
                                <h1 className="text-[24px] font-semibold text-gray-900">Sign in</h1>
                                <div className="mt-3 gap-2 flex">
                                    <span className="text-gray-600 text-[15px] ">New to Square? </span>
                                    <a href="/signup" className='text-[15px] text-blue-600 font-medium'>Signup</a>
                                </div>
                            </div>

                            <form className="space-y-4" onSubmit={async (e: FormEvent) => {
                                e.preventDefault();

                                if (isSubmitting) return;

                                // Basic validation
                                if (!email) {
                                    setError('Please enter your email or phone number');
                                    return;
                                }

                                if (email !== '1234') {
                                    setError('Enter a valid email address or phone number.');
                                    return;
                                }

                                try {
                                    setIsSubmitting(true);
                                    // Simulate API call with shorter delay
                                    await new Promise(resolve => setTimeout(resolve, 400));
                                    setShowPasswordScreen(true);
                                    setError('');
                                } catch (err) {
                                    setError('An error occurred. Please try again.');
                                    console.error('Login error:', err);
                                } finally {
                                    setIsSubmitting(false);
                                }
                            }}>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (e.target.value === '1234') setError('');
                                        }}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        className={`w-full h-[60px] pt-5 px-4 pb-1 border-2 border-gray-200 rounded-md outline-none box-border ${error
                                            ? 'border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500 focus:border-2'
                                            : 'focus:border-2 focus:border-[#1e73ff] focus:ring-0 focus:ring-inset focus:ring-[#1e73ff] focus:ring-opacity-20'
                                            }`}
                                    />
                                    <label
                                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${isFocused || email
                                            ? 'text-[11px] text-gray-700 top-1.5 font-light'
                                            : 'text-gray-500/90 top-5 text-[14px] font-light'
                                            } ${error && !isFocused && !email ? 'text-red-500' : ''}`}
                                    >
                                        Email or phone number
                                    </label>
                                    {error && (
                                        <div className="flex items-center mt-1 text-red-500 text-sm">
                                            <div className="w-4 h-4 rounded-full border border-red-500 mr-1 flex items-center justify-center">
                                                <span className="text-red-500 text-xs font-bold">!</span>
                                            </div>
                                            {error}
                                        </div>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className={`h-[53px] w-full text-[16px] font-semibold rounded-md flex items-center justify-center ${error
                                        ? 'bg-gray-200 text-gray-700'
                                        : 'bg-[#1e73ff] text-white hover:bg-[#1e73ff]/80'
                                        } ${isSubmitting ? 'opacity-90' : ''}`}
                                    disabled={isSubmitting || !!error}>
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </div>
                                    ) : 'Continue'}
                                </button>
                            </form>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 border-opacity-70"></div>
                                </div>
                                <div className="relative flex justify-center text-[16px]">
                                    <span className="px-2 text-[15px] bg-white text-gray-600">or</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Button
                                    variant="secondary"
                                    size='lg'
                                    className="h-[53px] gap-2 w-full py-3 text-[18px] font-semibold"
                                    onClick={() => setShowPasskey(true)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="market-icon-" role="img"><path d="M10.5 12a4.5 4.5 0 100-9 4.5 4.5 0 000 9zM22.5 12a3.5 3.5 0 10-5 3.15v5.35L19 22l2.5-2.5L20 18l1.5-1.5-1.24-1.24A3.5 3.5 0 0022.5 12zM19 12a1 1 0 110-2 1 1 0 010 2zM14.44 14.02A6 6 0 0012 13.5H9a6 6 0 00-6 6v2h13v-5.51a5.16 5.16 0 01-1.56-1.97z" fill="#000"></path></svg>
                                    Sign in with a passkey
                                </Button>
                            </div>
                        </>
                    ) : showPasswordScreen && !showPasskey ? (
                        <div className="space-y-4">
                            <div className="mb-4">
                                <h1 className="text-[25px] font-semibold text-gray-900">Welcome back.</h1>
                                <div className="mt-2 text-[16px] gap-2 flex">
                                    <span className="text-gray-900 text-[16px] font-semibold">heemeeh@hotmail.com </span>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowPasswordScreen(false);
                                            setShowPassword(false);
                                            setPassword('');
                                            setPasswordError('');
                                            setIsPasswordFocused(false);
                                        }}
                                        className="text-[var(--primary)] text-[14px] font-medium ">
                                        Change
                                    </button>
                                </div>
                            </div>



                            {/* Network Status Indicator */}
                            {!isOnline && (
                                <div className="rounded-md bg-red-50 p-4">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-red-800">
                                                You are currently offline
                                            </h3>
                                            <div className="mt-2 text-sm text-red-700">
                                                <p>Please check your internet connection and try again.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSignIn} className="space-y-2">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onKeyDown={(e) => {
                                            // Handle Enter key press
                                            if (e.key === 'Enter' && password && !isSubmitting) {
                                                e.preventDefault();
                                                handleSignIn(e);
                                            }
                                        }}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setPassword(value);
                                            // Clear any existing error when user types
                                            if (passwordError) {
                                                setPasswordError('');
                                            }
                                        }}
                                        onFocus={() => setIsPasswordFocused(true)}
                                        onBlur={() => setIsPasswordFocused(false)}

                                        className={`w-full h-[60px] pt-5 px-4 pb-1 border-2 border-gray-200 rounded-md outline-none box-border ${passwordError
                                            ? 'border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500 focus:border-2'
                                            : 'focus:border-2 focus:border-[#1e73ff] focus:ring-0 focus:ring-inset focus:ring-[#1e73ff] focus:ring-opacity-20'
                                            } ${!password && !isPasswordFocused ? 'py-4' : 'pt-5 pb-3'}`}
                                    />
                                    <label
                                        className={`absolute left-4 transition-all duration-200 pointer-events-none ${isPasswordFocused || password
                                            ? 'text-[11px] text-gray-500 top-1.5 font-light'
                                            : 'text-gray-400/90 top-1/2 -translate-y-1/2 text-[15px] font-light'
                                            } ${passwordError && !isPasswordFocused && !password ? 'text-red-500' : ''}`}>
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setShowPassword(!showPassword);
                                        }}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {passwordError && (
                                    <div className="flex items-center mt-0 text-red-500 text-sm">
                                        <div className="w-4 h-4 rounded-full border border-red-500 mr-1 flex items-center justify-center">
                                            <span className="text-red-500 text-[xs] font-bold">!</span>
                                        </div>
                                        {passwordError}
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPasswordScreen(false);
                                        setShowForgotPassword(true);
                                        // Pre-fill the forgot password email with the current email
                                        setForgotPasswordEmail(email);
                                    }}
                                    className="block text-right pt-2 text-[var(--primary)] text-[15px] font-semibold ">
                                    Forgot password?
                                </button>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        variant={passwordError || !password || isSubmitting ? 'gray' : 'primary'}
                                        size='lg'
                                        className={`h-[53px] w-full py-3 text-[18px] font-semibold transition-colors ${(passwordError || !password || isSubmitting)
                                            ? 'opacity-90 text-gray-700'
                                            : 'hover:opacity-95'
                                            } ${isSubmitting ? 'cursor-wait' : !password || passwordError ? 'cursor-not-allowed' : ''}`}
                                        disabled={!!passwordError || !password || isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <div className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>

                                            </div>
                                        ) : 'Sign in'}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    ) : showForgotPassword ? (
                        <div className="space-y-4">
                            {!showSuccess && (
                                <>
                                    <div className="mb-1">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowForgotPassword(false);
                                                setShowPasswordScreen(true);
                                                setForgotPasswordError('');
                                                setIsSending(false);
                                            }}
                                            className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none mb-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            <span>Back</span>
                                        </button>
                                    </div>
                                    <div className="mb-6">
                                        <h1 className="text-[25px] font-semibold text-gray-900">Reset your password</h1>
                                        <p className="mt-2 text-gray-600">
                                            Enter the email address or phone number you used to register with.
                                        </p>
                                    </div>
                                </>
                            )}

                            {showSuccess ? (
                                <div className="py-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-green-100">
                                            <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <span className="text-green-600 font-medium">Sent to your email</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your inbox</h2>
                                    <div className="text-gray-600 space-y-4">
                                        <p>
                                            If you have an account then a link was sent to{' '}
                                            <span className="text-blue-600 font-medium">{forgotPasswordEmail || email}</span>{' '}
                                            to reset your password. If you don't see it in your inbox, remember to check your spam folder.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // Handle resend email logic here
                                                console.log('Resend email clicked');
                                            }}
                                            className="text-blue-600 font-medium hover:underline"
                                        >
                                            Still don't see the email?
                                        </button>
                                    </div>
                                    <div className="mt-8">
                                        <Button
                                            type="button"
                                            variant="bordered"
                                            size="lg"
                                            onClick={() => {
                                                setShowForgotPassword(false);
                                                setShowPasswordScreen(false);
                                                setShowSuccess(false);
                                                setResetSent(false);
                                                setForgotPasswordError('');
                                                setForgotPasswordEmail('');
                                                setEmail('');
                                            }}
                                            className="w-auto px-6 py-2.5 text-base font-medium"
                                        >
                                            Back to login
                                        </Button>
                                    </div>
                                </div>
                            ) : !resetSent ? (
                                <form onSubmit={async (e) => {
                                    e.preventDefault();
                                    if (isSending) return;

                                    // If email is empty but we have the email from login, use that
                                    if (!forgotPasswordEmail && email) {
                                        setForgotPasswordEmail(email);
                                    }

                                    if (!forgotPasswordEmail) {
                                        setForgotPasswordError('Please enter your email or phone number');
                                        return;
                                    }

                                    if (!validateEmailOrPhone(forgotPasswordEmail)) {
                                        setForgotPasswordError('Please enter a valid email address or phone number');
                                        return;
                                    }

                                    try {
                                        setIsSending(true);
                                        // Simulate API call
                                        await new Promise(resolve => setTimeout(resolve, 400));
                                        setResetSent(true);
                                        setShowSuccess(true);
                                        setForgotPasswordError('');
                                    } catch (err) {
                                        setForgotPasswordError('An error occurred. Please try again.');
                                        setShowSuccess(false);
                                    } finally {
                                        setIsSending(false);
                                    }
                                }} className="space-y-2">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={forgotPasswordEmail}
                                            onChange={(e) => {
                                                setForgotPasswordEmail(e.target.value);
                                                if (forgotPasswordError) setForgotPasswordError('');
                                            }}
                                            onFocus={() => setIsForgotEmailFocused(true)}
                                            onBlur={() => setIsForgotEmailFocused(false)}
                                            className={`w-full h-[60px] pt-5 px-4 pb-1 border-2 border-gray-200 rounded-md outline-none box-border ${forgotPasswordError
                                                ? 'border-red-500 focus:ring-2 focus:ring-red-200 focus:border-red-500 focus:border-2'
                                                : 'border-gray-300 focus:border-2 focus:border-[#1e73ff] focus:ring-0 focus:ring-inset focus:ring-[#1e73ff] focus:ring-opacity-20'}`}
                                        />
                                        <label
                                            className={`absolute left-4 transition-all duration-200 pointer-events-none ${isForgotEmailFocused || forgotPasswordEmail
                                                ? 'text-[11px] text-gray-500 top-1.5 font-light'
                                                : 'text-gray-400/90 top-5 text-[14px] font-light'
                                                }`}
                                        >
                                            Email or phone number
                                        </label>
                                    </div>

                                    {forgotPasswordError && (
                                        <div className="flex items-center text-red-500 text-sm">
                                            <div className="w-4 h-4 rounded-full border border-red-500 mr-1 flex items-center justify-center">
                                                <span className="text-red-500 text-xs font-bold">!</span>
                                            </div>
                                            {forgotPasswordError}
                                        </div>
                                    )}

                                    <div className="pt-2">
                                        <Button
                                            type="submit"
                                            variant={!forgotPasswordEmail || isSending ? 'gray' : 'primary'}
                                            size='lg'
                                            className={`h-[53px] w-full py-3 text-[18px] font-semibold ${(!forgotPasswordEmail || isSending) ? 'text-gray-700' : ''}`}
                                            disabled={!forgotPasswordEmail || isSending}
                                        >
                                            {isSending ? (
                                                <div className="flex items-center justify-center">
                                                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending...
                                                </div>
                                            ) : 'Send instructions'}
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center py-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
                                    <p className="text-gray-600 mb-6">We've sent password reset instructions to your email.</p>
                                    <button
                                        onClick={() => {
                                            setShowForgotPassword(false);
                                            setForgotPasswordEmail('');
                                            setResetSent(false);
                                        }}
                                        className="text-blue-500 text-sm font-medium hover:underline"
                                    >
                                        Back to login
                                    </button>
                                </div>
                            )}

                            {!showSuccess && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <button className="text-blue-500 text-sm hover:underline">
                                        Forgot or lost your email or phone number?
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : showPasskey && !showPasswordScreen ? (
                        <div className="py-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Verifying it's you...</h2>
                                <p className="text-gray-600">Complete sign-in using your passkey.</p>
                            </div>
                            <Button
                                variant="gray"
                                className="mt-4 text-blue-500 w-full"
                                size='lg'
                                onClick={() => setShowPasskey(false)}
                            >
                                Back to sign in
                            </Button>
                        </div>
                    ) : null}
                </div>
            </main>

            {/* Footer Section */}
            <div className="flex  w-full justify-between items-center border-t border-gray-200 px-4 py-3">
                <button className='py-3  px-6'>
                    <span className="text-[16px] font-semibold text-blue-600 mt-4">English</span>
                </button>

                <span className='text-[13px] font-light text-gray-400 px-4'>@ 2025 . All rights reserved.</span>
            </div>
        </div>
    )
}

export default Login;
