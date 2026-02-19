# MacTrackr Frontend Deployment Guide

## Quick Deploy Options

### 1. Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name: mactrackr-frontend
# - Directory: ./
# - Override settings? No
```

**Environment Variables in Vercel:**
- `VITE_API_URL`: https://your-backend-url.com
- `VITE_ENV`: production
- `VITE_APP_NAME`: MacTrackr

### 2. Netlify

```bash
# Build the project
npm run build

# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

**Netlify Configuration (_redirects file):**
```
/*    /index.html   200
```

### 3. GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
"deploy": "gh-pages -d dist"

# Build and deploy
npm run build
npm run deploy
```

### 4. AWS S3 + CloudFront

```bash
# Build the project
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Configure bucket for static hosting
# Set up CloudFront distribution
# Configure custom domain (optional)
```

## Environment Setup

### Required Environment Variables

```env
VITE_API_URL=https://your-backend-api.com
VITE_ENV=production
VITE_APP_NAME=MacTrackr
```

### Build Configuration

The Vite configuration is optimized for production:
- Code splitting enabled
- Assets optimization
- Source maps for debugging
- Bundle analysis available

## Domain Configuration

### Custom Domain Setup

1. **Purchase domain** (e.g., mactrackr.com)
2. **Configure DNS** to point to hosting provider
3. **Set up SSL certificate** (usually automatic)
4. **Update environment variables** with production URLs

### Subdomain Setup

For hosting on a subdomain (e.g., app.mactrackr.com):

1. **Update base URL** in vite.config.js if needed
2. **Configure subdomain** in hosting provider
3. **Update CORS settings** on backend if required

## CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
        VITE_ENV: production
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./
```

## Performance Optimization

### Build Optimization

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check for unused dependencies
npx depcheck

# Optimize images (if needed)
# Compress assets
# Enable gzip compression on server
```

### CDN Setup

1. **Configure CloudFront** or similar CDN
2. **Set cache headers** for static assets
3. **Enable gzip compression**
4. **Configure proper cache invalidation**

## Monitoring

### Recommended Tools

- **Analytics**: Google Analytics, Plausible
- **Error Tracking**: Sentry, LogRocket
- **Performance**: Web Vitals, Lighthouse CI
- **Uptime**: UptimeRobot, Pingdom

### Health Checks

Add health check endpoint monitoring:
- Frontend availability
- API connectivity
- Core functionality tests

## Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 16+
```

**Routing Issues:**
- Ensure SPA redirect rules are configured
- Check base URL configuration
- Verify history API support

**API Connection:**
- Verify CORS settings on backend
- Check environment variables
- Test API endpoints directly

### Debug Mode

```bash
# Run with debug logging
VITE_ENV=development npm run dev

# Check build in preview mode
npm run build
npm run preview
```

## Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **API Keys**: Use server-side proxy for sensitive operations  
3. **HTTPS**: Always use SSL in production
4. **CSP Headers**: Configure Content Security Policy
5. **Dependencies**: Regularly update and audit packages

## Backup Strategy

1. **Source Code**: Git repository with multiple remotes
2. **Build Artifacts**: Store built assets if needed
3. **Environment Config**: Document all settings
4. **Database**: Backend handles data backup

---

For additional help:
- 📧 Email: dev@mactrackr.com
- 📖 Docs: See README.md
- 🐛 Issues: GitHub repository issues