'use strict';

/**
 * Four small setup fixes: buttons do not submit forms, the last setup step
 * says why Open the office is off, and the Meet and Permissions text is 14px.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const read = (p) => fs.readFileSync(path.resolve(__dirname, '..', p), 'utf8');

test('a PixelButton is type button unless a caller asks otherwise', () => {
  // Value: protects=a button click does not submit a form; fails_when=the button has no type; why_new=the HTML default is submit; seam=none
  const src = read('src/renderer/src/components/PixelButton.tsx');
  assert.match(src, /type = 'button'/);
  assert.match(src, /<button\s+type=\{type\}/);
});

test('the last setup step says why Open the office is off', () => {
  // Value: protects=a grey Open the office button is explained; fails_when=the hint is dropped; why_new=the button was disabled with no reason; seam=none
  const wizard = read('src/renderer/src/components/OnboardingWizard.tsx');
  assert.match(wizard, /data-open-office-hint/);
  assert.match(wizard, /step === 'ready' && !engineReady && \(/);
  for (const loc of ['en', 'zh-CN', 'ar']) {
    const hint = JSON.parse(read(`src/renderer/src/i18n/locales/${loc}.json`)).engineSetup.openOfficeHint;
    assert.equal(typeof hint, 'string', loc);
    assert.ok(hint.length > 10, loc);
  }
});

test('the Meet step greeting and rows are 14px', () => {
  // Value: protects=the Meet step stays readable; fails_when=the greeting drops under 14px; why_new=setup text floor; seam=none
  const wizard = read('src/renderer/src/components/OnboardingWizard.tsx');
  assert.match(wizard, /fontSize: 14, lineHeight: '20px'\s*\}\}>\{t\('onboarding\.welcome\.headline'\)\}/);
  assert.match(wizard, /fontSize: 14, lineHeight: '20px', fontWeight: 600, color: 'var\(--cth-ink\)' \}\}>\{t\(f\.labelKey, \{ godName \}\)\}/);
});

test('the cannot start card and the Permissions headings are 14px', () => {
  // Value: protects=the signed out card and Permissions stay readable; fails_when=either drops under 14px; why_new=setup text floor; seam=none
  const card = read('src/renderer/src/components/EngineSetupCard.tsx');
  assert.match(card, /fontSize: 14, fontWeight: 600, lineHeight: '20px'/);
  assert.match(card, /fontSize: 14, lineHeight: '20px', color: 'var\(--cth-ink-2\)'/);
  const wizard = read('src/renderer/src/components/OnboardingWizard.tsx');
  assert.match(wizard, /fontSize: 14, lineHeight: '20px', fontWeight: 600, color: 'var\(--cth-ink-2\)' \}\}>\s*\{t\('onboarding\.permissions\.autonomyHead'\)\}/);
  assert.match(wizard, /fontSize: 14, lineHeight: '20px', fontWeight: 600, color: 'var\(--cth-ink-2\)' \}\}>\s*\{t\('onboarding\.permissions\.reliabilityHead'\)\}/);
});
