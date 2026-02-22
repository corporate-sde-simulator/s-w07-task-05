# PR Review - Cache warming strategy engine (by Deepak Gupta)

## Reviewer: Pooja Reddy
---

**Overall:** Good foundation but critical bugs need fixing before merge.

### `cacheWarmer.js`

> **Bug #1:** Priority scoring sorts ascending when it should sort descending so least important keys warmed first
> This is the higher priority fix. Check the logic carefully and compare against the design doc.

### `warmingStrategy.js`

> **Bug #2:** Batch warming fires all requests simultaneously with no concurrency control and overwhelms the source
> This is more subtle but will cause issues in production. Make sure to add a test case for this.

---

**Deepak Gupta**
> Acknowledged. I have documented the issues for whoever picks this up.
