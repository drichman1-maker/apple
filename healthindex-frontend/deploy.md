# Deployment Guide

## Quick Vercel Deploy

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy with Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

## Manual Build Test

Before deploying, test the build locally:

```bash
npm run build
npm run start
```

## Environment Variables

Set these in Vercel dashboard (optional):

- `NEXT_PUBLIC_SITE_URL`: Your production URL
- `NEXT_PUBLIC_GOOGLE_ANALYTICS`: GA tracking ID
- Other analytics IDs as needed

## Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Domains"
3. Add your custom domain
4. Follow Vercel's DNS setup instructions

Your Health Index site will be live! 🚀