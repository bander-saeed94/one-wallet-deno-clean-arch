import IdGenerator from "../../core/usecase/port/id-generator.ts";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

export default class UUIDGenerator implements IdGenerator {
  generate(): string {
    return v4.generate();
  }
}
