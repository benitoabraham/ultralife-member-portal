# How to Push to GitHub

Follow these steps to upload your UltraLife Member Portal to GitHub:

## Step 1: Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Enter repository details:
   - **Repository name**: `ultralife-member-portal` (or your preferred name)
   - **Description**: "Secure login page for UltraLife Monthly Updates members"
   - **Visibility**: Choose Private (recommended) or Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
# Navigate to your project directory
cd ultralife-member-portal

# Add your GitHub repository as the remote origin
git remote add origin https://github.com/YOUR_USERNAME/ultralife-member-portal.git

# Rename the branch to 'main' (GitHub's default)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 3: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files:
   - MemberLogin.jsx
   - README.md
   - package.json
   - .gitignore

## Alternative: Using GitHub CLI

If you have GitHub CLI installed:

```bash
# Create and push in one command
gh repo create ultralife-member-portal --private --source=. --remote=origin --push
```

## Alternative: Using SSH

If you prefer SSH over HTTPS:

```bash
git remote add origin git@github.com:YOUR_USERNAME/ultralife-member-portal.git
git branch -M main
git push -u origin main
```

## Future Updates

After the initial push, to upload changes:

```bash
# Stage your changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

## Common Issues

### Authentication Error
If you get an authentication error, you may need to:
1. Generate a Personal Access Token (PAT) on GitHub
2. Go to: Settings → Developer settings → Personal access tokens → Tokens (classic)
3. Generate new token with 'repo' scope
4. Use the token as your password when prompted

### Repository Already Exists
If the repository name is taken:
```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/NEW_REPO_NAME.git
git push -u origin main
```

## Security Reminder

🔐 **Important**: Never commit sensitive information like:
- API keys
- Passwords
- Environment variables with secrets

Keep these in `.env` files (already in .gitignore) and use environment variables.

---

Need help? Contact your GitHub administrator or visit [GitHub Docs](https://docs.github.com).
