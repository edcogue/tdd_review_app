import "reflect-metadata";
import { injectable } from "tsyringe";

@injectable()
export class Anonymizer {
  public anonymizeName(fullName: string): string {
    const names = fullName.split(" ");
    if (names.length < 2) {
      return fullName;
    }
    const firstName = names[0];
    const lastNameInitial = names[1]?.charAt(0).toUpperCase();
    return `${firstName} ${lastNameInitial}.`;
  }

  public anonymizeEmail(email: string): string {
    if (!email.includes("@")) {
      throw Error("Invalid email");
    }
    const [localPart, domain] = email.split("@");
    if (!localPart || localPart.trim() === "") {
      throw Error("Invalid email");
    }
    const halfLength = Math.floor(localPart.length / 2);
    const maskedLocalPart = localPart.slice(0, halfLength) + "****";
    return `${maskedLocalPart}@${domain}`;
  }
}
