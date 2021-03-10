export default {
  url: {
    HOST: 'http://192.168.1.7:5000/',
    template: 'template/',
    login: 'user/login/',
    user: 'user/',
    hotel: 'hotel/',
    tourGuide: 'tourGuide/',
    transport: 'transport/',
    province: 'province/',
    place: 'place/',
    tour: 'tour/',
  },
  statusCode: {
    success: [200, 201, 204],
    auth: [401],
    notFound: [404],
    error: [500, 400],
  },
};
