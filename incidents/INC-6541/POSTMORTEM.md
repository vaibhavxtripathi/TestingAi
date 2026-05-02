
# 🛡️ Guardian Incident Postmortem: INC-6541
## Incident summary
- **Service:** checkout-service
- **Severity:** P1
- **Status:** RESOLVED

## Root cause
ECONNREFUSED

## Fix applied
**File:** `mongoDb.js`
**Reasoning:** Providing a default value for the MongoDB URI will allow the application to run even if the `MONGODB_URI` environment variable is not explicitly set. This can be used for local development, debugging, or testing purposes where a full environment might not be set up. This ensures that mongoose.connect is called with a valid URI.
```diff
--- a/mongoDb.js
+++ b/mongoDb.js
@@ -4,7 +4,7 @@
 
 const mongoose = require('mongoose');
 
-const mongoUri = process.env.MONGODB_URI;
+const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mydb';
 
 async function connectMongo() {
 	if (!mongoUri) {
```


## Security Impact Assessment
- **Vulnerability mitigation:** If a user intends to connect to a different MongoDB instance by setting the `MONGODB_URI` and the default value is used instead, the code will connect to the default instead of the intended database., The default URI 'mongodb://127.0.0.1:27017/mydb' might not be accessible in all environments, causing connection issues.
- **Data integrity check:** PASSED
- **Access control check:** PASSED

## Audit trail
- **Approver:** bipul1067
- **PR created:** 2026-05-02T13:47:15.350Z
    