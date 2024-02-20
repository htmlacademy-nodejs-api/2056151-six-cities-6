export const averageRating = (
  rating: number,
  numberOfComments: number,
  newRating: number
) => {
  const totalRating = rating * numberOfComments + newRating;
  const newCommentsCount = numberOfComments + 1;
  const newAverageRating = totalRating / newCommentsCount;

  return newAverageRating;
};
