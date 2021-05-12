export default {
  url: {
    HOST: 'http://192.168.1.12:5000/',
    template: 'template/',
    login: 'user/login/',
    forGotPass: 'user/forGotPass/',
    user: 'user/',
    place: 'place/',
    tour: 'tour/',
    searchTour: 'tour/search/',
    booking: 'tour/booking/',
    allBooking: 'tour/allBooking/',
    cancel: 'tour/cancel/',
  },
  statusCode: {
    success: [200, 201, 204],
    auth: [401],
    notFound: [404],
    error: [500, 400, 402],
    // failed: [500, 400],
  },
};
