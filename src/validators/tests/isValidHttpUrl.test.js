const { describe, expect, test } = require('@jest/globals');
const isValidHttpUrl = require('../isValidHttpUrl');

describe('isValidHttpUrl', () => {
  describe('should return', () => {
    describe('true when given', () => {
      verifyIsValidHttpUrlTrue('http://..');

      verifyIsValidHttpUrlTrue('https://example..com');

      verifyIsValidHttpUrlTrue('https://www.youtube.com/');

      verifyIsValidHttpUrlTrue(
        'https://www.google.com/search?q=google&tbm=isch&ved=2ahUKEwjBxdDt-KLyAhVlrHIEHStsAqIQ2-cCegQIABAA&oq=google&gs_lcp=CgNpbWcQAzIECCMQJzIECAAQQzIICAAQgAQQsQMyCAgAEIAEELEDMgUIABCABDIICAAQgAQQsQMyBQgAEIAEMgUIABCABDIFCAAQgAQyCAgAEIAEELEDOgcIABCxAxBDUM0SWNMWYNgXaABwAHgAgAFJiAGIA5IBATaYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=upkQYcGAF-XYytMPq9iJkAo&bih=880&biw=1920&rlz=1C1CHBF_enCA947CA947#imgrc=acTTLzzqMzW0NM'
      );
    });

    describe('false when given', () => {
      verifyIsValidHttpUrlFalse(null);

      verifyIsValidHttpUrlFalse(123);

      verifyIsValidHttpUrlFalse({});

      verifyIsValidHttpUrlFalse([]);

      verifyIsValidHttpUrlFalse(new Date());

      verifyIsValidHttpUrlFalse('garbage');

      verifyIsValidHttpUrlFalse('www.example.com');

      verifyIsValidHttpUrlFalse('javascript:void(0)');
    });
  });
});

function verifyIsValidHttpUrlTrue(val) {
  test(JSON.stringify(val), () => {
    expect(isValidHttpUrl(val)).toBe(true);
  });
}

function verifyIsValidHttpUrlFalse(val) {
  test(JSON.stringify(val), () => {
    expect(isValidHttpUrl(val)).toBe(false);
  });
}
