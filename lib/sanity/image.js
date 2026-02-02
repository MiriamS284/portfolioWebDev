import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

export const imagePresets = {
  thumbnail: (source) => urlFor(source).width(400).height(300),
  card: (source) => urlFor(source).width(800).height(600),
  hero: (source) => urlFor(source).width(1600).height(900),
  avatar: (source) => urlFor(source).width(80).height(80),
};
