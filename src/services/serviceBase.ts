export default {
  url: {
    HOST: 'http://192.168.5.5:5000/',
    template: 'template/',
    login: 'user/login/',
    user: 'user/',
    place: 'place/',
    tour: 'tour/',
    searchTour: 'tour/search/',
  },
  statusCode: {
    success: [200, 201, 204],
    auth: [401],
    notFound: [404],
    error: [500, 400, 402],
    // failed: [500, 400],
  },
};
