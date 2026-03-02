# Jared Stoddard Portfolio

Client-side React Router app built with Vite and TailwindCSS, written in JavaScript (no TypeScript).

## Available scripts
- `npm run dev` — start the Vite dev server with HMR.
- `npm run build` — build the production bundle.
- `npm run preview` — preview the production build locally.

## Project structure
- `index.html` — Vite entry HTML with global metadata and font links.
- `app/main.jsx` — application entry that mounts the router.
- `app/router.jsx` — standard React Router config using `createBrowserRouter`.
- `app/pages/Home.jsx` — home route that renders the portfolio.
- `app/pages/PortfolioPageV2.jsx` — alternate portfolio layout available at `/v2`.
- `app/components/PortfolioPage.jsx` — main portfolio layout and content.

## Styling
TailwindCSS 4 is enabled via `app/app.css`; extend the theme there as needed.

## Deployment & Analytics

### Microsoft Clarity Setup
The app uses Microsoft Clarity for session recordings and analytics.

#### Environment Variables
Set this in your deployment environment:
- `VITE_CLARITY_PROJECT_ID` — Your Microsoft Clarity project ID (found in your Clarity dashboard)

Create a `.env` file in your project root:
```
VITE_CLARITY_PROJECT_ID=your_actual_project_id_here
```

#### Setup Steps
1. Create a Microsoft Clarity account at [clarity.microsoft.com](https://clarity.microsoft.com)
2. Create a new project for your portfolio
3. **Find your Project ID**:
   - Go to your Clarity dashboard
   - Click on "Settings" in the left sidebar
   - Select "Project settings"
   - Copy the "Project ID" (it looks like a long alphanumeric string)
4. Set `VITE_CLARITY_PROJECT_ID` to this value in your deployment environment

#### Privacy & Compliance
Clarity automatically handles GDPR compliance and provides privacy controls. Session recordings are stored securely and can be configured to exclude sensitive data.

### Analytics Verification
After deployment, verify Clarity is working:

1. **Set environment variable** (create `.env` file):
   ```
   VITE_CLARITY_PROJECT_ID=your_actual_project_id_here
   ```

2. **Check console for initialization**:
   - Open browser DevTools (F12) → Console tab
   - Look for: `[Clarity] Initialized with project ID: abc123...`
   - If you see the warning instead: `[Clarity] VITE_CLARITY_PROJECT_ID not set. Analytics disabled.`

3. **Verify Clarity is loaded** (in browser console):
   ```javascript
   // Check if Clarity script is loaded
   console.log('Clarity loaded:', typeof window.clarity === 'function');

   // Check if project ID is set
   console.log('Project ID:', import.meta.env.VITE_CLARITY_PROJECT_ID);
   ```

4. **Test session recording**:
   - Navigate through different pages of your portfolio
   - Click buttons, scroll, interact with elements
   - Wait 5-10 minutes for data to process

5. **Check Clarity dashboard**:
   - Go to [clarity.microsoft.com](https://clarity.microsoft.com)
   - Look for new sessions in "Recordings" section
   - Check "Dashboard" for heatmaps and metrics
   - Verify recordings show full page content (not blank screens)

6. **Debug common issues**:
   - **No console message**: Environment variable not set or dev server not restarted
   - **Warning message**: `VITE_CLARITY_PROJECT_ID` is undefined or empty
   - **No recordings**: Project ID might be invalid or privacy settings blocking tracking
   - **Blank recordings**: Check if ad-blocker is blocking Clarity scripts
