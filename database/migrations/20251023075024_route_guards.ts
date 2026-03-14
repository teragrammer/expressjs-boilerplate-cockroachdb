import type {Knex} from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("route_guards", table => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

        table.uuid("role_id").index().notNullable();
        table.foreign("role_id")
            .references("roles.id")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");

        table.string("route", 100).notNullable();

        table.dateTime("created_at").index().defaultTo(knex.fn.now()).nullable();
        table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("route_guards");
}
