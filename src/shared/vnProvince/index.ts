import * as vn from 'sub-vn';

// getProvinces()	Lấy danh sách tỉnh/thành phố
// getDistricts()	Lấy danh sách các huyện/quận
// getWards()	Lấy danh sách các xã/phường
// getProvincesWithDetail()	Lấy toàn bộ dữ liệu
// getDistrictsByProvinceCode(provinceCode)	Lấy danh sách huyện/ quận theo mã tỉnh
// getWardsByDistrictCode(districtCode)	Lấy danh sách phường/ xã theo mã huyện
// getWardsByProvinceCode(provinceCode)	Lấy danh sách phường/ xã theo tỉnh

const vnAddressFormatter = (data: { province: string; district: string; ward: string; [index: string]: any }) => {
    // Kiểm tra và format lại tên tỉnh
    vn.getProvinces().forEach((item) => {
        if ((item.name as string).includes(data.province)) {
            data.province = item.name;

            // Kiểm tra và format lại  trên thành phố
            if (data.district) {
                vn.getDistrictsByProvinceCode(item.code).forEach((item1) => {
                    if ((item1.name as string).includes(data.district)) {
                        data.district = item1.name;

                        // Kiểm tra và format lại tên phường
                        if (data.ward) {
                            vn.getWardsByDistrictCode(item1.code).forEach((item2) => {
                                if ((item2.name as string).includes(data.ward)) {
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

export default vnAddressFormatter;
