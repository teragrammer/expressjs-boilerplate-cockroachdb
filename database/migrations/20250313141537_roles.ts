import type {Knex} from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("roles", table => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

        table.string("name", 100).notNullable();
        table.string("slug", 100).unique().index().notNullable();
        table.text("description", "tinytext").nullable();
        table.tinyint("is_public", 1).notNullable().defaultTo(0);

        table.tinyint("is_bypass_authorization", 1).defaultTo(0).notNullable();

        table.dateTime("created_at").index().defaultTo(knex.fn.now()).nullable();
        table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("roles");
}

