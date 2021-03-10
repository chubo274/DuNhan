import serviceBase from './serviceBase';
import {post} from './serviceHandle';

class userService {
  signUpUser(body: any) {
    return post(serviceBase.url.user, body);
  }
}

export default new userService();
