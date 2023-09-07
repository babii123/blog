export default function dateDiff(d1) {
      d1 = new Date(d1.replace(/-/g, '/'));
      var d2 = new Date();
      var obj = {}, M1 = d1.getMonth(), D1 = d1.getDate(), M2 = d2.getMonth(), D2 = d2.getDate();
      obj.Y = d2.getFullYear() - d1.getFullYear() + (M1 * 100 + D1 > M2 * 100 + D2 ? -1 : 0);
      obj.M = (obj.Y >= 0 ? obj.Y * 12 : 12) + M2 - M1 + (D1 > D2 ? -1 : 0);
      obj.s = Math.floor((d2 - d1) / 1000);//差几秒
      obj.m = Math.floor(obj.s / 60);//差几分钟
      obj.h = Math.floor(obj.m / 60);//差几小时
      obj.D = Math.floor(obj.h / 24);//差几天

      if (obj.Y !== 0) {
            return obj.Y + "年前"
      } else if (obj.M !== 0) {
            return obj.M + "月前"
      } else if (obj.D !== 0) {
            return obj.D + "天前"
      } else if (obj.h !== 0) {
            return obj.h + "小时前"
      } else if (obj.m !== 0) {
            return obj.m + "分钟前"
      } else{
            return "刚刚"
      }
}