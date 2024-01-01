CREATE TABLE `albums` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text
);
--> statement-breakpoint
CREATE TABLE `albums_artists` (
	`id` integer PRIMARY KEY NOT NULL,
	`album_id` integer NOT NULL,
	`artist_id` integer NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`artist_id`) REFERENCES `artists`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `artists` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`thumbnail` text
);
--> statement-breakpoint
CREATE TABLE `songs` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`album_id` integer NOT NULL,
	`youtube_id` text NOT NULL,
	FOREIGN KEY (`album_id`) REFERENCES `albums`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `albums_artists_album_id_artist_id_unique` ON `albums_artists` (`album_id`,`artist_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `artists_name_unique` ON `artists` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `songs_youtube_id_unique` ON `songs` (`youtube_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `songs_name_album_id_unique` ON `songs` (`name`,`album_id`);