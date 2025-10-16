import { Anonymizer } from "../../src/domain/anonymizer";
import { container } from "tsyringe";

describe("Anonymizer", () => {
  let anonymizer: Anonymizer;
  beforeEach(() => {
    anonymizer = container.resolve(Anonymizer);
  });

  test("It should anonymize full user name and surname", () => {
    const fullName = "John Doe";

    const anonymizedName = anonymizer.anonymizeName(fullName);
    expect(anonymizedName).toBe("John D.");
  });

  test("It should return the same name if there is no surname", () => {
    const fullName = "John";

    const anonymizedName = anonymizer.anonymizeName(fullName);
    expect(anonymizedName).toBe("John");
  });

  test("It should anonymize a mail by removing the middle characters", () => {
    const testCases = [
      { input: "test1234@gmail.com", expected: "test****@gmail.com" },
      { input: "lasmar@gmail.com", expected: "las****@gmail.com" },
    ];

    testCases.forEach(({ input, expected }) => {
      const anonymizedEmail = anonymizer.anonymizeEmail(input);
      expect(anonymizedEmail).toBe(expected);
    });
  });

  test("It should raise and error if email is not valid", () => {
    const invalidEmails = [
      "test1234gmail.com",
      "lasmargmail.com",
      "invalidemail",
    ];
    invalidEmails.forEach((email) => {
      expect(() => anonymizer.anonymizeEmail(email)).toThrow();
    });
  });

  test("It should raise and error if email is an empty string", () => {
    expect(() => anonymizer.anonymizeEmail("")).toThrow();
  });
});
