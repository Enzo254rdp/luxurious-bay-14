
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    // Simulate API call
    try {
      // This would be replaced with actual authentication logic
      setTimeout(() => {
        if (email === "test@example.com" && password === "password") {
          // Success - would be replaced with proper auth flow
          localStorage.setItem("isLoggedIn", "true");
          navigate("/account");
        } else {
          setError("Invalid email or password. Please try again.");
        }
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-enzobay-neutral-50 flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-10 px-4">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="mb-8">
              <Link 
                to="/" 
                className="inline-flex items-center text-enzobay-blue hover:text-enzobay-blue-dark transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
            
            <div className="text-center md:text-left mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-enzobay-brown mb-2">Welcome Back</h1>
              <p className="text-enzobay-neutral-600">
                Sign in to your account to continue
              </p>
            </div>
            
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-enzobay-neutral-700">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-enzobay-neutral-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-enzobay-neutral-300 rounded-md shadow-sm focus:ring-enzobay-blue focus:border-enzobay-blue bg-white text-enzobay-neutral-900"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-enzobay-neutral-700">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-enzobay-neutral-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-enzobay-neutral-300 rounded-md shadow-sm focus:ring-enzobay-blue focus:border-enzobay-blue bg-white text-enzobay-neutral-900"
                    placeholder="••••••••"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-enzobay-neutral-400 hover:text-enzobay-neutral-600 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-enzobay-blue focus:ring-enzobay-blue border-enzobay-neutral-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-enzobay-neutral-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-enzobay-blue hover:bg-enzobay-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-blue transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing In...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      Sign In
                    </>
                  )}
                </button>
              </div>
              
              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-enzobay-neutral-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-sm text-enzobay-neutral-500">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="py-2.5 px-4 border border-enzobay-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-enzobay-neutral-700 hover:bg-enzobay-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-blue flex items-center justify-center gap-2"
                >
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.837c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.934.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </button>
                <button
                  type="button"
                  className="py-2.5 px-4 border border-enzobay-neutral-300 rounded-md shadow-sm bg-white text-sm font-medium text-enzobay-neutral-700 hover:bg-enzobay-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-enzobay-blue flex items-center justify-center gap-2"
                >
                  <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10C20 4.477 15.523 0 10 0zm-.22 15.65H7.4v-6.42H9.8v6.42zm-1.2-7.3c-.78 0-1.41-.63-1.41-1.41 0-.78.63-1.41 1.41-1.41.78 0 1.41.63 1.41 1.41 0 .78-.63 1.41-1.41 1.41zm9.62 7.3h-2.38v-3.69c0-.97-.02-2.22-1.34-2.22-1.34 0-1.55 1.06-1.55 2.15v3.76h-2.38v-6.42h2.29v1.05h.03c.36-.66 1.22-1.34 2.48-1.34 2.65 0 3.14 1.74 3.14 4.01v3.7z" />
                  </svg>
                  LinkedIn
                </button>
              </div>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-sm text-enzobay-neutral-600">
                Don't have an account?{" "}
                <Link to="/register" className="font-medium text-enzobay-blue hover:text-enzobay-blue-dark">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          
          {/* Right Side - Image/Banner */}
          <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-enzobay-blue to-enzobay-blue-dark p-12">
            <div className="h-full flex flex-col justify-between">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-6">Premium Luxury Experience</h2>
                <p className="text-white/80 mb-8">
                  Sign in to access exclusive deals, track orders, and manage your premium shopping experience.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/90">Access to exclusive deals and promotions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/90">Quick checkout with saved information</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span className="text-white/90">Order tracking and purchase history</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-auto">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <p className="text-sm text-white/70">
                  Secure login protected with 256-bit encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
