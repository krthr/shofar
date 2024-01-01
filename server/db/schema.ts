import { text, integer, sqliteTable, unique } from "drizzle-orm/sqlite-core";

export const artists = sqliteTable("artists", {
  id: integer("id").primaryKey(),
  name: text("name", { mode: "text" }).notNull().unique(),
  thumbnail: text("thumbnail"),
});

export const albums = sqliteTable("albums", {
  id: integer("id").primaryKey(),
  name: text("name", { mode: "text" }).notNull(),
  thumbnail: text("thumbnail"),
});

export const albumsArtists = sqliteTable(
  "albums_artists",
  {
    id: integer("id").primaryKey(),
    albumId: integer("album_id")
      .notNull()
      .references(() => albums.id, { onDelete: "cascade" }),
    artistId: integer("artist_id")
      .notNull()
      .references(() => artists.id, { onDelete: "cascade" }),
  },
  (t) => ({
    album_artis: unique().on(t.albumId, t.artistId),
  })
);

export const songs = sqliteTable(
  "songs",
  {
    id: integer("id").primaryKey(),
    name: text("name", { mode: "text" }).notNull(),
    albumId: integer("album_id")
      .notNull()
      .references(() => albums.id, { onDelete: "cascade" }),

    youtubeId: text("youtube_id", { mode: "text" }).notNull().unique(),
  },
  (t) => ({
    name_albumId: unique().on(t.name, t.albumId),
  })
);
