# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account
- MongoDB Atlas account

## Step 1: Prepare Your Code

1. Make sure all code is committed to Git
2. Verify `.env.local` is in `.gitignore` (never commit secrets)
3. Test locally: `npm run dev`

## Step 2: Deploy to Vercel

### Option A: Using Vercel CLI
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Option B: Using Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Select your project
4. Click "Deploy"

## Step 3: Add Environment Variables

In Vercel Dashboard:
1. Go to Settings → Environment Variables
2. Add `MONGODB_URI`:
   - Key: `MONGODB_URI`
   - Value: Your production MongoDB Atlas URI

## Step 4: Set MongoDB Atlas Connection

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update in Vercel environment variables

## Step 5: Verify Deployment

1. Check build logs in Vercel
2. Visit your deployed URL
3. Test homepage and admin panel
4. Create test booking

## Troubleshooting

### MongoDB Connection Failed
- Check connection string in env variables
- Ensure IP whitelist includes Vercel's IPs (set to 0.0.0.0/0 for development)
- Test connection with health endpoint: `/api/health`

### Build Errors
- Clear node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Check console for specific errors

### Slow Page Loads
- Use Vercel Analytics to identify bottlenecks
- Optimize images (use Next.js Image component)
- Cache API responses with SWR

## Production Checklist

- [ ] Environment variables set
- [ ] MongoDB Atlas configured
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Custom domain configured
- [ ] Email notifications tested
- [ ] Admin panel secured (add auth if needed)
- [ ] Analytics enabled
- [ ] Backups configured in MongoDB Atlas
