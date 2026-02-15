# Xcode Shipping Checklist — LowKeyMode 3:30 PM

## Pre-Flight (Before 3:30 PM)

### Code Status
- [ ] All features complete for v1.0
- [ ] No compiler warnings (treat warnings as errors)
- [ ] Unit tests passing (if any)
- [ ] Debug prints removed
- [ ] API keys moved to environment/config (not hardcoded)

### Assets
- [ ] App icons (all sizes: 1024pt, 180pt, 120pt, etc.)
- [ ] Launch screen finalized
- [ ] Screenshots for App Store (5.5" + 6.5" + iPad if universal)
- [ ] App preview video (optional but recommended)

### Signing & Provisioning
- [ ] Bundle ID confirmed: `com.yourname.lowkeymode`
- [ ] Signing certificate valid (not expiring within 30 days)
- [ ] Provisioning profile: App Store Distribution
- [ ] Capabilities match entitlements (HealthKit, Notifications, etc.)

### App Store Connect
- [ ] App record created
- [ ] App name reserved
- [ ] Primary category selected (Health & Fitness)
- [ ] Secondary category selected (Lifestyle)
- [ ] Privacy policy URL ready
- [ ] Support URL ready
- [ ] Marketing URL ready (optional)

---

## Build & Archive (3:30 PM - 4:00 PM)

### Clean Build
```bash
# Terminal commands if using xcodebuild
xcodebuild clean -project LowKeyMode.xcodeproj -scheme LowKeyMode
xcodebuild archive -project LowKeyMode.xcodeproj -scheme LowKeyMode -archivePath ~/Desktop/LowKeyMode.xcarchive
```

### Archive in Xcode
1. Select "Any iOS Device (arm64)" as target
2. Product → Archive
3. Wait for build (grab coffee ☕)
4. Archives window opens automatically

### Validate Archive
1. Click "Distribute App"
2. Select "App Store Connect"
3. Select "Upload"
4. Let Xcode validate (catches 90% of issues)

---

## Upload (4:00 PM - 4:30 PM)

### Upload Options

**Option A: Xcode Upload (Recommended)**
1. Distribute App → Upload
2. Sign in with Apple ID
3. Select team
4. Wait for upload (5-15 min depending on size)
5. Check "Upload to App Store Connect"

**Option B: Transporter App**
- Use if Xcode upload fails
- Export .ipa from Organizer
- Drag to Transporter
- Click Deliver

### Post-Upload Verification
- [ ] Build shows in App Store Connect (Processing → Ready)
- [ ] Build number matches (1.0.0 build 1)
- [ ] No red error badges

---

## App Store Submission (4:30 PM - 5:00 PM)

### Metadata
- [ ] App name: LowKeyMode
- [ ] Subtitle: "Sleep & meditation tracking"
- [ ] Promotional text: "Track your sleep patterns and meditation sessions. Get insights to improve your rest."
- [ ] Description (full):
```
LowKeyMode helps you understand and improve your sleep and meditation practice.

FEATURES:
• Sleep tracking with HealthKit integration
• Meditation session timer with guided prompts
• Daily insights and trends
• Export data for analysis
• Privacy-first: your data stays on your device

Perfect for anyone looking to build better rest habits.

Questions? Contact us at support@lowkeymode.app
```
- [ ] Keywords: sleep, meditation, health, wellness, tracking, mindfulness

### Screenshots (Required)
- [ ] iPhone 6.7" (1290 x 2796) - 3-5 screenshots
- [ ] iPhone 6.5" (1284 x 2778) - 3-5 screenshots
- [ ] iPhone 5.5" (1242 x 2208) - 3-5 screenshots
- [ ] iPad (if universal) - 3-5 screenshots

**Screenshot ideas:**
1. Home/dashboard view
2. Sleep tracking screen
3. Meditation timer
4. Trends/insights chart
5. Settings/privacy screen

### App Review Information
- [ ] Contact info (your email + phone)
- [ ] Demo account: N/A (no login required)
- [ ] Notes for reviewer:
```
This app uses HealthKit to read sleep data. 
All processing is done on-device.
No user accounts or backend required.
```

---

## Final Review & Submit (5:00 PM)

### Pre-Submit Checklist
- [ ] All metadata filled
- [ ] Screenshots uploaded
- [ ] Build selected ("Add to Review")
- [ ] Pricing: Free or $X.99
- [ ] Availability: All countries or select
- [ ] Content ratings: Set appropriately
- [ ] App Privacy details: Data types collected (HealthKit)

### Submit for Review
1. Click "Submit for Review"
2. Answer export compliance: "No" (uses standard encryption)
3. Answer advertising identifier: "No" (unless using AdMob)
4. Confirm content rights
5. Submit

### Post-Submit
- [ ] Screenshot confirmation page (save for records)
- [ ] Note the submission ID
- [ ] Check email for confirmation
- [ ] Set calendar reminder: Review typically 24-48 hours

---

## Common Rejection Reasons (Avoid These)

### Technical
- [ ] Crashes on launch
- [ ] Broken links in app
- [ ] Placeholder content visible
- [ ] App doesn't function as described
- [ ] Sign-in required but no demo account provided

### Metadata
- [ ] Screenshots don't match app UI
- [ ] Description mentions "beta" or "test"
- [ ] Keywords spam (repeating words)
- [ ] Missing privacy policy

### Guidelines
- [ ] HealthKit usage not justified in description
- [ ] Background location without clear need
- [ ] Push notifications without opt-in
- [ ] In-app purchase without restore button

---

## Emergency Contacts & Resources

**If upload fails:**
- Check Apple System Status: https://developer.apple.com/system-status/
- Try Transporter app instead of Xcode
- Restart Xcode and try again

**If rejected:**
- Read rejection reason carefully
- Fix specific issue
- Reply to reviewer in Resolution Center
- Resubmit (goes to front of queue if minor fix)

**Helpful Links:**
- App Store Review Guidelines: https://developer.apple.com/app-store/review/guidelines/
- TestFlight Beta Testing: https://testflight.apple.com/
- App Store Connect: https://appstoreconnect.apple.com/

---

## Post-Launch (After Approval)

- [ ] Announce on Twitter/LinkedIn
- [ ] Submit to Product Hunt
- [ ] Share with beta testers
- [ ] Monitor crash reports (Xcode → Organizer → Crashes)
- [ ] Watch reviews and respond
- [ ] Plan v1.1 features

**GOOD LUCK! ⚡**
