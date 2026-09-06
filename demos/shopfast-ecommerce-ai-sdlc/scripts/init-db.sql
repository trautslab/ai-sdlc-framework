-- 🗄️ Esquema Relacional de Base de Datos ShopFast (PostgreSQL 14+)
-- Basado en docs/diagrams/entity-relationship/ERD-001-shopfast-db.md

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    role VARCHAR(20) DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'ADMIN')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Libreta de Direcciones (Máx 5 por usuario)
CREATE TABLE IF NOT EXISTS addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_name VARCHAR(255) NOT NULL,
    street_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Categorías (Árbol de 3 niveles)
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    level INT NOT NULL CHECK (level BETWEEN 1 AND 3),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Productos
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES categories(id),
    sku VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    discount_price NUMERIC(12, 2) CHECK (discount_price >= 0),
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    images JSONB DEFAULT '[]'::jsonb,
    attributes JSONB DEFAULT '{}'::jsonb,
    status VARCHAR(20) DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'INACTIVE')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);

-- 5. Órdenes de Compra (ACID)
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(30) NOT NULL CHECK (status IN ('PENDIENTE_PAGO', 'PAGO_CONFIRMADO', 'EN_PREPARACION', 'ENVIADO', 'ENTREGADO', 'CANCELADO')),
    subtotal NUMERIC(12, 2) NOT NULL,
    shipping_cost NUMERIC(12, 2) NOT NULL,
    total_amount NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(30) NOT NULL,
    stripe_payment_intent_id VARCHAR(255) UNIQUE,
    tracking_number VARCHAR(100),
    idempotency_key VARCHAR(255) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Items de la Orden
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id),
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL
);

-- 7. Reseñas y Calificaciones (Compradores Verificados)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment VARCHAR(500),
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_user_product_review UNIQUE (user_id, product_id)
);
