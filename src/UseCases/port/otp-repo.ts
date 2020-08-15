import Otp from "../../Entities/otp.ts";

export default interface OtpRepo {
  create(phoneNumber: string, otp: Otp): void;
  findLastByPhoneNumber(phoneNumber: string): Otp | undefined;
}
