-- Tạo database
CREATE DATABASE erp_deha CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE erp_deha;

-- Users table (Đăng nhập, phân quyền)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role ENUM('admin','sales','production','warehouse','transport','hr','finance') NOT NULL,
    department_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- phòng ban
CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT
);

-- nhân sự
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    position VARCHAR(50),-- chức vụ
    department_id INT NOT NULL,
    hire_date DATE, -- ngày vào làm
    salary DECIMAL(10,2), -- lương
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- khách hàng
CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    address TEXT,
    sales_rep_id INT,-- nhân viên phụ trách-
    customer_type ENUM('VIP','Regular'),-- có thể có 
    portrait TEXT,-- chân dung
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- nhà cung cấp 
CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    company_name VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- sản phẩm 
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('raw_material','finished_product','semi_finished') NOT NULL,
    description TEXT,
    unit_price DECIMAL(10,2),-- don gia
    unit VARCHAR(20),-- đơn vị
    safe_stock_level DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BOM (định mức nguyên vật liệu)
CREATE TABLE bom (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    component_id INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- kho
CREATE TABLE warehouses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    location VARCHAR(100),
    capacity DECIMAL(10,2), -- sức chứa
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tồn kho của sản phẩm
CREATE TABLE inventory (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- nhập xuất kho
CREATE TABLE inventory_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    warehouse_id INT NOT NULL,
    type ENUM('import','export') NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    reference_id INT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- đơn hàng bán
CREATE TABLE sales_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    type ENUM('production','finished_product','value_added') NOT NULL,-- sản xuất, thành phẩm, giá trị gia tăng
    type_pay ENUM('trả thẳng', 'công nợ') NOT NULL,
    status ENUM('draft','confirmed','in_progress','completed','cancelled') NOT NULL,--
    total_amount DECIMAL(10,2),-- tổng tiền
    created_by INT NOT NULL,
   
    production_end_date DATE,-- ngày giao
    value_added_details TEXT, -- giá trị gia tăng
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- chi tiết đơn hàng bán
CREATE TABLE sales_order_lines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2)
);

-- Bóa giá
CREATE TABLE quotes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    quote_date DATE NOT NULL,
    total_amount DECIMAL(10,2),
    status ENUM('draft','sent','accepted','rejected') NOT NULL,
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- lệnh mua
CREATE TABLE purchase_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT NOT NULL,
    order_date DATE NOT NULL,
    status ENUM('draft','confirmed','completed','cancelled') NOT NULL,
    total_amount DECIMAL(10,2),
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chi tiết đơn mua
CREATE TABLE purchase_order_lines (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2)
);

-- lệnh sản xuất
CREATE TABLE production_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sales_order_id INT,
    start_date DATE NOT NULL,
    end_date DATE,
    status ENUM('planned','in_progress','completed','cancelled') NOT NULL,
    quantity_produced DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- nguyên vật liệu cho sản xuất
CREATE TABLE production_materials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    production_order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity_required DECIMAL(10,2) NOT NULL,
    quantity_used DECIMAL(10,2)
);

-- Lệnh vận chuyển(tạm thời)
CREATE TABLE transport_orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sales_order_id INT NOT NULL,
    vehicle_id INT,
    partner_id INT,
    status ENUM('planned','in_transit','delivered','issue') NOT NULL,
    shipping_cost DECIMAL(10,2),
    invoice_url VARCHAR(255),
    route TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Phuognw tiện vận tải
CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    max_load DECIMAL(10,2) NOT NULL,
    maintenance_schedule DATE,
    status ENUM('active','maintenance') NOT NULL
);

-- Đối tác vận tải
CREATE TABLE transport_partners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    total_orders INT,
    total_cost DECIMAL(10,2),
    contact_email VARCHAR(100)
);

-- Chiến lược marketing
CREATE TABLE marketing_campaigns (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    cost DECIMAL(10,2) NOT NULL,
    revenue DECIMAL(10,2),
    conversion_rate DECIMAL(5,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Giao dịch tài chính
CREATE TABLE financial_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('income','expense','payment') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    date DATE NOT NULL,
    reference_id INT,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- hóa đơn(quản lý hóa đơn bán hàng)(hóa đơn gtgt)
CREATE TABLE invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    invoice_date DATE NOT NULL,
    due_date DATE,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('draft','sent','paid') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Foreign Keys
ALTER TABLE users ADD FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE employees ADD FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE employees ADD FOREIGN KEY (department_id) REFERENCES departments(id);
ALTER TABLE customers ADD FOREIGN KEY (sales_rep_id) REFERENCES users(id);
ALTER TABLE bom ADD FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE bom ADD FOREIGN KEY (component_id) REFERENCES products(id);
ALTER TABLE inventory ADD FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE inventory ADD FOREIGN KEY (warehouse_id) REFERENCES warehouses(id);
ALTER TABLE inventory_transactions ADD FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE inventory_transactions ADD FOREIGN KEY (warehouse_id) REFERENCES warehouses(id);
ALTER TABLE sales_orders ADD FOREIGN KEY (customer_id) REFERENCES customers(id);
ALTER TABLE sales_orders ADD FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE sales_order_lines ADD FOREIGN KEY (order_id) REFERENCES sales_orders(id);
ALTER TABLE sales_order_lines ADD FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE quotes ADD FOREIGN KEY (customer_id) REFERENCES customers(id);
ALTER TABLE quotes ADD FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE purchase_orders ADD FOREIGN KEY (supplier_id) REFERENCES suppliers(id);
ALTER TABLE purchase_orders ADD FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE purchase_order_lines ADD FOREIGN KEY (order_id) REFERENCES purchase_orders(id);
ALTER TABLE purchase_order_lines ADD FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE production_orders ADD FOREIGN KEY (sales_order_id) REFERENCES sales_orders(id);
ALTER TABLE production_materials ADD FOREIGN KEY (production_order_id) REFERENCES production_orders(id);
ALTER TABLE production_materials ADD FOREIGN KEY (product_id) REFERENCES products(id);
ALTER TABLE transport_orders ADD FOREIGN KEY (sales_order_id) REFERENCES sales_orders(id);
ALTER TABLE transport_orders ADD FOREIGN KEY (vehicle_id) REFERENCES vehicles(id);
ALTER TABLE transport_orders ADD FOREIGN KEY (partner_id) REFERENCES transport_partners(id);
ALTER TABLE financial_transactions ADD FOREIGN KEY (reference_id) REFERENCES invoices(id);
ALTER TABLE invoices ADD FOREIGN KEY (order_id) REFERENCES sales_orders(id);
