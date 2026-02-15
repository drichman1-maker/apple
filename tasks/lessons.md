# Lessons Learned

## 2026-02-08

### Model Configuration
- **Issue:** User mentioned OpenRouter not being used despite config update
- **Lesson:** Config changes only apply to new sessions or when primary model fails
- **Fix:** Clarify when model chain activates; suggest `/new` to test new config

### Pattern Recognition
- Always check current session status (`session_status`) to verify which model is active
- Config changes take effect on restart, not mid-session
- Document hardware constraints (MacBook Air storage) for future reference

---

*(Add new lessons as they emerge)*
