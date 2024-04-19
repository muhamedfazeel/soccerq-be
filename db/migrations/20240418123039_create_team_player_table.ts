import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("team_player_relation", (table: any) => {
    table.bigIncrements("id").primary();
    table.bigint("player_id").references("id").inTable("sq_user").notNullable();
    table.bigint("team_id").references("id").inTable("team").notNullable();
    table.unique(["player_id", "team_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("team_player_relation");
}
