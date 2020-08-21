import OtpRepo from "../../../../../src/UseCases/port/otp-repo.ts";
import Otp from "../../../../../src/Entities/otp.ts";
import { ShaAlg } from "../../../../../src/Entities/sha-alg.ts";

export default class InMemoryOtpRepoFake implements OtpRepo {
  private otps: { phoneNumber: String; otp: Otp }[] = [
    {
      phoneNumber: "966501766628",
      otp: {
        token: "1234",
        secret: "secret1234",
        alg: ShaAlg.sha1,
        timeInterval: 5,
        digits: 4,
      },
    },
    {
      phoneNumber: "966501766628",
      otp: {
        token: "5678",
        secret: "secret5678",
        alg: ShaAlg.sha1,
        timeInterval: 5,
        digits: 4,
      },
    },
  ];

  create(phoneNumber: string, otp: Otp): void {
    this.otps.push({ phoneNumber: phoneNumber, otp: otp });
  }
  findLastByPhoneNumber(phoneNumber: string): Otp | undefined {
    return this.otps.reverse().find((otp) => otp.phoneNumber === phoneNumber)
      ?.otp;
  }
}
