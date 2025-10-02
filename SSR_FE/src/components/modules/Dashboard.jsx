const Dashboard = () => {
  return (
    <div id="dashboard" className="module-content">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Dashboard - Bảng điều khiển
        </h2>
        <p className="text-gray-600">Tổng quan hoạt động doanh nghiệp</p>
      </div>

      {/* Quick Reports Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl text-white card-hover cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Báo cáo tài chính</p>
              <p className="text-xl font-bold">2.5 tỷ VNĐ</p>
              <p className="text-green-100 text-xs">Doanh thu tháng</p>
            </div>
            <i className="fas fa-chart-line text-2xl text-green-100"></i>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl text-white card-hover cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Báo cáo bán hàng</p>
              <p className="text-xl font-bold">1,247</p>
              <p className="text-blue-100 text-xs">Đơn hàng tháng</p>
            </div>
            <i className="fas fa-shopping-cart text-2xl text-blue-100"></i>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl text-white card-hover cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Báo cáo tồn kho</p>
              <p className="text-xl font-bold">85%</p>
              <p className="text-orange-100 text-xs">Mức tồn kho</p>
            </div>
            <i className="fas fa-boxes text-2xl text-orange-100"></i>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl text-white card-hover cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Hiệu suất sản xuất</p>
              <p className="text-xl font-bold">92%</p>
              <p className="text-purple-100 text-xs">Năng suất</p>
            </div>
            <i className="fas fa-industry text-2xl text-purple-100"></i>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-xl text-white card-hover cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-100 text-sm">KPI nhân sự</p>
              <p className="text-xl font-bold">87%</p>
              <p className="text-indigo-100 text-xs">Hiệu suất NV</p>
            </div>
            <i className="fas fa-users text-2xl text-indigo-100"></i>
          </div>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Financial Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="fas fa-chart-line text-green-500 mr-2"></i>
            Tài chính tháng
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Doanh thu</span>
              <span className="font-bold text-green-600">2.5 tỷ VNĐ</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Chi phí</span>
              <span className="font-bold text-red-600">1.8 tỷ VNĐ</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Lợi nhuận</span>
              <span className="font-bold text-blue-600">700 triệu VNĐ</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tỷ suất LN</span>
                <span className="font-bold text-purple-600">28%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Production Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="fas fa-cogs text-purple-500 mr-2"></i>
            Tình hình sản xuất
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Đang sản xuất</span>
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                15 lệnh
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Hoàn thành hôm nay</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                8 lệnh
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Chờ nguyên liệu</span>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                3 lệnh
              </span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Hiệu suất máy</span>
                <span className="font-bold text-blue-600">92%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications & Activities */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <i className="fas fa-bell text-blue-500 mr-2"></i>
            Thông báo & Hoạt động
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            <div className="flex items-start space-x-3 p-2 bg-red-50 rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">
                  Cảnh báo tồn kho
                </p>
                <p className="text-xs text-red-600">
                  Sản phẩm B dưới mức tối thiểu
                </p>
                <p className="text-xs text-gray-500">5 phút trước</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-2 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  Đơn hàng hoàn thành
                </p>
                <p className="text-xs text-green-600">
                  Đơn hàng #DH001 đã giao thành công
                </p>
                <p className="text-xs text-gray-500">15 phút trước</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-2 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">
                  Nhập kho mới
                </p>
                <p className="text-xs text-blue-600">
                  Nhập 500 sản phẩm A vào kho
                </p>
                <p className="text-xs text-gray-500">30 phút trước</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Doanh thu 6 tháng gần đây
          </h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            <div
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
              style={{ height: "60%", width: "15%" }}
            ></div>
            <div
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
              style={{ height: "75%", width: "15%" }}
            ></div>
            <div
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
              style={{ height: "45%", width: "15%" }}
            ></div>
            <div
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
              style={{ height: "85%", width: "15%" }}
            ></div>
            <div
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
              style={{ height: "70%", width: "15%" }}
            ></div>
            <div
              className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
              style={{ height: "90%", width: "15%" }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>T7</span>
            <span>T8</span>
            <span>T9</span>
            <span>T10</span>
            <span>T11</span>
            <span>T12</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">
            Phân bổ doanh thu theo sản phẩm
          </h3>
          <div className="flex items-center justify-center h-64">
            <div className="relative w-48 h-48">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(#3b82f6 0deg 144deg, #10b981 144deg 216deg, #f59e0b 216deg 288deg, #ef4444 288deg 360deg)",
                }}
              ></div>
              <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-sm text-gray-600">Tổng</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span>Sản phẩm A (40%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span>Sản phẩm B (20%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span>Sản phẩm C (20%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span>Khác (20%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
