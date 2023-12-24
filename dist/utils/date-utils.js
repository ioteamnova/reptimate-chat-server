"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment-timezone");
const timeFormat = 'YYYY-MM-DD HH:mm:ss';
class DateUtils {
    static momentNow() {
        return moment().tz('Asia/Seoul').format(timeFormat);
    }
    static momentNowDate() {
        return new Date(DateUtils.momentNow());
    }
    static momentNowSubtractTime() {
        return moment().tz('Asia/Seoul').format('YYYY-MM-DD');
    }
    static momentFile() {
        return moment().tz('Asia/Seoul').format('YYYYMMDDHHmmss');
    }
    static momentDay() {
        return moment().tz('Asia/Seoul').day();
    }
    static momentTime() {
        return moment().tz('Asia/Seoul').format('HH:mm');
    }
    static stringToDate(date) {
        return moment(date).tz('Asia/Seoul').toDate();
    }
}
exports.default = DateUtils;
//# sourceMappingURL=date-utils.js.map