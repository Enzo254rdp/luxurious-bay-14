
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCartStore } from "../lib/store";
import { formatPrice } from "../lib/utils";
import { CheckCircle, ChevronRight, CreditCard, Shield, Truck, Smartphone } from "lucide-react";

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    apartment: "",
    city: "",
    region: "",
    postalCode: "",
    phone: "",
    paymentMethod: "mpesa", // Default to M-Pesa
    saveInfo: true,
    deliveryMethod: "standard"
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };
  
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is edited
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };
  
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    // Required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'address', 'city', 'region', 'postalCode', 'phone'];
    requiredFields.forEach(field => {
      if (!formData[field as keyof typeof formData]) {
        errors[field] = "This field is required";
      }
    });
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    // Phone validation
    if (formData.phone && !/^[0-9+\s\-\(\)]{10,15}$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }
    
    // Postal code validation
    if (formData.postalCode && !/^[0-9]{5,6}$/.test(formData.postalCode)) {
      errors.postalCode = "Please enter a valid postal code";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Clear cart and redirect to success page
      clearCart();
      navigate("/order-success");
      setIsLoading(false);
    }, 1500);
  };
  
  // Calculate cart totals
  const subtotal = getCartTotal();
  const shippingCost = formData.deliveryMethod === 'express' ? 800 : (subtotal > 5000 ? 0 : 500);
  const tax = Math.round(subtotal * 0.16); // 16% VAT
  const total = subtotal + shippingCost + tax;
  
  return (
    <div className="bg-enzobay-neutral-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-enzobay-neutral-500">
              <li>
                <Link to="/" className="hover:text-enzobay-blue">Home</Link>
              </li>
              <li>
                <span className="mx-2">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </li>
              <li>
                <Link to="/cart" className="hover:text-enzobay-blue">Cart</Link>
              </li>
              <li>
                <span className="mx-2">
                  <ChevronRight className="h-4 w-4" />
                </span>
              </li>
              <li className="text-enzobay-neutral-800 font-medium">Checkout</li>
            </ol>
          </nav>
          
          <h1 className="text-2xl font-bold tracking-tight text-enzobay-brown sm:text-3xl mb-8">
            Checkout
          </h1>
          
          <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            {/* Left side - Form fields */}
            <div className="lg:col-span-7">
              {/* Contact information */}
              <section aria-labelledby="contact-info-heading" className="bg-white shadow-sm rounded-lg p-6 mb-8">
                <h2 id="contact-info-heading" className="text-lg font-medium text-enzobay-brown mb-4">
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-enzobay-neutral-700">
                      First name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                        formErrors.firstName 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-enzobay-neutral-300 focus:border-enzobay-blue focus:ring-enzobay-blue'
                      }`}
                    />
                    {formErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.firstName}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-enzobay-neutral-700">
                      Last name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                        formErrors.lastName 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-enzobay-neutral-300 focus:border-enzobay-blue focus:ring-enzobay-blue'
                      }`}
                    />
                    {formErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.lastName}</p>
                    )}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-enzobay-neutral-700">
                      Email address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                        formErrors.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-enzobay-neutral-300 focus:border-enzobay-blue focus:ring-enzobay-blue'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                    )}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-enzobay-neutral-700">
                      Phone number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                        formErrors.phone 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-enzobay-neutral-300 focus:border-enzobay-blue focus:ring-enzobay-blue'
                      }`}
                      placeholder="07XX XXX XXX"
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              </section>
              
              {/* Shipping information */}
              <section aria-labelledby="shipping-info-heading" className="bg-white shadow-sm rounded-lg p-6 mb-8">
                <h2 id="shipping-info-heading" className="text-lg font-medium text-enzobay-brown mb-4">
                  Shipping Information
                </h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-enzobay-neutral-700">
                      Street address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                        formErrors.address 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                          : 'border-enzobay-neutral-300 focus:border-enzobay-blue focus:ring-enzobay-blue'
                      }`}
                    />
                    {formErrors.address && (
                      <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="apartment" className="block text-sm font-medium text-enzobay-neutral-700">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-enzobay-neutral-300 shadow-sm focus:border-enzobay-blue focus:ring-enzobay-blue sm:text-sm"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-enzobay-neutral-700">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                          formErrors.city 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                            : 'border-enzobay-neutral-300 focus:border-enzobay-blue focus:ring-enzobay-blue'
                        }`}
                      />
                      {formErrors.city && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.city}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="region" className="block text-sm font-medium text-enzobay-neutral-700">
                        State / Province
                      </label>
                      <select
                        id="region"
                        name="region"
                        value={formData.region}
                        onChange={handleSelectChange}
                        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                          formErrors.region 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                            : 'border-enzobay-neutral-300 focus:border-enzobay-blue focus:ring-enzobay-blue'
                        }`}
                      >
                        <option value="">Select region</option>
                        <option value="nairobi">Nairobi</option>
                        <option value="mombasa">Mombasa</option>
                        <option value="kisumu">Kisumu</option>
                        <option value="nakuru">Nakuru</option>
                        <option value="eldoret">Eldoret</option>
                        <option value="other">Other</option>
                      </select>
                      {formErrors.region && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.region}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-enzobay-neutral-700">
                        Postal code
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm ${
                          formErrors.postalCode 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                            : 'border-enzobay-neutral-300 focus:border-enzobay-blue focus:ring-enzobay-blue'
                        }`}
                      />
                      {formErrors.postalCode && (
                        <p className="mt-1 text-sm text-red-600">{formErrors.postalCode}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center">
                    <input
                      id="saveInfo"
                      name="saveInfo"
                      type="checkbox"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-enzobay-neutral-300 text-enzobay-blue focus:ring-enzobay-blue"
                    />
                    <label htmlFor="saveInfo" className="ml-2 block text-sm text-enzobay-neutral-700">
                      Save this information for next time
                    </label>
                  </div>
                </div>
              </section>
              
              {/* Delivery method */}
              <section aria-labelledby="delivery-heading" className="bg-white shadow-sm rounded-lg p-6 mb-8">
                <h2 id="delivery-heading" className="text-lg font-medium text-enzobay-brown mb-4">
                  Delivery Method
                </h2>
                
                <div className="space-y-4">
                  <div className="relative bg-enzobay-neutral-50 rounded-lg p-4 flex items-start border-2 border-enzobay-blue">
                    <div className="flex items-center h-5">
                      <input
                        id="delivery-standard"
                        name="deliveryMethod"
                        type="radio"
                        value="standard"
                        checked={formData.deliveryMethod === 'standard'}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-enzobay-blue border-enzobay-neutral-300 focus:ring-enzobay-blue"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <label htmlFor="delivery-standard" className="font-medium text-enzobay-neutral-900">
                        Standard
                      </label>
                      <p className="text-enzobay-neutral-500 text-sm">
                        3-7 business days
                      </p>
                    </div>
                    <div>
                      <p className="text-enzobay-neutral-900 font-medium">
                        {subtotal > 5000 ? 'Free' : formatPrice(500)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative bg-white rounded-lg p-4 flex items-start border border-enzobay-neutral-200">
                    <div className="flex items-center h-5">
                      <input
                        id="delivery-express"
                        name="deliveryMethod"
                        type="radio"
                        value="express"
                        checked={formData.deliveryMethod === 'express'}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-enzobay-blue border-enzobay-neutral-300 focus:ring-enzobay-blue"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <label htmlFor="delivery-express" className="font-medium text-enzobay-neutral-900">
                        Express
                      </label>
                      <p className="text-enzobay-neutral-500 text-sm">
                        1-3 business days
                      </p>
                    </div>
                    <div>
                      <p className="text-enzobay-neutral-900 font-medium">
                        {formatPrice(800)}
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Payment method */}
              <section aria-labelledby="payment-heading" className="bg-white shadow-sm rounded-lg p-6">
                <h2 id="payment-heading" className="text-lg font-medium text-enzobay-brown mb-4">
                  Payment Method
                </h2>
                
                <div className="space-y-4">
                  {/* M-Pesa (Primary) */}
                  <div className="relative bg-green-50 rounded-lg p-4 flex items-start border-2 border-green-500">
                    <div className="flex items-center h-5">
                      <input
                        id="payment-mpesa"
                        name="paymentMethod"
                        type="radio"
                        value="mpesa"
                        checked={formData.paymentMethod === 'mpesa'}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-green-600 border-enzobay-neutral-300 focus:ring-green-500"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <label htmlFor="payment-mpesa" className="font-medium text-enzobay-neutral-900">
                        M-Pesa
                      </label>
                      <p className="text-enzobay-neutral-500 text-sm">
                        Pay using your M-Pesa mobile money
                      </p>
                      {formData.paymentMethod === 'mpesa' && (
                        <div className="mt-3 bg-white p-3 rounded-md border border-green-200">
                          <p className="text-sm text-gray-700 mb-2">Follow these steps:</p>
                          <ol className="text-sm text-gray-600 list-decimal pl-5">
                            <li>Go to M-Pesa on your phone</li>
                            <li>Select "Lipa na M-Pesa"</li>
                            <li>Select "Pay Bill"</li>
                            <li>Enter Business No: <span className="font-medium">247247</span></li>
                            <li>Enter Account No: <span className="font-medium">EnzoBay</span></li>
                            <li>Enter Amount: <span className="font-medium">{formatPrice(total)}</span></li>
                            <li>Enter your M-Pesa PIN</li>
                            <li>You'll receive a confirmation SMS</li>
                          </ol>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center">
                      <Smartphone className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  
                  {/* Credit/Debit Card */}
                  <div className="relative bg-white rounded-lg p-4 flex items-start border border-enzobay-neutral-200">
                    <div className="flex items-center h-5">
                      <input
                        id="payment-card"
                        name="paymentMethod"
                        type="radio"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleRadioChange}
                        className="h-4 w-4 text-enzobay-blue border-enzobay-neutral-300 focus:ring-enzobay-blue"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <label htmlFor="payment-card" className="font-medium text-enzobay-neutral-900">
                        Credit / Debit Card
                      </label>
                      <p className="text-enzobay-neutral-500 text-sm">
                        We accept all major credit and debit cards
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-6 w-6 text-enzobay-neutral-500" />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center">
                  <Shield className="h-5 w-5 text-enzobay-neutral-400" />
                  <p className="ml-2 text-sm text-enzobay-neutral-500">
                    Your payment information is processed securely. We do not store credit card details.
                  </p>
                </div>
              </section>
            </div>
            
            {/* Right side - Order summary */}
            <div className="mt-10 lg:mt-0 lg:col-span-5">
              <div className="bg-white shadow-sm rounded-lg p-6 sticky top-8">
                <h2 className="text-lg font-medium text-enzobay-brown mb-4">
                  Order Summary
                </h2>
                
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-enzobay-neutral-600">Subtotal</dt>
                    <dd className="text-sm font-medium text-enzobay-neutral-900">{formatPrice(subtotal)}</dd>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-enzobay-neutral-200">
                    <dt className="flex items-center text-sm text-enzobay-neutral-600">
                      <span>Shipping estimate</span>
                    </dt>
                    <dd className="text-sm font-medium text-enzobay-neutral-900">
                      {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
                    </dd>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-enzobay-neutral-200">
                    <dt className="flex text-sm text-enzobay-neutral-600">
                      <span>Tax estimate (16% VAT)</span>
                    </dt>
                    <dd className="text-sm font-medium text-enzobay-neutral-900">{formatPrice(tax)}</dd>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-enzobay-neutral-200">
                    <dt className="text-base font-medium text-enzobay-neutral-900">Order total</dt>
                    <dd className="text-base font-medium text-enzobay-neutral-900">{formatPrice(total)}</dd>
                  </div>
                </dl>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md border border-transparent bg-enzobay-orange py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-enzobay-orange-dark focus:outline-none focus:ring-2 focus:ring-enzobay-orange focus:ring-offset-2 focus:ring-offset-enzobay-neutral-50 flex items-center justify-center disabled:opacity-70"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      'Complete Order'
                    )}
                  </button>
                </div>
                
                <div className="mt-6 text-center text-sm text-enzobay-neutral-500">
                  <p>
                    By placing your order, you agree to our{' '}
                    <Link to="/terms" className="font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                
                <div className="mt-6 border-t border-enzobay-neutral-200 pt-4">
                  <h3 className="text-sm font-medium text-enzobay-neutral-900 mb-2">
                    Order Details
                  </h3>
                  
                  <ul className="divide-y divide-enzobay-neutral-200">
                    {items.map((item) => (
                      <li key={item.id} className="py-2 flex">
                        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border border-enzobay-neutral-200">
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div className="flex justify-between text-sm font-medium text-enzobay-neutral-900">
                            <h4 className="line-clamp-1">
                              {item.name}
                            </h4>
                            <p>
                              {formatPrice(item.price * (item.discount ? (1 - item.discount / 100) : 1))}
                            </p>
                          </div>
                          <div className="mt-1 flex items-end justify-between text-sm">
                            <p className="text-enzobay-neutral-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
