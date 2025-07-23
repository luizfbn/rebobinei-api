/*
  Warnings:

  - A unique constraint covering the columns `[user_id,movie_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "user_movie_unique_review" ON "reviews"("user_id", "movie_id");
