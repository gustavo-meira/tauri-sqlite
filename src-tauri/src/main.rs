// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_sql::{Migration, MigrationKind};

fn main() {
    let migrations = vec![
        Migration {
            version: 1,
            description: "create_initial_tables",
            sql: "CREATE TABLE todo (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, completed INTEGER);",
            kind: MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "populate_todo",
            sql: "INSERT INTO todo (text, completed) VALUES ('Fazer compras', 0), ('Estudar SQL', 1), ('Exercitar-se', 0);",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_sql::Builder::default().add_migrations("sqlite:test.db", migrations).build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
