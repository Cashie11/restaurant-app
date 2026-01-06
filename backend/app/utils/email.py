import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
import os
from typing import List, Optional
from app.core.config import settings
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class EmailService:
    def __init__(self):
        # Force console mode for development
        self.enabled = False
        
        logger.info("Email service initialized - CONSOLE MODE (development)")

    def _send_email(self, to_email: str, subject: str, html_content: str):
        """Internal method to send email via SMTP"""
        if not self.enabled:
            # Simulation mode for development
            print("="*50)
            print(f"📧 [EMAIL SIMULATION] To: {to_email}")
            print(f"Subject: {subject}")
            print("-" * 20)
            print(html_content)
            print("="*50)
            logger.info(f"Email simulated to {to_email}")
            return True

        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = subject
            msg["From"] = self.smtp_user
            msg["To"] = to_email

            part = MIMEText(html_content, "html")
            msg.attach(part)

            if self.smtp_port == 465:
                # Implicit SSL for port 465
                with smtplib.SMTP_SSL(self.smtp_host, self.smtp_port) as server:
                    server.login(self.smtp_user, self.smtp_password)
                    server.sendmail(self.smtp_user, to_email, msg.as_string())
            else:
                # STARTTLS for port 587
                with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                    server.starttls()
                    server.login(self.smtp_user, self.smtp_password)
                    server.sendmail(self.smtp_user, to_email, msg.as_string())
            
            logger.info(f"Email sent successfully to {to_email}")
            return True
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            
            # Fallback to console simulation on failure
            print("="*50)
            print(f"📧 [EMAIL FAILED - FALLBACK SIMULATION] To: {to_email}")
            print(f"Subject: {subject}")
            print("-" * 20)
            print(html_content)
            print("="*50)
            
            return False

    def send_otp_email(self, to_email: str, otp_code: str):
        """Send OTP verification email"""
        subject = "Fresh Fork - Verify Your Account"
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #FF6B35;">Fresh Fork</h1>
                    </div>
                    
                    <p>Hello,</p>
                    <p>Thank you for registering with Fresh Fork! To complete your signup, please verify your email address using the code below:</p>
                    
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; text-align: center; margin: 30px 0;">
                        <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #2d3436;">{otp_code}</span>
                    </div>
                    
                    <p>This code will expire in 5 minutes.</p>
                    <p>If you didn't create an account, you can safely ignore this email.</p>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    
                    <p style="font-size: 12px; color: #999; text-align: center;">
                        &copy; {datetime.now().year} Fresh Fork Restaurant. All rights reserved.
                    </p>
                </div>
            </body>
        </html>
        """
        return self._send_email(to_email, subject, html_content)

    def send_order_confirmation(self, to_email: str, order_details: dict):
        """Send order confirmation email"""
        items_html = ""
        for item in order_details.get('items', []):
            items_html += f"""
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">{item['name']}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">x{item['quantity']}</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item['price']:.2f}</td>
            </tr>
            """

        subject = f"Fresh Fork - Order Confirmation #{order_details.get('id')}"
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #FF6B35;">Fresh Fork</h1>
                        <h2 style="color: #00b894;">Order Confirmed!</h2>
                    </div>
                    
                    <p>Hello {order_details.get('customer_name')},</p>
                    <p>Your order has been received and is being prepared. We're excited to serve you!</p>
                    
                    <div style="background-color: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
                        <h3 style="margin-top: 0;">Order Details</h3>
                        <p><strong>Order ID:</strong> #{order_details.get('id')}</p>
                        <p><strong>Date:</strong> {datetime.now().strftime('%B %d, %Y')}</p>
                        <p><strong>Status:</strong> {order_details.get('status')}</p>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                            <thead>
                                <tr style="background-color: #eee;">
                                    <th style="padding: 10px; text-align: left;">Item</th>
                                    <th style="padding: 10px; text-align: left;">Qty</th>
                                    <th style="padding: 10px; text-align: right;">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items_html}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                                    <td style="padding: 10px; text-align: right; font-weight: bold; color: #FF6B35;">${order_details.get('total'):.2f}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    
                    <p>You can track your order status in your dashboard.</p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="{settings.FRONTEND_URL}/dashboard" style="background-color: #FF6B35; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; display: inline-block;">Track Order</a>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                    
                    <p style="font-size: 12px; color: #999; text-align: center;">
                        &copy; {datetime.now().year} Fresh Fork Restaurant. All rights reserved.
                    </p>
                </div>
            </body>
        </html>
        """
        return self._send_email(to_email, subject, html_content)

email_service = EmailService()
