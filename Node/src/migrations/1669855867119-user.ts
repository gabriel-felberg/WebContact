import { MigrationInterface, QueryRunner } from "typeorm";

export class user1669855867119 implements MigrationInterface {
    name = 'user1669855867119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contacts" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "telefone" character varying NOT NULL, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "emails" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_a54dcebef8d05dca7e839749571" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Telefones" ("id" SERIAL NOT NULL, "telefone" character varying NOT NULL, CONSTRAINT "PK_118a1aca4e330f7439fe2a01796" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_email_emails" ("usersId" integer NOT NULL, "emailsId" integer NOT NULL, CONSTRAINT "PK_2ac98cd50bbdeccba55d1efdb8c" PRIMARY KEY ("usersId", "emailsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7080b131f6aa24473720df1856" ON "users_email_emails" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f6a1a60b8915c6e36e2ee02fd5" ON "users_email_emails" ("emailsId") `);
        await queryRunner.query(`CREATE TABLE "users_telefone_telefones" ("usersId" integer NOT NULL, "telefonesId" integer NOT NULL, CONSTRAINT "PK_e8a664d29bd8b153f0e163f0f0d" PRIMARY KEY ("usersId", "telefonesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c4f22a2e342dd5939f1455dabe" ON "users_telefone_telefones" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_434fcdbd2076f44a882f9d0a0e" ON "users_telefone_telefones" ("telefonesId") `);
        await queryRunner.query(`ALTER TABLE "users_email_emails" ADD CONSTRAINT "FK_7080b131f6aa24473720df18565" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_email_emails" ADD CONSTRAINT "FK_f6a1a60b8915c6e36e2ee02fd5c" FOREIGN KEY ("emailsId") REFERENCES "emails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_telefone_telefones" ADD CONSTRAINT "FK_c4f22a2e342dd5939f1455dabe5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_telefone_telefones" ADD CONSTRAINT "FK_434fcdbd2076f44a882f9d0a0ec" FOREIGN KEY ("telefonesId") REFERENCES "Telefones"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_telefone_telefones" DROP CONSTRAINT "FK_434fcdbd2076f44a882f9d0a0ec"`);
        await queryRunner.query(`ALTER TABLE "users_telefone_telefones" DROP CONSTRAINT "FK_c4f22a2e342dd5939f1455dabe5"`);
        await queryRunner.query(`ALTER TABLE "users_email_emails" DROP CONSTRAINT "FK_f6a1a60b8915c6e36e2ee02fd5c"`);
        await queryRunner.query(`ALTER TABLE "users_email_emails" DROP CONSTRAINT "FK_7080b131f6aa24473720df18565"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_434fcdbd2076f44a882f9d0a0e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c4f22a2e342dd5939f1455dabe"`);
        await queryRunner.query(`DROP TABLE "users_telefone_telefones"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f6a1a60b8915c6e36e2ee02fd5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7080b131f6aa24473720df1856"`);
        await queryRunner.query(`DROP TABLE "users_email_emails"`);
        await queryRunner.query(`DROP TABLE "Telefones"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "emails"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
    }

}
