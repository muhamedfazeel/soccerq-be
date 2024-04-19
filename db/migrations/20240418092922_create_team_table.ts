import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("team", (table: any) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable();
    table.bigint("manager_id").inTable("sq_user").refer;
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("team");
}
