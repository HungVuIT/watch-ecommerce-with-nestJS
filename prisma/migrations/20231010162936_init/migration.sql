-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'VENDOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'none');

-- CreateEnum
CREATE TYPE "orderProcess" AS ENUM ('created', 'confirm', 'delivering', 'delivered', 'cancel', 'done');

-- CreateEnum
CREATE TYPE "paymentMethod" AS ENUM ('online', 'offline');

-- CreateEnum
CREATE TYPE "deliveryOption" AS ENUM ('express', 'standard', 'saving');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "province" TEXT,
    "district" TEXT,
    "ward" TEXT,
    "address" TEXT,
    "gender" "Gender",
    "birthDay" TIMESTAMP(3),
    "avatar" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/vhh/image/upload/v1665845758/watch-ecommerce/istockphoto-476085198-612x612_bt6y0m.jpg',
    "status" BOOLEAN,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "logo" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/vhh/image/upload/v1665845746/watch-ecommerce/74827_of9gt0.png',
    "banner" TEXT,
    "UID" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Shop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShopWallet" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paypalMethod" TEXT NOT NULL,
    "SID" INTEGER NOT NULL,

    CONSTRAINT "ShopWallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watch" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "BID" INTEGER,
    "SID" INTEGER NOT NULL,
    "CID" INTEGER[],
    "sku" TEXT,
    "slug" TEXT,
    "description" TEXT,
    "content" TEXT,
    "quantity" INTEGER NOT NULL,
    "saled" INTEGER NOT NULL DEFAULT 0,
    "price" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'none',
    "materialCord" TEXT,
    "glassSurface" TEXT,
    "glassSize" TEXT,
    "weight" INTEGER,
    "height" INTEGER,
    "length" INTEGER,
    "width" INTEGER,
    "madeBy" TEXT,
    "image" TEXT[] DEFAULT ARRAY['https://res.cloudinary.com/vhh/image/upload/v1665845768/watch-ecommerce/76007_vyvril.png']::TEXT[],
    "warranty" TEXT,
    "isOld" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT,
    "include" TEXT,
    "used" TEXT,
    "resalePrice" INTEGER,
    "prioritize" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Watch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "UID" INTEGER NOT NULL,
    "PID" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "UID" INTEGER NOT NULL,
    "PID" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "code" TEXT,
    "status" "orderProcess" NOT NULL DEFAULT 'created',
    "total" DOUBLE PRECISION NOT NULL,
    "paymentMethod" "paymentMethod" NOT NULL,
    "UID" INTEGER NOT NULL,
    "SID" INTEGER NOT NULL,
    "Note" TEXT,
    "userPay" BOOLEAN NOT NULL DEFAULT false,
    "payVendor" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order_detail" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "OID" INTEGER NOT NULL,
    "PID" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Order_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery_detail" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "province" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "shipFee" DOUBLE PRECISION NOT NULL,
    "deliveryOption" "deliveryOption" NOT NULL DEFAULT 'standard',
    "OID" INTEGER NOT NULL,

    CONSTRAINT "Delivery_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "UID" INTEGER NOT NULL,
    "PID" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Watch_rating" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "UID" INTEGER NOT NULL,
    "PID" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT,

    CONSTRAINT "Watch_rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shop_rating" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "UID" INTEGER NOT NULL,
    "SID" INTEGER NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "content" TEXT,

    CONSTRAINT "Shop_rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversation" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale_off" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "PID" INTEGER NOT NULL,

    CONSTRAINT "Sale_off_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Shop_UID_key" ON "Shop"("UID");

-- CreateIndex
CREATE UNIQUE INDEX "ShopWallet_SID_key" ON "ShopWallet"("SID");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_detail_OID_key" ON "Delivery_detail"("OID");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_off_WID_key" ON "Sale_off"("PID");

-- AddForeignKey
ALTER TABLE "Shop" ADD CONSTRAINT "Shop_UID_fkey" FOREIGN KEY ("UID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShopWallet" ADD CONSTRAINT "ShopWallet_SID_fkey" FOREIGN KEY ("SID") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watch" ADD CONSTRAINT "Watch_SID_fkey" FOREIGN KEY ("SID") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_UID_fkey" FOREIGN KEY ("UID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_WID_fkey" FOREIGN KEY ("PID") REFERENCES "Watch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_UID_fkey" FOREIGN KEY ("UID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_WID_fkey" FOREIGN KEY ("PID") REFERENCES "Watch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_UID_fkey" FOREIGN KEY ("UID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_SID_fkey" FOREIGN KEY ("SID") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_detail" ADD CONSTRAINT "Order_detail_OID_fkey" FOREIGN KEY ("OID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_detail" ADD CONSTRAINT "Order_detail_WID_fkey" FOREIGN KEY ("PID") REFERENCES "Watch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery_detail" ADD CONSTRAINT "Delivery_detail_OID_fkey" FOREIGN KEY ("OID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_UID_fkey" FOREIGN KEY ("UID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_WID_fkey" FOREIGN KEY ("PID") REFERENCES "Watch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watch_rating" ADD CONSTRAINT "Watch_rating_UID_fkey" FOREIGN KEY ("UID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watch_rating" ADD CONSTRAINT "Watch_rating_WID_fkey" FOREIGN KEY ("PID") REFERENCES "Watch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_rating" ADD CONSTRAINT "Shop_rating_UID_fkey" FOREIGN KEY ("UID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shop_rating" ADD CONSTRAINT "Shop_rating_SID_fkey" FOREIGN KEY ("SID") REFERENCES "Shop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale_off" ADD CONSTRAINT "Sale_off_WID_fkey" FOREIGN KEY ("PID") REFERENCES "Watch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
