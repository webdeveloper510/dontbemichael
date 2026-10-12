'use strict';

/**
 * Company profile text stays at 14px or more (issue 196). Setup and Settings
 * share this form. Smaller labels were the last setup text under the owner's
 * size floor.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const src = fs.readFileSync(path.resolve(__dirname, '../src/renderer/src/components/CompanyProfileFields.tsx'), 'utf8');

test('company profile labels, hints, headings and fields are 14px', () => {
  // Value: protects=the business form stays readable; fails_when=a label drops back under 14px; why_new=issue 196; seam=none
  assert.doesNotMatch(src, /fontSize:\s*(?:1[0-3]|11\.5)\b/);
  assert.match(src, /fontSize: 14, lineHeight: '20px', fontWeight: 600/);
});
