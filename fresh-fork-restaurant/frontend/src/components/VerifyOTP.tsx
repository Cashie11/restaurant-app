import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const VerifyOTP: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60); // 60 seconds cooldown for resend
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth(); // We might use this if we auto-login after verify, but for now just API calls

    useEffect(() => {
        if (location.state?.email) {
            setEmail(location.state.email);
        } else {
            navigate('/signin');
        }
    }, [location, navigate]);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value !== '') {
            (element.nextSibling as HTMLInputElement).focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement;
            prevInput?.focus();
        }
    };

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const otpCode = otp.join('');
        if (otpCode.length !== 6) {
            setError('Please enter the complete 6-digit code');
            setLoading(false);
            return;
        }

        try {
            await api.post('/auth/verify-otp', { email, otp_code: otpCode });

            // Success! Redirect to login with success message
            navigate('/signin', {
                state: {
                    message: 'Email verified successfully! You can now sign in.'
                }
            });
        } catch (err: any) {
            const message = err.response?.data?.detail || err.message || 'Verification failed';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timeLeft > 0) return;

        try {
            setLoading(true);
            await api.post('/auth/resend-otp', null, {
                params: { email },
            });

            setTimeLeft(60);
            setError('');
            alert('Verification code resent to your email.');
        } catch (err: any) {
            const message = err.response?.data?.detail || err.message || 'Failed to resend OTP';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ background: 'linear-gradient(to bottom, #FFF5F0 0%, #FFFFFF 100%)', minHeight: '100vh', paddingTop: '80px' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="card border-0 shadow-lg rounded-4 animate-fadeInUp">
                            <div className="card-body p-5">
                                <div className="text-center mb-4">
                                    <div className="bg-light rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px' }}>
                                        <i className="ci-mail fs-1 text-primary"></i>
                                    </div>
                                    <h2 className="fw-bold">Verify your email</h2>
                                    <p className="text-muted">
                                        We sent a verification code to <br />
                                        <span className="fw-bold text-dark">{email}</span>
                                    </p>
                                </div>

                                {error && (
                                    <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                                        <i className="ci-close-circle me-2"></i>
                                        <div>{error}</div>
                                    </div>
                                )}

                                <form onSubmit={handleVerify}>
                                    <div className="d-flex justify-content-between mb-4 gap-2">
                                        {otp.map((data, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                className="form-control form-control-lg text-center fw-bold fs-3 border-secondary"
                                                maxLength={1}
                                                value={data}
                                                onChange={(e) => handleChange(e.target, index)}
                                                onKeyDown={(e) => handleKeyDown(e, index)}
                                                onFocus={(e) => e.target.select()}
                                                style={{ height: '60px', borderRadius: '12px' }}
                                                disabled={loading}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow-sm"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Verifying...
                                            </>
                                        ) : (
                                            'Verify Account'
                                        )}
                                    </button>
                                </form>

                                <div className="text-center mt-4">
                                    <p className="text-muted mb-0">
                                        Didn't receive the code?{' '}
                                        <button
                                            className={`btn btn-link p-0 text-decoration-none ${timeLeft > 0 ? 'text-muted' : 'text-primary'}`}
                                            onClick={handleResend}
                                            disabled={timeLeft > 0 || loading}
                                        >
                                            {timeLeft > 0 ? `Resend in ${timeLeft}s` : 'Resend Code'}
                                        </button>
                                    </p>
                                    <div className="mt-3">
                                        <Link to="/signin" className="text-muted small text-decoration-none">
                                            <i className="ci-arrow-left me-1"></i>
                                            Back to Login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
