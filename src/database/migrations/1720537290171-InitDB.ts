import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1720537290171 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create table "user"
(
    id          serial
        constraint "PK_cace4a159ff9f2512dd42373760"
            primary key,
    email       varchar                 not null,
    "googleId"  varchar,
    "createdAt" timestamp default now() not null,
    "updatedAt" timestamp default now() not null
);`);

    await queryRunner.query(`create table folder
(
    id          serial
        constraint "PK_6278a41a706740c94c02e288df8"
            primary key,
    name        varchar                 not null,
    "createdAt" timestamp default now() not null,
    "updatedAt" timestamp default now() not null,
    "parentId"  integer
        constraint "REL_9ee3bd0f189fb242d488c0dfa3"
            unique
        constraint "FK_9ee3bd0f189fb242d488c0dfa39"
            references folder
            on delete cascade
);`);

    await queryRunner.query(`create table file
(
    id          serial
        constraint "PK_36b46d232307066b3a2c9ea3a1d"
            primary key,
    name        varchar                 not null,
    url         varchar                 not null,
    "createdAt" timestamp default now() not null,
    "updatedAt" timestamp default now() not null,
    "folderId"  integer
        constraint "FK_3563fb0d3e9557359f541ac77da"
            references folder
            on delete cascade
);`);

    await queryRunner.query(`create table permission
(
    id         serial
        constraint "PK_3b8b97af9d9d8807e41e6f48362"
            primary key,
    "canView"  boolean default false not null,
    "canEdit"  boolean default false not null,
    "userId"   integer
        constraint "REL_c60570051d297d8269fcdd9bc4"
            unique
        constraint "FK_c60570051d297d8269fcdd9bc47"
            references "user"
            on delete cascade,
    "fileId"   integer
        constraint "REL_70e16a198e9a408958e6aff3c1"
            unique
        constraint "FK_70e16a198e9a408958e6aff3c1a"
            references file
            on delete cascade,
    "folderId" integer
        constraint "REL_2be6d1984d87b7e2be8e0cdf44"
            unique
        constraint "FK_2be6d1984d87b7e2be8e0cdf442"
            references folder
            on delete cascade
);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table permission;`);
    await queryRunner.query(`drop table "user";`);
    await queryRunner.query(`drop table file;`);
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_b18f8b88f03b75fbc43b6c3e36e"`,
    );
    await queryRunner.query(`drop table folder;`);
  }
}
