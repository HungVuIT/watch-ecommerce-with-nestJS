"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vn = require("sub-vn");
const vnAddressFormatter = (data) => {
    vn.getProvinces().forEach((item) => {
        if (item.name.includes(data.province)) {
            data.province = item.name;
            if (data.district) {
                vn.getDistrictsByProvinceCode(item.code).forEach((item1) => {
                    if (item1.name.includes(data.district)) {
                        data.district = item1.name;
                        if (data.ward) {
                            vn.getWardsByDistrictCode(item1.code).forEach((item2) => {
                                if (item2.name.includes(data.ward)) {
                                    data.ward = item2.name;
                                }
                            });
                        }
                    }
                });
            }
        }
    });
};
exports.default = vnAddressFormatter;
//# sourceMappingURL=index.js.map