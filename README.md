# Kaleidoscope

Ka-zing ka-zop kada-bing kada-bop
code is in extension/
enjoy

Core of the extension is in popup.js, code has been minified as it had a significantly faster load time
during local testing.

Bug found at roughly 6:55 (no time to fix):
Sometimes the extension will get stuck and only find the debt limit keywords shown in the demo due to an issue
with the XMLHTTPRequest format handling in older versions of Chrome.
If this happens, make sure your Chrome is on the latest version (dev/beta) to enable NLP processing,
and update your browser content security policy.
