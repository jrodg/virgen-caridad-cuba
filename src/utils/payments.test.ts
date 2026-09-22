import {
  buildCashAppUrl,
  buildPaypalUrl,
  buildVenmoUrl,
  getConfiguredMethods,
  parseCashTag,
  parseVenmoHandle,
} from "./payments";

test("builds paypal, venmo, and cash app payment links", () => {
  expect(buildPaypalUrl("gifts@example.com", 25)).toContain("paypal.com/donate");
  expect(buildPaypalUrl("https://paypal.me/cobre", 10)).toBe("https://paypal.me/cobre/10.00");
  expect(parseVenmoHandle("@CachitaNJ")).toBe("CachitaNJ");
  expect(parseVenmoHandle("https://venmo.com/u/CachitaNJ")).toBe("CachitaNJ");
  expect(buildVenmoUrl("@CachitaNJ", 25)).toContain("venmo.com/CachitaNJ");
  expect(buildVenmoUrl("@CachitaNJ", 25)).toContain("amount=25.00");
  expect(parseCashTag("$cobre")).toBe("cobre");
  expect(buildCashAppUrl("$cobre", 50)).toBe("https://cash.app/$cobre/50.00");
  expect(
    getConfiguredMethods({
      headline: "",
      blurb: "",
      paypalUrl: "gifts@example.com",
      venmoUrl: "@CachitaNJ",
      cashAppUrl: "",
      zelleHandle: "gifts@example.com",
      amounts: [10],
    })
  ).toEqual(["paypal", "venmo", "zelle"]);
});
