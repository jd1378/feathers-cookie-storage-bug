function getImageUrl(img) {
  return process.env.backendUrl + '/content/' + img;
}

export { getImageUrl };
