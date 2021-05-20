import { COOKIE_NAME } from "../index";
import { myReq, myRes } from "../types";

export const cookieLogoutorDeleteHandle = (req: myReq, res: myRes) => {
  return new Promise((resolve) => req.session.destroy((err: any) => {
    res.clearCookie(COOKIE_NAME);
    if (err) {
      console.log(err);
      resolve(false);
      return;
    }
    resolve(true);
  }));
}