export function convertImageUrlToCssUrl(imageUrl: string | undefined): string | undefined {
  if (!imageUrl) {
    return undefined;
  }
  const decodeUrlStr = decodeURI(imageUrl);
  return `url("${decodeUrlStr === imageUrl ? encodeURI(imageUrl) : imageUrl}")`;
}
