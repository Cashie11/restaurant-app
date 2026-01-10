import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { contactService } from '../services/contactService';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await contactService.sendMessage(formData);
            toast.success('Thank you for your message! We\'ll get back to you soon.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Failed to send message:', error);
            toast.error('Failed to send message. Please try again.');
        }
    };

    const toggleAccordion = (index: number) => {
        setActiveAccordion(activeAccordion === index ? null : index);
    };

    const faqs = [
        {
            question: "Do you accept reservations?",
            answer: "Yes, we accept reservations. Call us at (123) 456-7890 or book online."
        },
        {
            question: "What are your opening hours?",
            answer: "Mon-Thu: 11AM-10PM, Fri-Sun: 11AM-11PM"
        },
        {
            question: "Do you offer vegetarian options?",
            answer: "Yes, we have a variety of vegetarian and vegan dishes available."
        },
        {
            question: "Is parking available?",
            answer: "Yes, we offer complimentary parking for all our guests."
        },
        {
            question: "Do you provide catering services?",
            answer: "Yes, we offer catering for events. Contact us for more details."
        }
    ];

    return (
        <>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    .contact-container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 2rem;
                    }
                    
                    .contact-form {
                        background: white;
                        padding: 2rem;
                        border-radius: 12px;
                        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                        margin-bottom: 3rem;
                        animation: fadeIn 0.6s ease-out;
                    }
                    
                    .form-control {
                        border: 1px solid #e9ecef;
                        border-radius: 8px;
                        padding: 0.75rem;
                        transition: all 0.3s ease;
                    }
                    
                    .form-control:focus {
                        border-color: #FF6B35;
                        box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.25);
                        outline: none;
                    }
                    
                    .btn-primary {
                        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                        border: none;
                        padding: 0.75rem 2rem;
                        border-radius: 8px;
                        color: white;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    }
                    
                    .btn-primary:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 25px rgba(255, 107, 53, 0.3);
                    }
                    
                    .accordion {
                        border: 1px solid #e9ecef;
                        border-radius: 8px;
                        overflow: hidden;
                        margin-bottom: 1rem;
                        animation: fadeIn 0.8s ease-out;
                    }
                    
                    .accordion-header {
                        background: white;
                        padding: 1rem 1.5rem;
                        cursor: pointer;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        transition: all 0.3s ease;
                        border: none;
                        width: 100%;
                        text-align: left;
                    }
                    
                    .accordion-header:hover {
                        background: #FFF5F0;
                    }
                    
                    .accordion-header.active {
                        background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
                        color: white;
                    }
                    
                    .accordion-content {
                        padding: 0 1.5rem;
                        max-height: 0;
                        overflow: hidden;
                        transition: all 0.3s ease;
                        background: white;
                    }
                    
                    .accordion-content.active {
                        padding: 1rem 1.5rem;
                        max-height: 200px;
                    }
                    
                    .accordion-icon {
                        transition: transform 0.3s ease;
                    }
                    
                    .accordion-icon.rotate {
                        transform: rotate(180deg);
                    }
                    
                    .contact-info {
                        text-align: center;
                        padding: 2rem;
                        background: #FFF5F0;
                        border-radius: 12px;
                        margin-bottom: 3rem;
                        animation: fadeIn 0.7s ease-out;
                    }
                    
                    .contact-info h2 {
                        color: #FF6B35;
                        margin-bottom: 1rem;
                    }
                    
                    .contact-info p {
                        margin: 0.5rem 0;
                        color: #666;
                    }
                `}
            </style>

            <div className="contact-container">
                {/* Page Title */}
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold mb-3">Contact Us</h1>
                    <p className="text-muted">Get in touch with Urban Grille Restaurant</p>
                </div>

                {/* Contact Info */}
                <div className="contact-info">
                    <h2 className="h4 mb-3">Get in Touch</h2>
                    <p><strong>Address:</strong>Festac Lagos</p>
                    <p><strong>Phone:</strong> +234 9092039570</p>
                    <p><strong>Email:</strong> frankizuchukwu094@gmail.com</p>
                    <p><strong>Hours:</strong> Mon-Thu: 11AM-10PM, Fri-Sun: 11AM-11PM</p>
                </div>

                {/* Contact Form */}
                <div className="contact-form">
                    <h2 className="h4 mb-4">Send us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name *</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email *</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Message *</label>
                            <textarea
                                name="message"
                                className="form-control"
                                rows={5}
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                placeholder="How can we help you?"
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* FAQ Accordion */}
                <div>
                    <h2 className="h4 mb-4 text-center">Frequently Asked Questions</h2>
                    {faqs.map((faq, index) => (
                        <div key={index} className="accordion">
                            <button
                                className={`accordion-header ${activeAccordion === index ? 'active' : ''}`}
                                onClick={() => toggleAccordion(index)}
                            >
                                <span>{faq.question}</span>
                                <i className={`ci-chevron-down accordion-icon ${activeAccordion === index ? 'rotate' : ''}`}></i>
                            </button>
                            <div className={`accordion-content ${activeAccordion === index ? 'active' : ''}`}>
                                <p className="mb-0">{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Contact;
