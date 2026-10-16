import assert from 'node:assert/strict';
import test from 'node:test';
import { bookingSchema } from '../src/features/booking/schema.ts';

const validRequest = {
  service: 'Horoscope consultation',
  mode: 'Video call',
  language: 'Tamil',
  date: '2027-01-15',
  period: 'Morning',
  name: 'Test Visitor',
  email: 'visitor@example.com',
  phone: '+91 9999999999',
  note: '',
  consent: true,
};

test('accepts both consultation types without changing submitted preferences', () => {
  for (const service of ['Horoscope consultation', 'Marriage compatibility']) {
    const request = { ...validRequest, service };
    assert.deepEqual(bookingSchema.parse(request), request);
  }
});

test('retains the existing contact-field whitespace normalization', () => {
  const result = bookingSchema.parse({
    ...validRequest,
    name: '  Test Visitor  ',
    email: ' visitor@example.com ',
    phone: ' +91 9999999999 ',
    note: ' A question ',
  });
  assert.equal(result.name, 'Test Visitor');
  assert.equal(result.email, 'visitor@example.com');
  assert.equal(result.phone, '+91 9999999999');
  assert.equal(result.note, 'A question');
});

for (const [field, value] of [
  ['service', 'Unsupported service'],
  ['mode', 'In person'],
  ['language', 'Unsupported language'],
  ['period', 'Midnight'],
  ['date', '15/01/2027'],
  ['name', 'A'],
  ['email', 'not-an-email'],
  ['phone', 'invalid-phone'],
  ['note', 'x'.repeat(1001)],
  ['consent', false],
]) {
  test(`rejects invalid ${field}`, () => {
    assert.equal(bookingSchema.safeParse({ ...validRequest, [field]: value }).success, false);
  });
}

test('consent must be explicitly supplied', () => {
  const request = { ...validRequest };
  delete request.consent;
  assert.equal(bookingSchema.safeParse(request).success, false);
});
