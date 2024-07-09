import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration implements MigrationInterface {
  name = 'InitialMigration';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "user" (
            "id" SERIAL NOT NULL, 
            "email" character varying NOT NULL, 
            "googleId" character varying, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        )`);

    await queryRunner.query(`CREATE TABLE "folder" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "parentId" integer, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_4a39c8f15f9679e7f1476d24143" PRIMARY KEY ("id")
        )`);

    await queryRunner.query(`CREATE TABLE "file" (
            "id" SERIAL NOT NULL, 
            "name" character varying NOT NULL, 
            "folderId" integer, 
            "url" character varying NOT NULL, 
            "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
            "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_3de70d5888d6b00b68e6c1747b7" PRIMARY KEY ("id")
        )`);

    await queryRunner.query(`CREATE TABLE "permission" (
            "id" SERIAL NOT NULL, 
            "userId" integer NOT NULL, 
            "fileId" integer, 
            "folderId" integer, 
            "canView" boolean NOT NULL DEFAULT false, 
            "canEdit" boolean NOT NULL DEFAULT false, 
            CONSTRAINT "PK_f56bf76971773d9993320b57d2a" PRIMARY KEY ("id")
        )`);

    await queryRunner.query(
      `ALTER TABLE "folder" ADD CONSTRAINT "FK_6f2c4f184d96416fb2c8f3d4ee1" FOREIGN KEY ("parentId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "file" ADD CONSTRAINT "FK_b18f8b88f03b75fbc43b6c3e36e" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_92a148f3b46e5d31c2c8cfb1713" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_92a148f3b46e5d31c2c8cfb1712" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" ADD CONSTRAINT "FK_92a148f3b46e5d31c2c8cfb1714" FOREIGN KEY ("folderId") REFERENCES "folder"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "FK_92a148f3b46e5d31c2c8cfb1714"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "FK_92a148f3b46e5d31c2c8cfb1712"`,
    );
    await queryRunner.query(
      `ALTER TABLE "permission" DROP CONSTRAINT "FK_92a148f3b46e5d31c2c8cfb1713"`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" DROP CONSTRAINT "FK_b18f8b88f03b75fbc43b6c3e36e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "folder" DROP CONSTRAINT "FK_6f2c4f184d96416fb2c8f3d4ee1"`,
    );
    await queryRunner.query(`DROP TABLE "permission"`);
    await queryRunner.query(`DROP TABLE "file"`);
    await queryRunner.query(`DROP TABLE "folder"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
