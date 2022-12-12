import { MigrationInterface, QueryRunner } from "typeorm";

export class user1670362808228 implements MigrationInterface {
  name = "user1670362808228";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Telephones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "telephone" character varying NOT NULL, "telephoneIdId" uuid, "telephoneContactId" uuid, CONSTRAINT "PK_118a1aca4e330f7439fe2a01796" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "emails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "emailIdId" uuid, "emailContactId" uuid, CONSTRAINT "PK_a54dcebef8d05dca7e839749571" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "userIdId" uuid, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "Telephones" ADD CONSTRAINT "FK_43d8e651bc954625a059ba94645" FOREIGN KEY ("telephoneIdId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "Telephones" ADD CONSTRAINT "FK_230471a9bcacbafb81926daf4d1" FOREIGN KEY ("telephoneContactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "emails" ADD CONSTRAINT "FK_27d19cb6d2dbcecffbb8d6e0810" FOREIGN KEY ("emailIdId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "emails" ADD CONSTRAINT "FK_2b30aae7d1db672a19fa15b610a" FOREIGN KEY ("emailContactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "contacts" ADD CONSTRAINT "FK_302267c29f8c1c38c32808e97db" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "contacts" DROP CONSTRAINT "FK_302267c29f8c1c38c32808e97db"`
    );
    await queryRunner.query(
      `ALTER TABLE "emails" DROP CONSTRAINT "FK_2b30aae7d1db672a19fa15b610a"`
    );
    await queryRunner.query(
      `ALTER TABLE "emails" DROP CONSTRAINT "FK_27d19cb6d2dbcecffbb8d6e0810"`
    );
    await queryRunner.query(
      `ALTER TABLE "Telephones" DROP CONSTRAINT "FK_230471a9bcacbafb81926daf4d1"`
    );
    await queryRunner.query(
      `ALTER TABLE "Telephones" DROP CONSTRAINT "FK_43d8e651bc954625a059ba94645"`
    );
    await queryRunner.query(`DROP TABLE "contacts"`);
    await queryRunner.query(`DROP TABLE "emails"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "Telephones"`);
  }
}
