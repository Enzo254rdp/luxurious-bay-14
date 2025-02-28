
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for reaching out! We'll get back to you shortly.",
        variant: "default",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-enzobay-neutral-50">
      <Navbar />
      
      <main>
        {/* Header Banner */}
        <div className="bg-enzobay-brown py-16 px-4">
          <div className="container mx-auto text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Contact Us</h1>
            <p className="text-xl font-light max-w-3xl mx-auto">
              Get in touch with our team for any questions, feedback, or support needs.
            </p>
          </div>
        </div>
        
        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-6">Get in Touch</h2>
                <p className="text-enzobay-neutral-700 mb-8">
                  Have a question or need assistance? Our customer support team is here to help. Reach out to us through any of the following channels.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-enzobay-orange/10 p-3 rounded-full text-enzobay-orange">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-enzobay-brown mb-1">Our Location</h3>
                      <p className="text-enzobay-neutral-600">
                        123 Luxury Avenue, Westlands<br />
                        Nairobi, Kenya
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-enzobay-blue/10 p-3 rounded-full text-enzobay-blue">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-enzobay-brown mb-1">Email Us</h3>
                      <p className="text-enzobay-neutral-600">
                        <a href="mailto:support@enzobay.com" className="hover:text-enzobay-blue">
                          support@enzobay.com
                        </a><br />
                        <a href="mailto:info@enzobay.com" className="hover:text-enzobay-blue">
                          info@enzobay.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-enzobay-orange/10 p-3 rounded-full text-enzobay-orange">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-enzobay-brown mb-1">Call Us</h3>
                      <p className="text-enzobay-neutral-600">
                        <a href="tel:+254700123456" className="hover:text-enzobay-orange">
                          +254 700 123 456
                        </a><br />
                        <a href="tel:+254711987654" className="hover:text-enzobay-orange">
                          +254 711 987 654
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Business Hours */}
                <div className="mt-10">
                  <h3 className="text-lg font-semibold text-enzobay-brown mb-3">Business Hours</h3>
                  <div className="bg-white p-5 rounded-lg border border-enzobay-neutral-200">
                    <div className="flex justify-between py-2 border-b border-enzobay-neutral-100">
                      <span className="text-enzobay-neutral-700">Monday - Friday</span>
                      <span className="font-medium text-enzobay-brown">8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-enzobay-neutral-100">
                      <span className="text-enzobay-neutral-700">Saturday</span>
                      <span className="font-medium text-enzobay-brown">9:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-enzobay-neutral-700">Sunday</span>
                      <span className="font-medium text-enzobay-brown">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-6">Send Us a Message</h2>
                <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm">
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                          Your Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-md border border-enzobay-neutral-300 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                          Email Address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-md border border-enzobay-neutral-300 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 rounded-md border border-enzobay-neutral-300 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                        >
                          <option value="">Select a subject</option>
                          <option value="Customer Support">Customer Support</option>
                          <option value="Order Inquiry">Order Inquiry</option>
                          <option value="Product Information">Product Information</option>
                          <option value="Returns & Refunds">Returns & Refunds</option>
                          <option value="Feedback">Feedback</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      
                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-enzobay-neutral-700 mb-1">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-2 rounded-md border border-enzobay-neutral-300 focus:outline-none focus:ring-2 focus:ring-enzobay-blue focus:border-transparent"
                          placeholder="Tell us more about your inquiry..."
                        ></textarea>
                      </div>
                      
                      {/* Submit Button */}
                      <div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-enzobay-orange text-white py-3 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-enzobay-orange-dark transition-colors disabled:opacity-70"
                        >
                          {loading ? (
                            <>
                              <span className="animate-spin h-5 w-5 border-2 border-white border-r-transparent rounded-full"></span>
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              <span>Send Message</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="bg-white py-10">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-enzobay-brown mb-6 text-center">Find Us on the Map</h2>
            <div className="h-[400px] bg-enzobay-neutral-200 rounded-xl overflow-hidden">
              {/* Placeholder for a map, this would be integrated with Google Maps or similar */}
              <div className="h-full w-full flex items-center justify-center bg-enzobay-neutral-100">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-enzobay-neutral-400 mb-2 mx-auto" />
                  <p className="text-enzobay-neutral-600">
                    Interactive map would be displayed here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-enzobay-neutral-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-4">Frequently Asked Questions</h2>
              <p className="text-enzobay-neutral-700 max-w-3xl mx-auto">
                Find quick answers to common questions. If you can't find what you're looking for, don't hesitate to contact us directly.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "How can I track my order?",
                  answer: "You can track your order by logging into your account and navigating to the 'Orders' section. Alternatively, you can use the tracking number provided in your order confirmation email."
                },
                {
                  question: "What is your return policy?",
                  answer: "We offer a 30-day return policy for most items. Products must be in their original condition with all tags and packaging intact. Please visit our Returns page for more detailed information."
                },
                {
                  question: "Do you ship internationally?",
                  answer: "Yes, we ship to select international destinations. Shipping costs and delivery times vary by location. You can view the available shipping options during checkout."
                },
                {
                  question: "How can I change or cancel my order?",
                  answer: "If you need to change or cancel your order, please contact our customer support team as soon as possible. Changes or cancellations may not be possible once your order has been processed for shipping."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm">
                  <h3 className="text-lg font-semibold text-enzobay-brown mb-2">{faq.question}</h3>
                  <p className="text-enzobay-neutral-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <a href="/faq" className="text-enzobay-blue hover:underline font-medium">
                View All FAQs
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
