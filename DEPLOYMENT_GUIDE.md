# Moodify - Vercel Deployment Guide

This guide will help you deploy both the frontend and backend of Moodify to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Create a free database at [mongodb.com/atlas](https://www.mongodb.com/atlas)
3. **GitHub Repository**: Push your code to GitHub (recommended for automatic deployments)

---

## Part 1: Deploy Backend API

### Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free cluster
2. Click "Connect" → "Connect your application"
3. Copy the connection string (it will look like: `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/`)
4. Replace `<pass>` with your actual database password
5. Add `/moodify` at the end of the connection string

### Step 2: Deploy Backend to Vercel

1. Open your terminal in the `full-stack-auth/server` directory:
   ```bash
   cd full-stack-auth/server
   ```

2. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```

3. Login to Vercel:
   ```bash
   vercel login
   ```

4. Deploy the backend:
   ```bash
   vercel --prod
   ```

5. When prompted, configure as follows:
   - Set up and deploy: **Yes**
   - Which scope: Select your account
   - Link to existing project: **No**
   - Project name: `moodify-backend` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings: **No**

6. **Add Environment Variables** in Vercel Dashboard:
   - Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
   - Settings → Environment Variables
   - Add these variables:
     ```
     MONGODB_URI=<your-atlas-connection-string>
     JWT_SECRET=<generate-a-secure-random-string>
     FRONTEND_URL=<your-frontend-vercel-url>
     NODE_ENV=production
     PORT=5000
     ```
   - Generate a secure JWT_SECRET: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

7. **Redeploy** after adding environment variables:
   ```bash
   vercel --prod
   ```

8. **Save your backend URL**: Copy the deployment URL (e.g., `https://moodify-backend.vercel.app`)

---

## Part 2: Deploy Frontend

### Step 1: Configure Frontend Environment

1. Go back to the root Moodify directory:
   ```bash
   cd ../..
   ```

2. Create `.env.production` file in the root directory:
   ```bash
   echo REACT_APP_API_URL=https://your-backend-url.vercel.app/api > .env.production
   ```
   Replace `your-backend-url` with your actual backend deployment URL from Part 1, Step 8.

### Step 2: Deploy Frontend to Vercel

1. Deploy the frontend:
   ```bash
   vercel --prod
   ```

2. When prompted:
   - Set up and deploy: **Yes**
   - Which scope: Select your account
   - Link to existing project: **No**
   - Project name: `moodify` (or your preferred name)
   - Directory: `./` (current directory)
   - Override settings: **No**

3. **Add Environment Variable** in Vercel Dashboard:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) → Your frontend project
   - Settings → Environment Variables
   - Add:
     ```
     REACT_APP_API_URL=https://your-backend-url.vercel.app/api
     ```

4. **Update Backend CORS**:
   - Copy your frontend URL (e.g., `https://moodify.vercel.app`)
   - Go to backend project in Vercel Dashboard
   - Settings → Environment Variables
   - Update `FRONTEND_URL` to your frontend URL
   - Redeploy backend

5. **Final Redeploy** of frontend:
   ```bash
   vercel --prod
   ```

---

## Part 3: Verify Deployment

### Test Your Deployment

1. **Open your frontend URL** in a browser
2. **Create a new account** (Signup page)
3. **Login** with your credentials
4. **Go through the flow**: Select mood → activity → theme → energy
5. **Check recommendations**: Verify YouTube videos load correctly
6. **Test feedback**: Like/dislike recommendations to test ML tracking

### Troubleshooting

#### CORS Errors
- Make sure `FRONTEND_URL` in backend matches your actual frontend URL
- Check that both deployments are using the latest environment variables
- Redeploy both frontend and backend after updating env vars

#### MongoDB Connection Issues
- Verify MongoDB Atlas connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas (Network Access → Add IP → Allow Access from Anywhere for testing)
- Ensure database user has read/write permissions

#### API Connection Failed
- Verify `REACT_APP_API_URL` points to correct backend URL
- Make sure backend URL ends with `/api`
- Check backend logs in Vercel Dashboard → Your Project → Functions

#### Environment Variables Not Working
- Environment variables must start with `REACT_APP_` for React frontend
- After adding/changing env vars, you MUST redeploy
- Use `vercel env pull` to verify environment variables locally

---

## Continuous Deployment (Optional)

### Connect to GitHub

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. For each project (frontend and backend):
   - Project Settings → Git
   - Connect GitHub repository
   - Set root directory:
     - Frontend: `./` (root)
     - Backend: `./full-stack-auth/server`

3. **Auto-deploy on push**:
   - Every push to `main` branch will trigger automatic deployment
   - Environment variables are preserved across deployments

---

## Local Development After Deployment

Keep using localhost for development:

```bash
# Terminal 1 - Backend
cd full-stack-auth/server
npm start

# Terminal 2 - Frontend
cd ../..
npm start
```

Your `.env.local` file ensures local development uses `http://localhost:5000/api`.

---

## Security Checklist

- [ ] `.env` files are in `.gitignore`
- [ ] MongoDB Atlas has network access restrictions
- [ ] JWT_SECRET is a strong random string
- [ ] Production URLs use HTTPS
- [ ] Environment variables are set in Vercel Dashboard (not hardcoded)

---

## Useful Commands

```bash
# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# Pull environment variables for local testing
vercel env pull

# Check which project you're in
vercel whoami
```

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://www.mongodb.com/docs/atlas/
- **React Deployment**: https://create-react-app.dev/docs/deployment/

Your Moodify app should now be live! 🎉
