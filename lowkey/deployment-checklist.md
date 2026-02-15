# LowkeyMode v1 — Deployment Checklist

## Pre-Launch

### Code
- [ ] All features working locally
- [ ] No hardcoded secrets (use environment variables)
- [ ] Error handling in place
- [ ] Crash reporting set up (Sentry or similar)
- [ ] Analytics (privacy-friendly: Plausible, or none)

### iOS App
- [ ] App icons (all sizes)
- [ ] Launch screen
- [ ] App Store screenshots (6.7", 6.5", 5.5")
- [ ] App preview video (optional but helps)
- [ ] Privacy policy URL (required)
- [ ] Support URL (required)
- [ ] App Store description + keywords
- [ ] Age rating questionnaire completed
- [ ] Test on real device (not just simulator)
- [ ] TestFlight build uploaded
- [ ] Internal testing passed
- [ ] External TestFlight testers (optional)

### Web App
- [ ] Build production bundle
- [ ] Test production build locally
- [ ] Cloudflare Pages project created
- [ ] Custom domain configured (if ready)
- [ ] SSL working
- [ ] Meta tags (title, description, OG image)
- [ ] Favicon

### Legal
- [ ] Privacy policy written (no data stored = simple)
- [ ] Terms of service (basic)
- [ ] GDPR compliance (if EU users)

---

## App Store Submission

### Apple Developer Account
- [ ] Enrolled ($99/year)
- [ ] Certificates created (distribution)
- [ ] Provisioning profiles set up
- [ ] App ID registered

### App Store Connect
- [ ] Create new app
- [ ] Fill all metadata
- [ ] Upload build from Xcode
- [ ] Select build for review
- [ ] Submit for review

### Common Rejection Reasons (Avoid These)
- [ ] App crashes on launch — test thoroughly
- [ ] Incomplete features — remove or hide unfinished stuff
- [ ] Placeholder content — no "lorem ipsum"
- [ ] Missing login demo account (if applicable)
- [ ] Privacy policy doesn't match app behavior
- [ ] No value beyond website wrapper — ensure native features

---

## Post-Submission

- [ ] Monitor App Store Connect for review status
- [ ] Respond quickly if Apple requests info
- [ ] Prepare v1.1 with fixes for any feedback

---

## Launch Day

- [ ] App approved → release manually or auto
- [ ] Web app live on Cloudflare
- [ ] Test download from App Store
- [ ] Test web app on multiple browsers
- [ ] Announce to early community
- [ ] Monitor for crashes/issues

---

## v1 Feature Scope (Keep It Minimal)

### Must Have
- [ ] dB/Hz measurement
- [ ] Basic meditation timer
- [ ] Clean UI

### Nice to Have (v1.1+)
- [ ] Community link (Telegram)
- [ ] Quiet score sharing
- [ ] Streak tracking

### Later (v2+)
- [ ] Backend sync
- [ ] User accounts
- [ ] In-app community
- [ ] Ambassador/referral system
