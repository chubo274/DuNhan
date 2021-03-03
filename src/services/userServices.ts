import serviceBase from './serviceBase';
import {post} from './serviceHandle';

class userService {
  signUpUser(body: any) {
    return post(`${serviceBase.url.user}${serviceBase.method.create}`, body);
  }
}

export default new userService();
