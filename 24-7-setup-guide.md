# 24/7 OpenClaw Setup Guide

## Your Use Cases
- ✅ Always-available assistant
- ✅ Automated tasks
- ✅ Remote access from anywhere
- ✅ Brand watching/monitoring
- ✅ Security/attack prevention

---

## Hardware Options

### Option 1: Raspberry Pi 5 (8GB) — **RECOMMENDED**
**Cost:** $80 + $15 (power supply) + $20 (case/SD card) = ~$115 total

**Pros:**
- Low power consumption (~$2-3/month electricity)
- Silent, cool, reliable
- Perfect for 24/7 operation
- Can run Ollama with smaller models
- ARM-native efficiency

**Cons:**
- Upfront hardware cost
- Need to set up from scratch

**Power consumption:** ~5-10W

---

### Option 2: Your Windows PC (8GB RAM, 1TB)
**Cost:** $0 (already have it)

**Pros:**
- No upfront cost
- More powerful than Pi
- NVIDIA GPU (useful for local AI tasks)
- 1TB storage for logs/data

**Cons:**
- High power consumption (~150W = $15-20/month)
- Noisier/hotter
- Older hardware

**Recommended if:** You're already leaving it on 24/7

---

### Option 3: Cloud VPS
**Cost:** $5-10/month

**Providers:**
- **Hetzner Cloud** (best value): €4.51/month (2 vCPU, 4GB RAM, 40GB SSD)
- **DigitalOcean**: $6/month (1 vCPU, 2GB RAM, 25GB SSD)
- **Linode**: $5/month (1 vCPU, 1GB RAM, 25GB SSD)
- **Vultr**: $6/month (1 vCPU, 2GB RAM, 55GB SSD)

**Pros:**
- No home hardware needed
- Always online (99.9% uptime)
- No power/network concerns
- Easy to upgrade

**Cons:**
- Monthly cost
- No local Ollama (too expensive to run large models)
- Privacy concerns (data in cloud)

---

## Remote Access Setup

### Tailscale (Recommended)
**Why:** Free, secure, encrypted, works behind NAT/firewalls

**Setup:**
1. Install Tailscale on your 24/7 machine
   ```bash
   # macOS/Linux
   curl -fsSL https://tailscale.com/install.sh | sh
   
   # Or: brew install tailscale
   ```

2. Enable Tailscale mode in OpenClaw:
   ```bash
   # Edit config or restart with flag
   openclaw gateway restart --tailscale serve
   ```

3. Access from anywhere via Tailscale:
   - Install Tailscale on your phone/laptop
   - Connect to your 24/7 machine's Tailscale IP
   - OpenClaw accessible securely

**Alternative:** Port forwarding (less secure, not recommended)

---

## Automated Tasks Setup

### 1. Cron Jobs (Scheduled Tasks)
OpenClaw has built-in cron for automation:

```bash
# Add a cron job via cron tool
# Examples:
- Check email every 30 min
- Monitor brand mentions hourly
- Daily security scan
- Website uptime checks
```

See: `openclaw cron --help`

### 2. Heartbeat Monitoring
Edit `HEARTBEAT.md` with tasks to check periodically:

```markdown
# HEARTBEAT.md

## Tasks to Check (rotate through)
- [ ] Check email (unread count, urgent keywords)
- [ ] Monitor Twitter mentions (@codemode, @yourhandle)
- [ ] Check website uptime (codemode.app, baselinedesigns.com)
- [ ] Review security logs
- [ ] Check GitHub notifications
```

### 3. Brand Watching
Tools to integrate:
- **Twitter API** — monitor mentions, hashtags
- **Google Alerts** — brand name monitoring
- **Uptime Robot** — website monitoring (free tier)
- **GitHub webhooks** — repo activity
- **RSS feeds** — blog/news monitoring

---

## Brand Watching Strategy

### What to Monitor
1. **Social media mentions:**
   - Twitter: @codemode, "codemode app", "Low Key Mode"
   - Reddit: relevant subreddits
   - Hacker News: Show HN, product launches

2. **Website analytics:**
   - Unusual traffic spikes
   - 404 errors
   - Server errors

3. **Competitor activity:**
   - New features
   - Marketing campaigns
   - Pricing changes

4. **Domain/brand squatting:**
   - Similar domain registrations
   - Trademark issues

### Tools to Use
- **F5Bot** (free Reddit/HN monitoring)
- **Brand24** (paid, comprehensive)
- **Google Alerts** (free, basic)
- **Twitter API** (free tier exists)
- **Uptime Robot** (free website monitoring)

---

## Security & Attack Prevention

### 1. Rate Limiting
Already configured in OpenClaw gateway

### 2. Firewall Rules
```bash
# macOS firewall
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on

# Only allow specific IPs (Tailscale network)
```

### 3. Monitoring
- **Fail2ban** (Linux) — auto-ban suspicious IPs
- **Log monitoring** — watch for brute force attempts
- **Uptime monitoring** — detect DDoS/outages

### 4. Regular Updates
```bash
# Keep OpenClaw updated
npm update -g openclaw

# System updates
# macOS: System Settings → Software Update
# Linux: apt update && apt upgrade
```

### 5. Backup Strategy
- Daily automated backups of workspace
- Cloud backup (iCloud, Dropbox, etc.)
- Configuration snapshots

---

## Recommended 24/7 Setup for Your Situation

### Short-term (Now)
**Use your Windows PC:**
1. Keep it running 24/7
2. Install Node.js + OpenClaw
3. Enable Tailscale for remote access
4. Set up cron jobs for brand monitoring
5. Configure heartbeat tasks

**Cost:** ~$15-20/month electricity

### Long-term (Next month)
**Get a Raspberry Pi 5:**
1. Set up Pi with OpenClaw
2. Run smaller Ollama models locally
3. Migrate automation to Pi
4. Lower power costs to ~$2-3/month

**Cost:** $115 one-time + $2-3/month

### Alternative (Cloud)
**Hetzner VPS:**
1. Deploy OpenClaw to VPS
2. Use cloud APIs only (no Ollama)
3. Set up monitoring/automation
4. Access from anywhere

**Cost:** €4.51/month (~$5)

---

## Next Steps

1. [ ] Choose hardware approach (Windows PC / Pi / VPS)
2. [ ] Install Tailscale for remote access
3. [ ] Configure OpenClaw cron jobs
4. [ ] Set up HEARTBEAT.md with monitoring tasks
5. [ ] Integrate brand monitoring tools
6. [ ] Test security measures
7. [ ] Create backup routine

---

## Questions?
Let me know which approach you want to take and I can help with setup!
