import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { contactService } from '../services/contactService';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);
    const [sending, setSending] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        try {
            await contactService.sendMessage(formData);
            toast.success("Thank you for your message! We'll get back to you soon.");
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Failed to send message:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setSending(false);
        }
    };

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const faqs = [
        { question: 'What areas do you deliver to?', answer: 'We deliver across Lagos — Festac, Surulere, Amuwo-Odofin, Victoria Island, Lekki, and surrounding areas.' },
        { question: 'How do I pay for my order?', answer: 'We accept card payments through Paystack and direct bank transfer. Cash on delivery is also available in select areas.' },
        { question: 'How long does delivery take?', answer: 'On average, 30–45 minutes within Lagos, depending on your location and order size.' },
        { question: 'Do you offer catering for events?', answer: 'Yes! We cater for weddings, parties, and corporate events. Send us a message for a quote.' },
        { question: 'Are your ingredients really fresh?', answer: 'Absolutely. We hit the market every morning at 5AM to source the freshest produce, meat, and spices.' },
    ];

    const contactInfo = [
        { icon: 'bi-geo-alt', label: 'Address', value: 'Festac, Lagos, Nigeria' },
        { icon: 'bi-telephone', label: 'Phone', value: '+234 909 203 9570', href: 'tel:+2349092039570' },
        { icon: 'bi-envelope', label: 'Email', value: 'frankizuchukwu094@gmail.com', href: 'mailto:frankizuchukwu094@gmail.com' },
        { icon: 'bi-clock', label: 'Opening Hours', value: 'Mon – Sun: 11AM – 11PM' },
    ];

    return (
        <>
            <style>{`
                .ct-hero { background: #17130f; padding: 64px 0; text-align: center; color: #fff; }
                .ct-eyebrow { color: #ffb088; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; font-size: 13px; }
                .ct-hero h1 { font-weight: 800; letter-spacing: -1.5px; font-size: clamp(2rem, 4vw, 3rem); margin: 10px 0 8px; }
                .ct-hero p { color: rgba(255,255,255,0.65); }

                .ct-section { padding: 56px 0; }
                .ct-card { background: #fff; border: 1px solid #f0eae4; border-radius: 20px; }

                .ct-info-item { display: flex; align-items: flex-start; gap: 14px; padding: 16px 0; border-bottom: 1px solid #f4efe9; }
                .ct-info-item:last-child { border-bottom: none; }
                .ct-info-icon { width: 46px; height: 46px; border-radius: 13px; background: #fff0ea; color: #FF6B35; display: flex; align-items: center; justify-content: center; font-size: 20px; flex-shrink: 0; }
                .ct-info-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #9a9188; }
                .ct-info-value { font-weight: 600; color: #1f1b16; }
                .ct-info-value a { color: inherit; text-decoration: none; }
                .ct-info-value a:hover { color: #FF6B35; }

                .ct-input { border: 1.5px solid #e5ded6; border-radius: 12px; padding: 12px 14px; width: 100%; font-size: 14px; background: #fff; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
                .ct-input:focus { outline: none; border-color: #FF6B35; box-shadow: 0 0 0 4px rgba(255,107,53,0.1); }

                .ct-faq { border: 1px solid #f0eae4; border-radius: 14px; margin-bottom: 10px; overflow: hidden; background: #fff; }
                .ct-faq-btn { display: flex; justify-content: space-between; align-items: center; width: 100%; padding: 16px 18px; background: none; border: none; text-align: left; font-weight: 600; color: #1f1b16; cursor: pointer; font-size: 15px; }
                .ct-faq-btn .chev { transition: transform 0.25s ease; color: #FF6B35; }
                .ct-faq-btn.open .chev { transform: rotate(180deg); }
                .ct-faq-body { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
                .ct-faq-body.open { max-height: 200px; }
                .ct-faq-body-inner { padding: 0 18px 16px; color: #6b6258; line-height: 1.6; }
            `}</style>

            {/* Hero */}
            <section className="ct-hero">
                <div className="container">
                    <span className="ct-eyebrow">Get in Touch</span>
                    <h1>We'd Love to Hear From You</h1>
                    <p>Questions, feedback, or catering enquiries — we're here.</p>
                </div>
            </section>

            <section className="ct-section">
                <div className="container">
                    <div className="row g-4">
                        {/* Contact info */}
                        <div className="col-lg-5">
                            <div className="ct-card p-4 p-md-5 h-100">
                                <h4 className="fw-bold mb-4">Contact Information</h4>
                                {contactInfo.map((item) => (
                                    <div className="ct-info-item" key={item.label}>
                                        <div className="ct-info-icon"><i className={`bi ${item.icon}`}></i></div>
                                        <div>
                                            <div className="ct-info-label">{item.label}</div>
                                            <div className="ct-info-value">
                                                {item.href ? <a href={item.href}>{item.value}</a> : item.value}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form */}
                        <div className="col-lg-7">
                            <div className="ct-card p-4 p-md-5">
                                <h4 className="fw-bold mb-4">Send us a Message</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Name</label>
                                            <input type="text" name="name" className="ct-input" value={formData.name} onChange={handleInputChange} placeholder="Your name" required />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-semibold">Email</label>
                                            <input type="email" name="email" className="ct-input" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-semibold">Message</label>
                                            <textarea name="message" className="ct-input" rows={5} value={formData.message} onChange={handleInputChange} placeholder="How can we help you?" required></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary rounded-pill px-5 py-3 fw-semibold" disabled={sending}>
                                                {sending ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-send me-2"></i>}
                                                Send Message
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="ct-section pt-0">
                <div className="container">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold" style={{ color: '#1f1b16' }}>Frequently Asked Questions</h2>
                    </div>
                    <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                        {faqs.map((faq, index) => (
                            <div className="ct-faq" key={index}>
                                <button className={`ct-faq-btn ${activeAccordion === index ? 'open' : ''}`} onClick={() => toggleAccordion(index)}>
                                    <span>{faq.question}</span>
                                    <i className="bi bi-chevron-down chev"></i>
                                </button>
                                <div className={`ct-faq-body ${activeAccordion === index ? 'open' : ''}`}>
                                    <div className="ct-faq-body-inner">{faq.answer}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
