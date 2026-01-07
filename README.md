# UltraLife Member Portal - Login Page

A secure login page for UltraLife Monthly Updates members that authenticates against an Airtable database.

## Features

- 🔐 Secure email and password authentication
- 🎨 Modern, responsive design with Tailwind CSS
- ✅ Real-time form validation
- 🔄 Loading states and error handling
- 📱 Mobile-friendly interface
- 🚀 Automatic redirect to member portal on successful login

## How It Works

The login page validates member credentials against the Airtable database:
- **Base ID**: `appShheFjBIpUtI4G`
- **Table**: Members (`tblgBvDl6zowiluxo`)
- **Fields**: Email (`fldyAXx6U9v4KbDal`) and Password (`fldwpiv0ZXR2WQQz1`)

On successful authentication, users are redirected to:
`https://airtable.com/appShheFjBIpUtI4G/pagEMIHvcDlPBC8Hd`

## Tech Stack

- **React** - UI framework
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling
- **Anthropic Claude API** - AI-powered authentication with Airtable MCP

## Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to the project directory
cd ultralife-member-portal

# Install dependencies
npm install

# Start the development server
npm start
```

## Usage

Simply import and use the `MemberLogin` component in your React application:

```jsx
import MemberLogin from './MemberLogin';

function App() {
  return <MemberLogin />;
}
```

## Security Considerations

⚠️ **Important Security Notes:**

1. **Password Storage**: Currently, passwords are stored in plain text in Airtable. For production use, implement password hashing (bcrypt, argon2, etc.)

2. **API Keys**: Ensure your Anthropic API key is properly secured and not exposed in the frontend code

3. **Rate Limiting**: Implement rate limiting to prevent brute force attacks

4. **HTTPS**: Always use HTTPS in production to encrypt data in transit

5. **Input Validation**: Add additional server-side validation

## Configuration

Update the following values in `MemberLogin.jsx` if needed:

- Base ID: `appShheFjBIpUtI4G`
- Table ID: `tblgBvDl6zowiluxo`
- Redirect URL: `https://airtable.com/appShheFjBIpUtI4G/pagEMIHvcDlPBC8Hd`

## Dependencies

- `react` - ^18.0.0
- `lucide-react` - ^0.263.1
- `tailwindcss` - ^3.0.0

## License

Proprietary - UltraLife Members Only

## Support

For help or issues, contact your forum administrator.
