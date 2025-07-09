# Environment Variables Configuration

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Admin Login Credentials
ADMIN_USERNAME=tim
ADMIN_PASSWORD=YourSecurePasswordHere
ADMIN_USER_NAME=Tim Werner
```

## Security Notes

- **Never commit `.env.local` to version control**
- Change the default password in production
- Use a strong, unique password for `ADMIN_PASSWORD`
- These credentials are used for the admin panel at `/admin`

## Setup Instructions

1. Create `.env.local` file in project root
2. Copy the environment variables above
3. Replace `YourSecurePasswordHere` with a secure password
4. Restart your development server

## Production Deployment

For production deployments, set these environment variables in your hosting platform:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables
- Other platforms: Check their documentation for environment variable configuration 