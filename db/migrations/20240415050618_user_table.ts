import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("sq_user", (table: any) => {
    table.bigIncrements("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("img_url").notNullable();
    table.boolean("is_active").defaultTo(true);
    table.boolean("is_player").defaultTo(true);
    table.bigint("updated_by").defaultTo(null);
    table
      .timestamp("created_at", { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
    table
      .timestamp("updated_at", { useTz: true })
      .defaultTo(knex.fn.now())
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("sq_user");
}
