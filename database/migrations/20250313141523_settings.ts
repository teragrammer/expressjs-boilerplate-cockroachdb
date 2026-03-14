import type {Knex} from "knex";
import {DATA_TYPES} from "../../src/models/setting.model";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("settings", table => {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));

        table.string("name", 100).unique().notNullable();
        table.string("slug", 100).unique().index().notNullable();
        table.text("value").nullable();
        table.text("description", "tinytext").nullable();
        table.enum("type", DATA_TYPES).defaultTo("string");

        table.tinyint("is_disabled", 1).notNullable().defaultTo(0);
        table.tinyint("is_public", 1).notNullable().defaultTo(1);

        table.dateTime("created_at").index().defaultTo(knex.fn.now()).nullable();
        table.dateTime("updated_at").defaultTo(knex.fn.now()).nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("settings");
}

