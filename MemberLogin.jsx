import React, { useState } from 'react';
import { AlertCircle, Lock, Mail, LogIn } from 'lucide-react';

export default function MemberLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Call Claude API with Airtable MCP to validate credentials
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `Search the Airtable base appShheFjBIpUtI4G in the Members table (tblgBvDl6zowiluxo) for a record where Email equals "${email}" and Password equals "${password}". Return ONLY a JSON object with format: {"authenticated": true/false, "name": "member name or null"}. No other text.`
            }
          ],
          mcp_servers: [
            {
              type: 'url',
              url: 'https://mcp.airtable.com',
              name: 'airtable-mcp'
            }
          ]
        })
      });

      const data = await response.json();
      
      // Extract text from response
      const textContent = data.content
        .filter(item => item.type === 'text')
        .map(item => item.text)
        .join('\n');

      // Clean and parse JSON response
      const cleanText = textContent.replace(/```json|```/g, '').trim();
      let result;
      
      try {
        result = JSON.parse(cleanText);
      } catch (parseError) {
        // If JSON parsing fails, check if authentication was successful based on text content
        if (textContent.toLowerCase().includes('authenticated') && textContent.toLowerCase().includes('true')) {
          result = { authenticated: true };
        } else {
          result = { authenticated: false };
        }
      }

      if (result.authenticated) {
        // Successful login - redirect to the member portal
        window.location.href = 'https://airtable.com/appShheFjBIpUtI4G/pagEMIHvcDlPBC8Hd';
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-white/20 rounded-full p-3">
              <Lock className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-center">UltraLife Portal</h1>
          <p className="text-blue-100 text-center mt-2">Member Login</p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="member@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help? Contact your forum administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
