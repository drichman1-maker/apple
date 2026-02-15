# Affiliate Application Submission Checklist

## Amazon Associates
**Priority:** HIGH  
**Commission:** Electronics 4%, Health 1%  
**Requirements:** 3 qualified sales in 180 days

### Before Applying:
- [ ] Add privacy policy to healthindex.com/privacy
- [ ] Add privacy policy to mactrackr.com/privacy  
- [ ] Add affiliate disclosure to footer of both sites
- [ ] Ensure "About" pages are complete
- [ ] Verify sites are publicly accessible (not just local)

### Application Steps:
1. Go to: https://affiliate-program.amazon.com/
2. Click "Sign Up"
3. Use application text from `amazon-associates-application.md`
4. Submit both sites in same application (or separate if required)
5. Wait 1-3 business days for approval

### Post-Approval:
- [ ] Generate Amazon API keys
- [ ] Add product links to existing content
- [ ] Set up "Shop on Amazon" CTAs
- [ ] Track performance in Amazon dashboard

---

## AWIN (ShareASale)
**Priority:** MEDIUM  
**Commission:** 5-15% (varies by merchant)  
**Requirements:** Quality content, professional site

### Before Applying:
- [ ] Complete all "Before Applying" items for Amazon
- [ ] Add AWIN-specific disclosure language
- [ ] Ensure professional design ( ✅ Done - sites look good)

### Application Steps:
1. Go to: https://www.awin.com/us
2. Click "Publishers" → "Join as a Publisher"
3. Use application text from `awin-shareasale-application.md`
4. Pay $5 network fee (refundable after first commission)
5. Wait 3-5 business days for approval

### Post-Approval:
- [ ] Browse merchant directory for relevant brands
- [ ] Apply to individual merchants (Joovv, Therabody, etc.)
- [ ] Set up deep linking tools
- [ ] Configure conversion tracking

---

## Site Updates Required

### HealthIndex.com
```html
<!-- Add to footer -->
<p>As an Amazon Associate, we earn from qualifying purchases. 
<a href="/privacy">Privacy Policy</a> | 
<a href="/affiliate-disclosure">Affiliate Disclosure</a></p>
```

### MacTrackr.com
```html
<!-- Add to footer -->
<p>As an Amazon Associate, we earn from qualifying purchases. 
<a href="/privacy">Privacy Policy</a> | 
<a href="/affiliate-disclosure">Affiliate Disclosure</a></p>
```

---

## Privacy Policy Deployment

Copy content from `privacy-policy-template.md` to:
- `/var/task/policies/privacy-healthindex.html`
- `/var/task/policies/privacy-mactrackr.html`

Customize:
- [Site Name] → HealthIndex / MacTrackr
- [your-email@domain.com] → douglasrichman1@gmail.com
- [Your Business Name] → Baseline Digital Ventures (or your choice)

---

## Timeline

**Today (Feb 15):**
- Deploy privacy policies
- Add affiliate disclosures
- Submit Amazon Associates application

**This Week (Feb 15-21):**
- Submit AWIN application
- Apply to individual AWIN merchants
- Begin adding affiliate links to content

**Next 30 Days:**
- Generate first 3 Amazon sales
- Optimize link placement based on analytics
- Expand to additional affiliate networks (CJ, Rakuten)

---

## Revenue Projections

**Month 1-3:** $100-500/month  
**Month 4-6:** $500-2,000/month  
**Month 7-12:** $2,000-5,000/month  

*Conservative estimates based on traffic growth and conversion rates*

---

**Ready to submit? Review the application documents and let me know if you need any adjustments before applying.**
