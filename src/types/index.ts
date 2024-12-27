export interface IComment {
  _id?: string;
  userId: string;
  userName: string;
  replyTo?: string;
  userImage: string;
  content: string;
}
export interface ICommentPayload {
  postId: string;
  userId: string;
  userName: string;
  userImage?: string;
  replyTo?: string;
  comment: string;
  mode: "create" | "update" | "delete";
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  profilePicture?: string;
  location?: string;
  role: "admin" | "user";
  posts?: string[];
  likes?: string[];
  comments?: string[];
  ratedPosts?: string[];
  followers?: string[];
  following?: string[];
  savedPosts?: string[];
  isPremium: boolean;
  tranId?: string | null;
  resetPasswordExpires: string | number | Date | undefined;
  resetPasswordToken: string | undefined;
  premiumExpires?: Date | null;
  passwordChangedAt: Date;
  isBlocked: boolean;
}

export interface IPost {
  _id?: string;
  title: string;
  description: string;
  image: string;
  comments?: IComment[];
  // rating?: number;
  // totalRatings?: number;
  // ratingSum?: number;
  // averageRating?: number;
  ratings?: [{ user: string; rating: number }];
  // upVotes?: number;
  // downVotes?: number;
  likes?: [{ user: string }];
  tags: {
    type: string[];
    enum: [
      "breakfast",
      "lunch",
      "dinner",
      "dessert",
      "snack",
      "vegan",
      "vegetarian",
      "gluten-free",
      "low-carb"
    ];
  };
  cookingTime: number;
  ingredients: {
    name: string;
    quantity: string;
  }[];
  author: IUser;
  isPremium?: boolean;
  difficulty: "Easy" | "Medium" | "Hard";
  isVegan: boolean;
  servings: number;
}
