export type AuthorProps = {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  role: string;
};

export type ImageProps = {
  imageId: string;
  imageUrl: string;
  title: boolean;
};

export type LotFormProps = {
  parent: string;
  category: CategoryProps | string;
  sizeLower: string;
  sizeUpper: string;
  sizeUnits: string;
  packaging: string;
  quantity: string;
  quantityUnits: string;
  price: string;
  currency?: string;
  country: string;
  region: string;
  lotType: string;
  images: ImageProps[];
  author: AuthorProps;
  id: string;
  title: string;
  creationDate: string;
  variety: string;
  description: string;
};

export type CategoryProps = {
  categoryName: string;
  id: string;
  parentCategory: string;
  varieties: string[];
};
