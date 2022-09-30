import { IFile } from "types/cms";

export const mockImageThumbnail = {
  ext: ".jpg",
  url: "https://picsum.photos/id/237/206/156",
  hash: "thumbnail_image_ad28eda821",
  mime: "image/jpg",
  name: "Thumbnail Image",
  path: null,
  size: 17.02,
  width: 206,
  height: 156,
};

export const mockImageSmall = {
  ext: ".jpg",
  url: "https://picsum.photos/id/237/500/400",
  hash: "small_image_ad28eda821",
  mime: "image/jpg",
  name: "Small Image",
  path: null,
  size: 201.45,
  width: 399,
  height: 500,
};

export const mockImageMedium = {
  ext: ".jpg",
  url: "https://picsum.photos/id/237/750/600",
  hash: "mesdium_image_ad28eda821",
  mime: "image/jpg",
  name: "Medium Image",
  path: null,
  size: 606.12,
  width: 750,
  height: 600,
};

export const mockImageLarge = {
  ext: ".jpg",
  url: "https://picsum.photos/id/237/1000/800",
  hash: "large_image_ad28eda821",
  mime: "image/jpg",
  name: "Large Image",
  path: null,
  size: 1003.12,
  width: 1000,
  height: 800,
};

export const mockImageOriginal = {
  ext: ".jpg",
  url: "https://picsum.photos/id/237/2000/1600",
  hash: "original_image_ad28eda821",
  mime: "image/jpg",
  name: "Original Image",
  path: null,
  size: 2006.12,
  width: 2000,
  height: 1600,
};

export const mockIFile: IFile = {
  id: "",
  ...mockImageOriginal,
  name: "Image",
  alternativeText: "This is alternative text.",
  caption: "This is the caption.",
  formats: {
    thumbnail: mockImageThumbnail,
    small: mockImageSmall,
    medium: mockImageMedium,
    large: mockImageLarge,
  },
  previewUrl: null,
  provider: "google-cloud-storage",
  provider_metadata: null,
  related: [],
};
