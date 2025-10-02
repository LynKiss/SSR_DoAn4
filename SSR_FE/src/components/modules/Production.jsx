import { useState } from "react";

const Production = () => {
  const [activeTab, setActiveTab] = useState("plan");

  const renderTabContent = () => {
    switch (activeTab) {
      case "plan":
        return (
          <div id="plan-tab" className="production-tab-content">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Kế hoạch sản xuất</h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                <i className="fas fa-plus mr-2"></i>Lập kế hoạch mới
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Kế hoạch tháng 12/2024</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng lệnh:</span>
                    <span className="font-medium">45 lệnh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Hoàn thành:</span>
                    <span className="font-medium text-green-600">32 lệnh (71%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Đang thực hiện:</span>
                    <span className="font-medium text-orange-600">8 lệnh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Chờ thực hiện:</span>
                    <span className="font-medium text-blue-600">5 lệnh</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Tiến độ theo dõi</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sản phẩm A</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sản phẩm B</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Sản phẩm C</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Mã kế hoạch</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Sản phẩm</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Số lượng</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ngày bắt đầu</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ngày kết thúc</th>
