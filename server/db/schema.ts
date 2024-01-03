import { relations } from "drizzle-orm";
import { text, integer, sqliteTable, unique } from "drizzle-orm/sqlite-core";

export const artists = sqliteTable("artists", {
  id: integer("id").primaryKey(),
  name: text("name", { mode: "text" }).notNull().unique(),
  thumbnail: text("thumbnail"),
});

export const artistsRelations = relations(artists, ({ many }) => ({
  albums: many(albumsArtists, { relationName: "albums" }),
}));

export const albums = sqliteTable("albums", {
  id: integer("id").primaryKey(),
  name: text("name", { mode: "text" }).notNull(),
  thumbnail: text("thumbnail"),
  releaseYear: integer("release_year"),
});

export const albumsRelations = relations(albums, ({ many }) => ({
  artists: many(albumsArtists, { relationName: "artists" }),
  songs: many(songs, { relationName: "album" }),
}));

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
    album_artist: unique().on(t.albumId, t.artistId),
  })
);

export const albumsArtistsRelations = relations(
  albumsArtists,
  ({ many, one }) => ({
    album: one(albums, {
      fields: [albumsArtists.albumId],
      references: [albums.id],
      relationName: "artists",
    }),
    artist: one(artists, {
      fields: [albumsArtists.artistId],
      references: [artists.id],
      relationName: "albums",
    }),
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

export const songsRelations = relations(songs, ({ one, many }) => ({
  album: one(albums, {
    fields: [songs.albumId],
    references: [albums.id],
    relationName: "album",
  }),
}));
