import "mysql2/promise";
import type { FieldPacket, QueryResult } from "mysql2";

declare module "mysql2/promise" {
  interface Pool {
    execute<T extends QueryResult>(
      sql: string,
      values?: unknown[],
    ): Promise<[T, FieldPacket[]]>;
  }
}
