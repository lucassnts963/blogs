-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Category" (
    "uuid" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "blogId" TEXT NOT NULL,
    CONSTRAINT "Category_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog" ("uuid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Category" ("blogId", "description", "uuid") SELECT "blogId", "description", "uuid" FROM "Category";
DROP TABLE "Category";
ALTER TABLE "new_Category" RENAME TO "Category";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
