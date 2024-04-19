import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("venues", (table: any) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable();
    table.string("location").notNullable();
    table.string("map_url").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("venues");
}
