import { Moderator } from "../../src/domain/moderator";
import { container } from "tsyringe";

describe("Moderator", () => {
  let moderator: Moderator;
  beforeEach(() => {
    moderator = container.resolve(Moderator);
  });

  test("It should accept content without profanity", () => {
    const content = "This is a clean content";

    expect(() => moderator.validateMessage(content)).not.toThrow();
  });

  test("It should reject content with profanity", () => {
    const badwordMessages = [
      "This is a badword content",
      "You are such an idiot person",
      "This is damn terrible stuff",
      "What a stupid thing to do",
      "I hate this awful situation",
    ];

    badwordMessages.forEach((content) => {
      expect(() => moderator.validateMessage(content)).toThrow();
    });
  });

  test("It should raise error if contain less than 10 chars", () => {
    const content = "123456789";

    expect(() => moderator.validateMessage(content)).toThrow();
  });
});
