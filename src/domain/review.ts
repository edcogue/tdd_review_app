export class Review {
  constructor(
    productId: string,
    userId: string,
    rating: number,
    comment: string,
    id?: string
  ) {
    this.productId = productId;
    this.userId = userId;
    this.rating = rating;
    this.comment = comment;
    if (id) {
      this.id = id;
    }
  }

  id?: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
}
