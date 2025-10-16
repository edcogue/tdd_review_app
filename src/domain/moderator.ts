import "reflect-metadata";
import { injectable } from "tsyringe";

@injectable()
export class Moderator {
  private readonly profanityWords = [
    "badword",
    "damn",
    "hell",
    "crap",
    "stupid",
    "idiot",
    "moron",
    "jerk",
    "loser",
    "freak",
    "weirdo",
    "creep",
    "fool",
    "dumb",
    "lame",
    "suck",
    "hate",
    "kill",
    "die",
    "gross",
    "ugly",
    "fat",
    "skinny",
    "short",
    "tall",
    "bald",
    "smelly",
    "dirty",
    "nasty",
    "disgusting",
    "awful",
    "terrible",
    "horrible",
    "pathetic",
    "worthless",
  ];
  private readonly minLength = 10;

  validateMessage(content: string): void {
    if (content.length < this.minLength) {
      throw new Error(
        `Content must be at least ${this.minLength} characters long`
      );
    }

    const containsProfanity = this.profanityWords.some((word) =>
      content.toLowerCase().includes(word.toLowerCase())
    );

    if (containsProfanity) {
      throw new Error("Content contains profanity and is not allowed");
    }
  }
}
