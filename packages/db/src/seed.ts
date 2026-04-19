import { PrismaClient, Site, StockStatus } from '@prisma/client';

const db = new PrismaClient();

// ── Theresmac: New (non-refurbished) Products ─────────────────────────────────

const theresmacProducts = [
  // ── Mac ──────────────────────────────────────────────────────────────────────
  { id: 'macbook-pro-14-m5', name: 'MacBook Pro 14" M5', category: 'mac', msrp: 1999, specs: { chip: 'M5', storage: '512GB', ram: '24GB', display: '14.2" XDR' }, prices: { apple: 1999, amazon: 1949, walmart: 1999, target: 1999, bestbuy: 1949, bh: 1949, adorama: 1949, ebay: 1899, cdw: 1999, sweetwater: 1999 }, outOfStock: ['target'] },
  { id: 'macbook-pro-14-m5-1tb', name: 'MacBook Pro 14" M5 1TB', category: 'mac', msrp: 2399, specs: { chip: 'M5', storage: '1TB', ram: '32GB', display: '14.2" XDR' }, prices: { apple: 2399, amazon: 2349, walmart: 2399, target: 2399, bestbuy: 2349, bh: 2349, adorama: 2349, ebay: 2299, cdw: 2399, sweetwater: 2399 }, outOfStock: ['target'] },
  { id: 'macbook-pro-14-m5-pro', name: 'MacBook Pro 14" M5 Pro', category: 'mac', msrp: 2499, specs: { chip: 'M5 Pro', storage: '512GB', ram: '24GB', display: '14.2" XDR' }, prices: { apple: 2499, amazon: 2449, walmart: 2499, target: 2499, bestbuy: 2449, bh: 2449, adorama: 2449, ebay: 2399, cdw: 2499, sweetwater: 2499 }, outOfStock: ['target'] },
  { id: 'macbook-pro-14-m5-pro-1tb', name: 'MacBook Pro 14" M5 Pro 1TB', category: 'mac', msrp: 2899, specs: { chip: 'M5 Pro', storage: '1TB', ram: '36GB', display: '14.2" XDR' }, prices: { apple: 2899, amazon: 2849, walmart: 2899, target: 2899, bestbuy: 2849, bh: 2849, adorama: 2849, ebay: 2799, cdw: 2899, sweetwater: 2899 }, outOfStock: ['target'] },
  { id: 'macbook-pro-14-m5-max', name: 'MacBook Pro 14" M5 Max', category: 'mac', msrp: 3199, specs: { chip: 'M5 Max', storage: '1TB', ram: '36GB', display: '14.2" XDR' }, prices: { apple: 3199, amazon: 3149, walmart: 3199, target: 3199, bestbuy: 3149, bh: 3149, adorama: 3149, ebay: 3099, cdw: 3199, sweetwater: 3199 }, outOfStock: ['target'] },
  { id: 'macbook-pro-14-m5-max-2tb', name: 'MacBook Pro 14" M5 Max 2TB', category: 'mac', msrp: 3699, specs: { chip: 'M5 Max', storage: '2TB', ram: '48GB', display: '14.2" XDR' }, prices: { apple: 3699, amazon: 3649, walmart: 3699, target: 3699, bestbuy: 3649, bh: 3649, adorama: 3649, ebay: 3599, cdw: 3699, sweetwater: 3699 }, outOfStock: ['target', 'walmart'] },
  { id: 'macbook-pro-16-m5-pro', name: 'MacBook Pro 16" M5 Pro', category: 'mac', msrp: 2799, specs: { chip: 'M5 Pro', storage: '512GB', ram: '24GB', display: '16.2" XDR' }, prices: { apple: 2799, amazon: 2749, walmart: 2799, target: 2799, bestbuy: 2749, bh: 2749, adorama: 2749, ebay: 2699, cdw: 2799, sweetwater: 2799 }, outOfStock: ['target'] },
  { id: 'macbook-pro-16-m5-pro-1tb', name: 'MacBook Pro 16" M5 Pro 1TB', category: 'mac', msrp: 3199, specs: { chip: 'M5 Pro', storage: '1TB', ram: '36GB', display: '16.2" XDR' }, prices: { apple: 3199, amazon: 3149, walmart: 3199, target: 3199, bestbuy: 3149, bh: 3149, adorama: 3149, ebay: 3099, cdw: 3199, sweetwater: 3199 }, outOfStock: ['target'] },
  { id: 'macbook-pro-16-m5-max', name: 'MacBook Pro 16" M5 Max', category: 'mac', msrp: 3499, specs: { chip: 'M5 Max', storage: '1TB', ram: '48GB', display: '16.2" XDR' }, prices: { apple: 3499, amazon: 3449, walmart: 3499, target: 3499, bestbuy: 3449, bh: 3449, adorama: 3449, ebay: 3399, cdw: 3499, sweetwater: 3499 }, outOfStock: ['target'] },
  { id: 'macbook-pro-16-m5-max-2tb', name: 'MacBook Pro 16" M5 Max 2TB', category: 'mac', msrp: 3999, specs: { chip: 'M5 Max', storage: '2TB', ram: '64GB', display: '16.2" XDR' }, prices: { apple: 3999, amazon: 3949, walmart: 3999, target: 3999, bestbuy: 3949, bh: 3949, adorama: 3949, ebay: 3899, cdw: 3999, sweetwater: 3999 }, outOfStock: ['target', 'walmart'] },
  { id: 'macbook-air-13-m5-512', name: 'MacBook Air 13" M5 512GB', category: 'mac', msrp: 1199, specs: { chip: 'M5', storage: '512GB', ram: '16GB', display: '13.6" Liquid Retina' }, prices: { apple: 1199, amazon: 1149, walmart: 1199, bestbuy: 1199, bh: 1099, adorama: 1199, ebay: 1149, cdw: 1199, sweetwater: 1199 }, outOfStock: [] },
  { id: 'macbook-air-13-m5-1tb', name: 'MacBook Air 13" M5 1TB', category: 'mac', msrp: 1399, specs: { chip: 'M5', storage: '1TB', ram: '16GB', display: '13.6" Liquid Retina' }, prices: { apple: 1399, amazon: 1349, walmart: 1399, bestbuy: 1399, bh: 1299, adorama: 1399, ebay: 1349, cdw: 1399, sweetwater: 1399 }, outOfStock: [] },
  { id: 'macbook-air-15-m5-512', name: 'MacBook Air 15" M5 512GB', category: 'mac', msrp: 1399, specs: { chip: 'M5', storage: '512GB', ram: '16GB', display: '15.3" Liquid Retina' }, prices: { apple: 1399, amazon: 1349, walmart: 1399, bestbuy: 1399, bh: 1299, adorama: 1399, ebay: 1349, cdw: 1399, sweetwater: 1399 }, outOfStock: [] },
  { id: 'macbook-air-15-m5-1tb', name: 'MacBook Air 15" M5 1TB', category: 'mac', msrp: 1599, specs: { chip: 'M5', storage: '1TB', ram: '16GB', display: '15.3" Liquid Retina' }, prices: { apple: 1599, amazon: 1549, walmart: 1599, bestbuy: 1599, bh: 1499, adorama: 1599, ebay: 1549, cdw: 1599, sweetwater: 1599 }, outOfStock: [] },
  { id: 'macbook-air-13-m4', name: 'MacBook Air 13" M4 256GB', category: 'mac', msrp: 1099, specs: { chip: 'M4', storage: '256GB', ram: '16GB', display: '13.6" Liquid Retina' }, prices: { apple: 1099, amazon: 1049, walmart: 1099, bestbuy: 1099, bh: 999, adorama: 1099, ebay: 1049, cdw: 1099, sweetwater: 1099 }, outOfStock: [] },
  { id: 'macbook-air-13-m4-512', name: 'MacBook Air 13" M4 512GB', category: 'mac', msrp: 1299, specs: { chip: 'M4', storage: '512GB', ram: '16GB', display: '13.6" Liquid Retina' }, prices: { apple: 1299, amazon: 1249, walmart: 1299, bestbuy: 1299, bh: 1199, adorama: 1299, ebay: 1249, cdw: 1299, sweetwater: 1299 }, outOfStock: [] },
  { id: 'macbook-air-15-m4', name: 'MacBook Air 15" M4 256GB', category: 'mac', msrp: 1299, specs: { chip: 'M4', storage: '256GB', ram: '16GB', display: '15.3" Liquid Retina' }, prices: { apple: 1299, amazon: 1249, walmart: 1299, bestbuy: 1299, bh: 1199, adorama: 1299, ebay: 1249, cdw: 1299, sweetwater: 1299 }, outOfStock: [] },
  { id: 'macbook-air-15-m4-512', name: 'MacBook Air 15" M4 512GB', category: 'mac', msrp: 1499, specs: { chip: 'M4', storage: '512GB', ram: '16GB', display: '15.3" Liquid Retina' }, prices: { apple: 1499, amazon: 1449, walmart: 1499, bestbuy: 1499, bh: 1399, adorama: 1499, ebay: 1449, cdw: 1499, sweetwater: 1499 }, outOfStock: [] },
  { id: 'macbook-pro-14-m4-pro', name: 'MacBook Pro 14" M4 Pro', category: 'mac', msrp: 1999, specs: { chip: 'M4 Pro', storage: '512GB', ram: '24GB', display: '14.2" XDR' }, prices: { apple: 1699, amazon: 1649, walmart: 1699, target: 1699, bestbuy: 1649, bh: 1649, adorama: 1649, ebay: 1599, cdw: 1699, sweetwater: 1699 }, outOfStock: ['target'] },
  { id: 'macbook-pro-14-m4-max', name: 'MacBook Pro 14" M4 Max', category: 'mac', msrp: 3499, specs: { chip: 'M4 Max', storage: '1TB', ram: '36GB', display: '14.2" XDR' }, prices: { apple: 3499, amazon: 3449, walmart: 3499, target: 3499, bestbuy: 3449, bh: 3449, adorama: 3449, ebay: 3399, cdw: 3499, sweetwater: 3499 }, outOfStock: ['target'] },
  { id: 'macbook-pro-16-m4-pro', name: 'MacBook Pro 16" M4 Pro', category: 'mac', msrp: 2499, specs: { chip: 'M4 Pro', storage: '512GB', ram: '24GB', display: '16.2" XDR' }, prices: { apple: 2499, amazon: 2449, walmart: 2499, target: 2499, bestbuy: 2449, bh: 2449, adorama: 2449, ebay: 2399, cdw: 2499, sweetwater: 2499 }, outOfStock: ['target'] },
  { id: 'mac-mini-m4', name: 'Mac mini M4', category: 'mac', msrp: 599, specs: { chip: 'M4', storage: '256GB', ram: '16GB' }, prices: { apple: 599, amazon: 569, walmart: 599, target: 599, bestbuy: 599, bh: 569, adorama: 569, ebay: 549, cdw: 599, sweetwater: 599 }, outOfStock: [] },
  { id: 'mac-mini-m4-512', name: 'Mac mini M4 512GB', category: 'mac', msrp: 799, specs: { chip: 'M4', storage: '512GB', ram: '16GB' }, prices: { apple: 799, amazon: 769, walmart: 799, target: 799, bestbuy: 799, bh: 769, adorama: 769, ebay: 749, cdw: 799, sweetwater: 799 }, outOfStock: [] },
  { id: 'mac-mini-m4-pro', name: 'Mac mini M4 Pro', category: 'mac', msrp: 1399, specs: { chip: 'M4 Pro', storage: '512GB', ram: '24GB' }, prices: { apple: 1399, amazon: 1349, walmart: 1399, target: 1399, bestbuy: 1399, bh: 1349, adorama: 1349, ebay: 1299, cdw: 1399, sweetwater: 1399 }, outOfStock: ['target'] },
  { id: 'mac-studio-m2-ultra', name: 'Mac Studio M2 Ultra', category: 'mac', msrp: 3999, specs: { chip: 'M2 Ultra', storage: '1TB', ram: '64GB' }, prices: { apple: 3999, amazon: 3899, walmart: 3999, target: 3999, bestbuy: 3899, bh: 3899, adorama: 3899, ebay: 3799, cdw: 3999, sweetwater: 3999 }, outOfStock: ['walmart', 'target'] },
  { id: 'mac-studio-m4', name: 'Mac Studio M4 1TB', category: 'mac', msrp: 1999, specs: { chip: 'M4', storage: '1TB', ram: '32GB' }, prices: { apple: 1999, amazon: 1949, walmart: 1999, target: 1999, bestbuy: 1949, bh: 1949, adorama: 1949, ebay: 1899, cdw: 1999, sweetwater: 1999 }, outOfStock: ['target'] },
  { id: 'mac-studio-m4-ultra', name: 'Mac Studio M4 Ultra 1TB', category: 'mac', msrp: 3999, specs: { chip: 'M4 Ultra', storage: '1TB', ram: '96GB' }, prices: { apple: 3999, amazon: 3899, walmart: 3999, target: 3999, bestbuy: 3899, bh: 3899, adorama: 3899, ebay: 3799, cdw: 3999, sweetwater: 3999 }, outOfStock: ['walmart', 'target'] },
  { id: 'mac-pro-m2-ultra', name: 'Mac Pro M2 Ultra', category: 'mac', msrp: 6999, specs: { chip: 'M2 Ultra', storage: '1TB', ram: '192GB' }, prices: { apple: 6999, amazon: 6899, bh: 6899, adorama: 6899, ebay: 6699, cdw: 6999 }, outOfStock: [] },
  { id: 'imac-m4', name: 'iMac M4 256GB', category: 'mac', msrp: 1299, specs: { chip: 'M4', storage: '256GB', ram: '16GB', display: '24" 4.5K Retina' }, prices: { apple: 1299, amazon: 1249, walmart: 1299, target: 1299, bestbuy: 1299, bh: 1249, adorama: 1249, ebay: 1199, cdw: 1299, sweetwater: 1299 }, outOfStock: [] },
  { id: 'imac-m4-512', name: 'iMac M4 512GB', category: 'mac', msrp: 1699, specs: { chip: 'M4', storage: '512GB', ram: '24GB', display: '24" 4.5K Retina' }, prices: { apple: 1699, amazon: 1649, walmart: 1699, target: 1699, bestbuy: 1649, bh: 1649, adorama: 1649, ebay: 1599, cdw: 1699, sweetwater: 1699 }, outOfStock: ['target'] },
  // ── iPad ─────────────────────────────────────────────────────────────────────
  { id: 'ipad-pro-13-m4', name: 'iPad Pro 13" M4 256GB', category: 'ipad', msrp: 1299, specs: { chip: 'M4', storage: '256GB', ram: '8GB', display: '13" Ultra Retina XDR' }, prices: { apple: 1299, amazon: 1199, walmart: 1299, target: 1299, bestbuy: 1199, bh: 1199, adorama: 1199, ebay: 1149, cdw: 1299 }, outOfStock: [] },
  { id: 'ipad-pro-13-m4-1tb', name: 'iPad Pro 13" M4 1TB', category: 'ipad', msrp: 1699, specs: { chip: 'M4', storage: '1TB', ram: '16GB', display: '13" Ultra Retina XDR' }, prices: { apple: 1699, amazon: 1599, walmart: 1699, target: 1699, bestbuy: 1599, bh: 1599, adorama: 1599, ebay: 1549, cdw: 1699 }, outOfStock: [] },
  { id: 'ipad-pro-13-m4-cell', name: 'iPad Pro 13" M4 256GB Wi-Fi+Cell', category: 'ipad', msrp: 1499, specs: { chip: 'M4', storage: '256GB', ram: '8GB', display: '13" Ultra Retina XDR', connectivity: 'Wi-Fi + Cellular' }, prices: { apple: 1499, amazon: 1399, bestbuy: 1399, ebay: 1349, cdw: 1499 }, outOfStock: [] },
  { id: 'ipad-pro-11-m4', name: 'iPad Pro 11" M4 256GB', category: 'ipad', msrp: 999, specs: { chip: 'M4', storage: '256GB', ram: '8GB', display: '11" Ultra Retina XDR' }, prices: { apple: 999, amazon: 899, walmart: 999, target: 999, bestbuy: 899, bh: 899, adorama: 899, ebay: 849, cdw: 999 }, outOfStock: [] },
  { id: 'ipad-pro-11-m4-512', name: 'iPad Pro 11" M4 512GB', category: 'ipad', msrp: 1299, specs: { chip: 'M4', storage: '512GB', ram: '16GB', display: '11" Ultra Retina XDR' }, prices: { apple: 1299, amazon: 1199, walmart: 1299, target: 1299, bestbuy: 1199, bh: 1199, adorama: 1199, ebay: 1149, cdw: 1299 }, outOfStock: [] },
  { id: 'ipad-pro-11-m4-cell', name: 'iPad Pro 11" M4 256GB Wi-Fi+Cell', category: 'ipad', msrp: 1199, specs: { chip: 'M4', storage: '256GB', ram: '8GB', display: '11" Ultra Retina XDR', connectivity: 'Wi-Fi + Cellular' }, prices: { apple: 1199, amazon: 1099, bestbuy: 1099, ebay: 1049, cdw: 1199 }, outOfStock: [] },
  { id: 'ipad-air-13-m2', name: 'iPad Air 13" M2', category: 'ipad', msrp: 799, specs: { chip: 'M2', storage: '128GB', ram: '8GB', display: '13" Liquid Retina' }, prices: { apple: 799, amazon: 749, walmart: 799, target: 799, bestbuy: 749, bh: 749, adorama: 749, ebay: 699, cdw: 799 }, outOfStock: [] },
  { id: 'ipad-air-13-m3', name: 'iPad Air 13" M3', category: 'ipad', msrp: 899, specs: { chip: 'M3', storage: '128GB', ram: '8GB', display: '13" Liquid Retina' }, prices: { apple: 899, amazon: 849, walmart: 899, target: 899, bestbuy: 849, bh: 849, adorama: 849, ebay: 799, cdw: 899 }, outOfStock: [] },
  { id: 'ipad-air-11-m3', name: 'iPad Air 11" M3', category: 'ipad', msrp: 599, specs: { chip: 'M3', storage: '128GB', ram: '8GB', display: '11" Liquid Retina' }, prices: { apple: 599, amazon: 549, walmart: 599, target: 599, bestbuy: 549, bh: 549, adorama: 549, ebay: 499, cdw: 599 }, outOfStock: [] },
  { id: 'ipad-air-11-m2', name: 'iPad Air 11" M2', category: 'ipad', msrp: 499, specs: { chip: 'M2', storage: '128GB', ram: '8GB', display: '11" Liquid Retina' }, prices: { apple: 499, amazon: 449, walmart: 499, target: 499, bestbuy: 449, bh: 449, adorama: 449, ebay: 399, cdw: 499 }, outOfStock: [] },
  { id: 'ipad-11-a16', name: 'iPad 11" A16', category: 'ipad', msrp: 349, specs: { chip: 'A16', storage: '128GB', ram: '6GB', display: '11" Liquid Retina' }, prices: { apple: 349, amazon: 329, walmart: 349, target: 349, bestbuy: 329, bh: 329, adorama: 329, ebay: 299, cdw: 349 }, outOfStock: [] },
  { id: 'ipad-10', name: 'iPad 10th Gen A14', category: 'ipad', msrp: 299, specs: { chip: 'A14', storage: '64GB', ram: '4GB', display: '10.9" Liquid Retina' }, prices: { apple: 299, amazon: 279, walmart: 299, target: 299, bestbuy: 279, bh: 279, adorama: 279, ebay: 249, cdw: 299 }, outOfStock: [] },
  { id: 'ipad-mini-7', name: 'iPad mini 7', category: 'ipad', msrp: 499, specs: { chip: 'A17 Pro', storage: '128GB', ram: '8GB', display: '8.3" Liquid Retina' }, prices: { apple: 499, amazon: 449, walmart: 499, target: 499, bestbuy: 449, bh: 449, adorama: 449, ebay: 429, cdw: 499 }, outOfStock: [] },
  { id: 'ipad-mini-6', name: 'iPad mini 6 A15', category: 'ipad', msrp: 399, specs: { chip: 'A15', storage: '64GB', ram: '4GB', display: '8.3" Liquid Retina' }, prices: { apple: 399, amazon: 369, walmart: 399, target: 399, bestbuy: 369, bh: 369, adorama: 369, ebay: 349, cdw: 399 }, outOfStock: [] },
  // ── iPhone ───────────────────────────────────────────────────────────────────
  { id: 'iphone-16-pro-max-256', name: 'iPhone 16 Pro Max 256GB', category: 'iphone', msrp: 1199, specs: { chip: 'A18 Pro', storage: '256GB', display: '6.9" Super Retina XDR' }, prices: { apple: 1199, amazon: 1149, walmart: 1199, target: 1199, bestbuy: 1149, bh: 1149, ebay: 1099 }, outOfStock: [] },
  { id: 'iphone-16-pro-max-512', name: 'iPhone 16 Pro Max 512GB', category: 'iphone', msrp: 1399, specs: { chip: 'A18 Pro', storage: '512GB', display: '6.9" Super Retina XDR' }, prices: { apple: 1399, amazon: 1349, walmart: 1399, target: 1399, bestbuy: 1349, bh: 1349, ebay: 1299 }, outOfStock: [] },
  { id: 'iphone-16-pro-max-1tb', name: 'iPhone 16 Pro Max 1TB', category: 'iphone', msrp: 1599, specs: { chip: 'A18 Pro', storage: '1TB', display: '6.9" Super Retina XDR' }, prices: { apple: 1599, amazon: 1549, walmart: 1599, target: 1599, bestbuy: 1549, bh: 1549, ebay: 1499 }, outOfStock: [] },
  { id: 'iphone-16-pro-128', name: 'iPhone 16 Pro 128GB', category: 'iphone', msrp: 999, specs: { chip: 'A18 Pro', storage: '128GB', display: '6.3" Super Retina XDR' }, prices: { apple: 999, amazon: 949, walmart: 999, target: 999, bestbuy: 949, bh: 949, ebay: 899 }, outOfStock: [] },
  { id: 'iphone-16-pro-256', name: 'iPhone 16 Pro 256GB', category: 'iphone', msrp: 1099, specs: { chip: 'A18 Pro', storage: '256GB', display: '6.3" Super Retina XDR' }, prices: { apple: 1099, amazon: 1049, walmart: 1099, target: 1099, bestbuy: 1049, bh: 1049, ebay: 999 }, outOfStock: [] },
  { id: 'iphone-16-pro-512', name: 'iPhone 16 Pro 512GB', category: 'iphone', msrp: 1299, specs: { chip: 'A18 Pro', storage: '512GB', display: '6.3" Super Retina XDR' }, prices: { apple: 1299, amazon: 1249, walmart: 1299, target: 1299, bestbuy: 1249, bh: 1249, ebay: 1199 }, outOfStock: [] },
  { id: 'iphone-16-plus-128', name: 'iPhone 16 Plus 128GB', category: 'iphone', msrp: 899, specs: { chip: 'A18', storage: '128GB', display: '6.7" Super Retina XDR' }, prices: { apple: 899, amazon: 849, walmart: 899, target: 899, bestbuy: 849, bh: 849, ebay: 799 }, outOfStock: [] },
  { id: 'iphone-16-plus-256', name: 'iPhone 16 Plus 256GB', category: 'iphone', msrp: 999, specs: { chip: 'A18', storage: '256GB', display: '6.7" Super Retina XDR' }, prices: { apple: 999, amazon: 949, walmart: 999, target: 999, bestbuy: 949, bh: 949, ebay: 899 }, outOfStock: [] },
  { id: 'iphone-16-128', name: 'iPhone 16 128GB', category: 'iphone', msrp: 799, specs: { chip: 'A18', storage: '128GB', display: '6.1" Super Retina XDR' }, prices: { apple: 799, amazon: 749, walmart: 799, target: 799, bestbuy: 749, bh: 749, ebay: 699 }, outOfStock: [] },
  { id: 'iphone-16-256', name: 'iPhone 16 256GB', category: 'iphone', msrp: 899, specs: { chip: 'A18', storage: '256GB', display: '6.1" Super Retina XDR' }, prices: { apple: 899, amazon: 849, walmart: 899, target: 899, bestbuy: 849, bh: 849, ebay: 799 }, outOfStock: [] },
  { id: 'iphone-15-pro-max-256', name: 'iPhone 15 Pro Max 256GB', category: 'iphone', msrp: 1199, specs: { chip: 'A17 Pro', storage: '256GB', display: '6.7" Super Retina XDR' }, prices: { apple: 1099, amazon: 999, walmart: 1099, target: 1099, bestbuy: 999, bh: 999, ebay: 929 }, outOfStock: [] },
  { id: 'iphone-15-pro-128', name: 'iPhone 15 Pro 128GB', category: 'iphone', msrp: 999, specs: { chip: 'A17 Pro', storage: '128GB', display: '6.1" Super Retina XDR' }, prices: { apple: 899, amazon: 849, walmart: 899, target: 899, bestbuy: 849, bh: 849, ebay: 799 }, outOfStock: [] },
  { id: 'iphone-15-plus-128', name: 'iPhone 15 Plus 128GB', category: 'iphone', msrp: 899, specs: { chip: 'A16', storage: '128GB', display: '6.7" Super Retina XDR' }, prices: { apple: 799, amazon: 749, walmart: 799, target: 799, bestbuy: 749, bh: 749, ebay: 699 }, outOfStock: [] },
  { id: 'iphone-15', name: 'iPhone 15 128GB', category: 'iphone', msrp: 699, specs: { chip: 'A16', storage: '128GB', display: '6.1" Super Retina XDR' }, prices: { apple: 699, amazon: 649, walmart: 699, target: 699, bestbuy: 649, bh: 649, adorama: 649, ebay: 599, cdw: 699 }, outOfStock: [] },
  { id: 'iphone-15-256', name: 'iPhone 15 256GB', category: 'iphone', msrp: 799, specs: { chip: 'A16', storage: '256GB', display: '6.1" Super Retina XDR' }, prices: { apple: 729, amazon: 679, walmart: 729, target: 729, bestbuy: 679, bh: 679, ebay: 629 }, outOfStock: [] },
  { id: 'iphone-14-128', name: 'iPhone 14 128GB', category: 'iphone', msrp: 599, specs: { chip: 'A15', storage: '128GB', display: '6.1" Super Retina XDR' }, prices: { apple: 599, amazon: 549, walmart: 549, target: 549, bestbuy: 549, bh: 549, ebay: 499 }, outOfStock: [] },
  { id: 'iphone-se-4-128', name: 'iPhone SE 4 128GB', category: 'iphone', msrp: 499, specs: { chip: 'A16', storage: '128GB', display: '6.1" Super Retina XDR' }, prices: { apple: 499, amazon: 469, walmart: 499, target: 499, bestbuy: 469, bh: 469, adorama: 469, ebay: 449, cdw: 499 }, outOfStock: [] },
  { id: 'iphone-se-4-256', name: 'iPhone SE 4 256GB', category: 'iphone', msrp: 599, specs: { chip: 'A16', storage: '256GB', display: '6.1" Super Retina XDR' }, prices: { apple: 599, amazon: 569, walmart: 599, target: 599, bestbuy: 569, bh: 569, adorama: 569, ebay: 549, cdw: 599 }, outOfStock: [] },
  { id: 'iphone-13-128', name: 'iPhone 13 128GB', category: 'iphone', msrp: 499, specs: { chip: 'A15', storage: '128GB', display: '6.1" Super Retina XDR' }, prices: { apple: 449, amazon: 399, walmart: 449, target: 449, bestbuy: 399, ebay: 349 }, outOfStock: [] },
  // ── Apple Watch ──────────────────────────────────────────────────────────────
  { id: 'apple-watch-series-10-46mm', name: 'Apple Watch Series 10 46mm GPS', category: 'watch', msrp: 429, specs: { chip: 'S10', display: '46mm', connectivity: 'GPS' }, prices: { apple: 429, amazon: 399, walmart: 429, target: 429, bestbuy: 399, bh: 399, adorama: 399, ebay: 379, cdw: 429 }, outOfStock: [] },
  { id: 'apple-watch-series-10-42mm', name: 'Apple Watch Series 10 42mm GPS', category: 'watch', msrp: 399, specs: { chip: 'S10', display: '42mm', connectivity: 'GPS' }, prices: { apple: 399, amazon: 369, walmart: 399, target: 399, bestbuy: 369, bh: 369, adorama: 369, ebay: 349, cdw: 399 }, outOfStock: [] },
  { id: 'apple-watch-series-10-46mm-cell', name: 'Apple Watch Series 10 46mm GPS+Cell', category: 'watch', msrp: 529, specs: { chip: 'S10', display: '46mm', connectivity: 'GPS + Cellular' }, prices: { apple: 529, amazon: 499, walmart: 529, target: 529, bestbuy: 499, bh: 499, adorama: 499, ebay: 479, cdw: 529 }, outOfStock: [] },
  { id: 'apple-watch-series-10-42mm-cell', name: 'Apple Watch Series 10 42mm GPS+Cell', category: 'watch', msrp: 499, specs: { chip: 'S10', display: '42mm', connectivity: 'GPS + Cellular' }, prices: { apple: 499, amazon: 469, walmart: 499, target: 499, bestbuy: 469, bh: 469, adorama: 469, ebay: 449, cdw: 499 }, outOfStock: [] },
  { id: 'apple-watch-ultra-2', name: 'Apple Watch Ultra 2 49mm', category: 'watch', msrp: 799, specs: { chip: 'S9', display: '49mm', connectivity: 'GPS + Cellular' }, prices: { apple: 799, amazon: 749, walmart: 799, target: 799, bestbuy: 749, bh: 749, adorama: 749, ebay: 699, cdw: 799 }, outOfStock: [] },
  { id: 'apple-watch-se-2-44mm', name: 'Apple Watch SE 2 44mm', category: 'watch', msrp: 279, specs: { chip: 'S8', display: '44mm', connectivity: 'GPS' }, prices: { apple: 279, amazon: 249, walmart: 279, target: 279, bestbuy: 249, bh: 249, adorama: 249, ebay: 229, cdw: 279 }, outOfStock: [] },
  { id: 'apple-watch-se-2-40mm', name: 'Apple Watch SE 2 40mm', category: 'watch', msrp: 249, specs: { chip: 'S8', display: '40mm', connectivity: 'GPS' }, prices: { apple: 249, amazon: 219, walmart: 249, target: 249, bestbuy: 219, bh: 219, adorama: 219, ebay: 199, cdw: 249 }, outOfStock: [] },
  // ── AirPods ──────────────────────────────────────────────────────────────────
  { id: 'airpods-pro-3', name: 'AirPods Pro 3', category: 'airpods', msrp: 249, specs: { chip: 'H3', features: 'ANC, Hearing Aid' }, prices: { apple: 249, amazon: 229, walmart: 229, target: 249, bestbuy: 229, bh: 229, adorama: 229, ebay: 219, cdw: 249 }, outOfStock: [] },
  { id: 'airpods-4-anc', name: 'AirPods 4 with ANC', category: 'airpods', msrp: 179, specs: { chip: 'H2', features: 'ANC' }, prices: { apple: 179, amazon: 149, walmart: 149, target: 179, bestbuy: 149, bh: 149, adorama: 149, ebay: 139, cdw: 179 }, outOfStock: [] },
  { id: 'airpods-4', name: 'AirPods 4', category: 'airpods', msrp: 129, specs: { chip: 'H2', features: 'Transparency Mode' }, prices: { apple: 129, amazon: 109, walmart: 109, target: 129, bestbuy: 109, bh: 109, adorama: 109, ebay: 99, cdw: 129 }, outOfStock: [] },
  { id: 'airpods-max-usb-c', name: 'AirPods Max USB-C', category: 'airpods', msrp: 549, specs: { chip: 'H1', features: 'USB-C, Spatial Audio' }, prices: { apple: 549, amazon: 499, walmart: 499, target: 549, bestbuy: 499, bh: 499, adorama: 499, ebay: 479, cdw: 549 }, outOfStock: [] },
  // ── Apple TV / HomePod / Vision Pro ──────────────────────────────────────────
  { id: 'apple-tv-4k-3rd-wifi', name: 'Apple TV 4K (3rd gen) Wi-Fi', category: 'appletv', msrp: 129, specs: { chip: 'A15', resolution: '4K', connectivity: 'Wi-Fi' }, prices: { apple: 129, amazon: 119, walmart: 129, target: 129, bestbuy: 119, bh: 119, adorama: 119, ebay: 109 }, outOfStock: [] },
  { id: 'apple-tv-4k-3rd-eth', name: 'Apple TV 4K (3rd gen) Wi-Fi+Ethernet', category: 'appletv', msrp: 149, specs: { chip: 'A15', resolution: '4K', connectivity: 'Wi-Fi + Ethernet' }, prices: { apple: 149, amazon: 139, walmart: 149, target: 149, bestbuy: 139, bh: 139, adorama: 139, ebay: 129 }, outOfStock: [] },
  { id: 'homepod-mini', name: 'HomePod mini', category: 'homepod', msrp: 99, specs: { chip: 'S5', features: 'Siri, 360° audio' }, prices: { apple: 99, amazon: 89, walmart: 99, target: 99, bestbuy: 89, bh: 89, adorama: 89, ebay: 79 }, outOfStock: [] },
  { id: 'homepod-2', name: 'HomePod (2nd gen)', category: 'homepod', msrp: 299, specs: { chip: 'S9', features: 'Siri, Spatial Audio, Matter' }, prices: { apple: 299, amazon: 279, walmart: 299, target: 299, bestbuy: 279, bh: 279, adorama: 279, ebay: 259 }, outOfStock: [] },
  { id: 'apple-vision-pro', name: 'Apple Vision Pro 256GB', category: 'visionpro', msrp: 3499, specs: { chip: 'M2+R1', storage: '256GB', display: 'micro-OLED 23M pixels' }, prices: { apple: 3499, amazon: 3299, bestbuy: 3299, bh: 3299, adorama: 3299, ebay: 3199 }, outOfStock: [] },
  // ── Additional Mac (M4 base & Max configs) ────────────────────────────────────
  { id: 'macbook-pro-14-m4', name: 'MacBook Pro 14" M4', category: 'mac', msrp: 1599, specs: { chip: 'M4', storage: '512GB', ram: '16GB', display: '14.2" XDR' }, prices: { apple: 1599, amazon: 1549, walmart: 1599, target: 1599, bestbuy: 1549, bh: 1549, adorama: 1549, ebay: 1499, cdw: 1599, sweetwater: 1599 }, outOfStock: ['target'] },
  { id: 'macbook-pro-14-m4-1tb', name: 'MacBook Pro 14" M4 1TB', category: 'mac', msrp: 1799, specs: { chip: 'M4', storage: '1TB', ram: '24GB', display: '14.2" XDR' }, prices: { apple: 1799, amazon: 1749, walmart: 1799, target: 1799, bestbuy: 1749, bh: 1749, adorama: 1749, ebay: 1699, cdw: 1799, sweetwater: 1799 }, outOfStock: ['target'] },
  { id: 'macbook-pro-16-m4-max', name: 'MacBook Pro 16" M4 Max 1TB', category: 'mac', msrp: 3499, specs: { chip: 'M4 Max', storage: '1TB', ram: '36GB', display: '16.2" XDR' }, prices: { apple: 3499, amazon: 3449, walmart: 3499, target: 3499, bestbuy: 3449, bh: 3449, adorama: 3449, ebay: 3399, cdw: 3499, sweetwater: 3499 }, outOfStock: ['target'] },
  { id: 'macbook-pro-16-m4-max-2tb', name: 'MacBook Pro 16" M4 Max 2TB', category: 'mac', msrp: 3999, specs: { chip: 'M4 Max', storage: '2TB', ram: '48GB', display: '16.2" XDR' }, prices: { apple: 3999, amazon: 3949, walmart: 3999, target: 3999, bestbuy: 3949, bh: 3949, adorama: 3949, ebay: 3899, cdw: 3999, sweetwater: 3999 }, outOfStock: ['target', 'walmart'] },
  // ── Additional iPhone configs ─────────────────────────────────────────────────
  { id: 'iphone-16-pro-1tb', name: 'iPhone 16 Pro 1TB', category: 'iphone', msrp: 1499, specs: { chip: 'A18 Pro', storage: '1TB', display: '6.3" Super Retina XDR' }, prices: { apple: 1499, amazon: 1449, walmart: 1499, target: 1499, bestbuy: 1449, bh: 1449, ebay: 1399 }, outOfStock: [] },
  { id: 'iphone-15-pro-max-512', name: 'iPhone 15 Pro Max 512GB', category: 'iphone', msrp: 1299, specs: { chip: 'A17 Pro', storage: '512GB', display: '6.7" Super Retina XDR' }, prices: { apple: 1199, amazon: 1099, walmart: 1199, target: 1199, bestbuy: 1099, bh: 1099, ebay: 1029 }, outOfStock: [] },
  { id: 'iphone-15-pro-256', name: 'iPhone 15 Pro 256GB', category: 'iphone', msrp: 1099, specs: { chip: 'A17 Pro', storage: '256GB', display: '6.1" Super Retina XDR' }, prices: { apple: 999, amazon: 949, walmart: 999, target: 999, bestbuy: 949, bh: 949, ebay: 899 }, outOfStock: [] },
  { id: 'iphone-14-256', name: 'iPhone 14 256GB', category: 'iphone', msrp: 699, specs: { chip: 'A15', storage: '256GB', display: '6.1" Super Retina XDR' }, prices: { apple: 699, amazon: 649, walmart: 649, target: 649, bestbuy: 649, bh: 649, ebay: 599 }, outOfStock: [] },
  { id: 'iphone-14-plus-128', name: 'iPhone 14 Plus 128GB', category: 'iphone', msrp: 699, specs: { chip: 'A15', storage: '128GB', display: '6.7" Super Retina XDR' }, prices: { apple: 699, amazon: 649, walmart: 699, target: 699, bestbuy: 649, bh: 649, ebay: 599 }, outOfStock: [] },
  // ── Additional iPad configs ───────────────────────────────────────────────────
  { id: 'ipad-pro-13-m4-512', name: 'iPad Pro 13" M4 512GB', category: 'ipad', msrp: 1499, specs: { chip: 'M4', storage: '512GB', ram: '16GB', display: '13" Ultra Retina XDR' }, prices: { apple: 1499, amazon: 1399, walmart: 1499, target: 1499, bestbuy: 1399, bh: 1399, adorama: 1399, ebay: 1349, cdw: 1499 }, outOfStock: [] },
  { id: 'ipad-pro-11-m4-1tb', name: 'iPad Pro 11" M4 1TB', category: 'ipad', msrp: 1499, specs: { chip: 'M4', storage: '1TB', ram: '16GB', display: '11" Ultra Retina XDR' }, prices: { apple: 1499, amazon: 1399, walmart: 1499, target: 1499, bestbuy: 1399, bh: 1399, adorama: 1399, ebay: 1349, cdw: 1499 }, outOfStock: [] },
  // ── Accessories ───────────────────────────────────────────────────────────────
  { id: 'apple-pencil-pro', name: 'Apple Pencil Pro', category: 'accessories', msrp: 129, specs: { compatibility: 'iPad Pro M4, iPad Air M2+', features: 'Squeeze, Barrel Roll' }, prices: { apple: 129, amazon: 119, walmart: 129, target: 129, bestbuy: 119, bh: 119, adorama: 119, ebay: 109 }, outOfStock: [] },
  { id: 'apple-pencil-2', name: 'Apple Pencil (2nd gen)', category: 'accessories', msrp: 129, specs: { compatibility: 'iPad Pro, iPad Air', features: 'Double Tap' }, prices: { apple: 129, amazon: 109, walmart: 129, target: 129, bestbuy: 109, bh: 109, adorama: 109, ebay: 89 }, outOfStock: [] },
  { id: 'apple-watch-series-9-45mm', name: 'Apple Watch Series 9 45mm GPS', category: 'watch', msrp: 399, specs: { chip: 'S9', display: '45mm', connectivity: 'GPS' }, prices: { apple: 349, amazon: 319, walmart: 349, target: 349, bestbuy: 319, bh: 319, adorama: 319, ebay: 299, cdw: 349 }, outOfStock: [] },
  { id: 'apple-watch-series-9-41mm', name: 'Apple Watch Series 9 41mm GPS', category: 'watch', msrp: 349, specs: { chip: 'S9', display: '41mm', connectivity: 'GPS' }, prices: { apple: 299, amazon: 279, walmart: 299, target: 299, bestbuy: 279, bh: 279, adorama: 279, ebay: 259, cdw: 299 }, outOfStock: [] },
  { id: 'airpods-3', name: 'AirPods (3rd gen)', category: 'airpods', msrp: 169, specs: { chip: 'H1', features: 'Spatial Audio, Lightning' }, prices: { apple: 169, amazon: 139, walmart: 149, target: 169, bestbuy: 139, bh: 139, adorama: 139, ebay: 129, cdw: 169 }, outOfStock: [] },
] as const;

// ── Theresmac: Refurbished Products ───────────────────────────────────────────

type RefurbProduct = {
  id: string;
  name: string;
  category: string;
  msrp: number;
  specs: Record<string, string>;
  prices: Partial<Record<string, number>>;
  outOfStock: string[];
};

const refurbProducts: RefurbProduct[] = [
  // Refurb iPhones (7)
  { id: 'refurb-iphone-16-pro-max-256', name: 'Refurbished iPhone 16 Pro Max 256GB', category: 'iphone', msrp: 1199, specs: { chip: 'A18 Pro', storage: '256GB', condition: 'Certified Refurbished' }, prices: { apple: 1019, amazon: 979, bestbuy: 999, ebay: 949 }, outOfStock: [] },
  { id: 'refurb-iphone-16-pro-128', name: 'Refurbished iPhone 16 Pro 128GB', category: 'iphone', msrp: 999, specs: { chip: 'A18 Pro', storage: '128GB', condition: 'Certified Refurbished' }, prices: { apple: 849, amazon: 819, bestbuy: 839, ebay: 799 }, outOfStock: [] },
  { id: 'refurb-iphone-16-128', name: 'Refurbished iPhone 16 128GB', category: 'iphone', msrp: 799, specs: { chip: 'A18', storage: '128GB', condition: 'Certified Refurbished' }, prices: { apple: 679, amazon: 649, bestbuy: 659, ebay: 619 }, outOfStock: [] },
  { id: 'refurb-iphone-15-pro-max-256', name: 'Refurbished iPhone 15 Pro Max 256GB', category: 'iphone', msrp: 1199, specs: { chip: 'A17 Pro', storage: '256GB', condition: 'Certified Refurbished' }, prices: { apple: 999, amazon: 959, bestbuy: 979, ebay: 929 }, outOfStock: [] },
  { id: 'refurb-iphone-15-pro-128', name: 'Refurbished iPhone 15 Pro 128GB', category: 'iphone', msrp: 999, specs: { chip: 'A17 Pro', storage: '128GB', condition: 'Certified Refurbished' }, prices: { apple: 829, amazon: 799, bestbuy: 819, ebay: 779 }, outOfStock: [] },
  { id: 'refurb-iphone-15-128', name: 'Refurbished iPhone 15 128GB', category: 'iphone', msrp: 699, specs: { chip: 'A16', storage: '128GB', condition: 'Certified Refurbished' }, prices: { apple: 589, amazon: 559, bestbuy: 569, ebay: 529 }, outOfStock: [] },
  { id: 'refurb-iphone-14-128', name: 'Refurbished iPhone 14 128GB', category: 'iphone', msrp: 599, specs: { chip: 'A15', storage: '128GB', condition: 'Certified Refurbished' }, prices: { apple: 489, amazon: 459, bestbuy: 479, ebay: 429 }, outOfStock: [] },
  // Refurb Macs (12)
  { id: 'refurb-macbook-pro-14-m5', name: 'Refurbished MacBook Pro 14" M5', category: 'mac', msrp: 1999, specs: { chip: 'M5', storage: '512GB', condition: 'Certified Refurbished' }, prices: { apple: 1699, amazon: 1649, bestbuy: 1669, ebay: 1599 }, outOfStock: [] },
  { id: 'refurb-macbook-pro-14-m5-pro', name: 'Refurbished MacBook Pro 14" M5 Pro', category: 'mac', msrp: 2499, specs: { chip: 'M5 Pro', storage: '512GB', condition: 'Certified Refurbished' }, prices: { apple: 2099, amazon: 2049, bestbuy: 2069, ebay: 1999 }, outOfStock: [] },
  { id: 'refurb-macbook-pro-14-m4-pro', name: 'Refurbished MacBook Pro 14" M4 Pro', category: 'mac', msrp: 1999, specs: { chip: 'M4 Pro', storage: '512GB', condition: 'Certified Refurbished' }, prices: { apple: 1649, amazon: 1599, bestbuy: 1619, ebay: 1549 }, outOfStock: [] },
  { id: 'refurb-macbook-pro-16-m4-pro', name: 'Refurbished MacBook Pro 16" M4 Pro', category: 'mac', msrp: 2499, specs: { chip: 'M4 Pro', storage: '512GB', condition: 'Certified Refurbished' }, prices: { apple: 2099, amazon: 2049, bestbuy: 2069, ebay: 1999 }, outOfStock: [] },
  { id: 'refurb-macbook-pro-16-m4-max', name: 'Refurbished MacBook Pro 16" M4 Max', category: 'mac', msrp: 3499, specs: { chip: 'M4 Max', storage: '1TB', condition: 'Certified Refurbished' }, prices: { apple: 2899, amazon: 2849, bestbuy: 2869, ebay: 2799 }, outOfStock: [] },
  { id: 'refurb-macbook-air-13-m5', name: 'Refurbished MacBook Air 13" M5', category: 'mac', msrp: 1199, specs: { chip: 'M5', storage: '512GB', condition: 'Certified Refurbished' }, prices: { apple: 999, amazon: 969, bestbuy: 979, ebay: 949 }, outOfStock: [] },
  { id: 'refurb-macbook-air-13-m4', name: 'Refurbished MacBook Air 13" M4', category: 'mac', msrp: 1099, specs: { chip: 'M4', storage: '256GB', condition: 'Certified Refurbished' }, prices: { apple: 919, amazon: 889, bestbuy: 899, ebay: 869 }, outOfStock: [] },
  { id: 'refurb-macbook-air-15-m4', name: 'Refurbished MacBook Air 15" M4', category: 'mac', msrp: 1299, specs: { chip: 'M4', storage: '256GB', condition: 'Certified Refurbished' }, prices: { apple: 1099, amazon: 1059, bestbuy: 1069, ebay: 1029 }, outOfStock: [] },
  { id: 'refurb-mac-mini-m4', name: 'Refurbished Mac mini M4', category: 'mac', msrp: 599, specs: { chip: 'M4', storage: '256GB', condition: 'Certified Refurbished' }, prices: { apple: 499, amazon: 479, bestbuy: 489, ebay: 459 }, outOfStock: [] },
  { id: 'refurb-imac-m4', name: 'Refurbished iMac M4', category: 'mac', msrp: 1299, specs: { chip: 'M4', storage: '256GB', condition: 'Certified Refurbished' }, prices: { apple: 1099, amazon: 1069, bestbuy: 1079, ebay: 1029 }, outOfStock: [] },
  { id: 'refurb-mac-studio-m2-ultra', name: 'Refurbished Mac Studio M2 Ultra', category: 'mac', msrp: 3999, specs: { chip: 'M2 Ultra', storage: '1TB', condition: 'Certified Refurbished' }, prices: { apple: 3399, amazon: 3299, bestbuy: 3349, ebay: 3199 }, outOfStock: [] },
  { id: 'refurb-mac-mini-m4-pro', name: 'Refurbished Mac mini M4 Pro', category: 'mac', msrp: 1399, specs: { chip: 'M4 Pro', storage: '512GB', condition: 'Certified Refurbished' }, prices: { apple: 1179, amazon: 1149, bestbuy: 1159, ebay: 1099 }, outOfStock: [] },
  // Refurb iPads (6)
  { id: 'refurb-ipad-pro-13-m4', name: 'Refurbished iPad Pro 13" M4 256GB', category: 'ipad', msrp: 1299, specs: { chip: 'M4', storage: '256GB', condition: 'Certified Refurbished' }, prices: { apple: 1099, amazon: 1059, bestbuy: 1069, ebay: 1029 }, outOfStock: [] },
  { id: 'refurb-ipad-pro-11-m4', name: 'Refurbished iPad Pro 11" M4 256GB', category: 'ipad', msrp: 999, specs: { chip: 'M4', storage: '256GB', condition: 'Certified Refurbished' }, prices: { apple: 849, amazon: 819, bestbuy: 829, ebay: 799 }, outOfStock: [] },
  { id: 'refurb-ipad-air-13-m2', name: 'Refurbished iPad Air 13" M2', category: 'ipad', msrp: 799, specs: { chip: 'M2', storage: '128GB', condition: 'Certified Refurbished' }, prices: { apple: 669, amazon: 639, bestbuy: 649, ebay: 619 }, outOfStock: [] },
  { id: 'refurb-ipad-air-11-m3', name: 'Refurbished iPad Air 11" M3', category: 'ipad', msrp: 599, specs: { chip: 'M3', storage: '128GB', condition: 'Certified Refurbished' }, prices: { apple: 499, amazon: 479, bestbuy: 489, ebay: 459 }, outOfStock: [] },
  { id: 'refurb-ipad-mini-7', name: 'Refurbished iPad mini 7', category: 'ipad', msrp: 499, specs: { chip: 'A17 Pro', storage: '128GB', condition: 'Certified Refurbished' }, prices: { apple: 419, amazon: 399, bestbuy: 409, ebay: 389 }, outOfStock: [] },
  { id: 'refurb-ipad-pro-11-m2', name: 'Refurbished iPad Pro 11" M2', category: 'ipad', msrp: 799, specs: { chip: 'M2', storage: '128GB', condition: 'Certified Refurbished' }, prices: { apple: 649, amazon: 619, bestbuy: 629, ebay: 599 }, outOfStock: [] },
  // Refurb Watches / AirPods / Other (3)
  { id: 'refurb-apple-watch-series-10-46mm', name: 'Refurbished Apple Watch Series 10 46mm', category: 'watch', msrp: 429, specs: { chip: 'S10', display: '46mm', condition: 'Certified Refurbished' }, prices: { apple: 359, amazon: 339, bestbuy: 349, ebay: 319 }, outOfStock: [] },
  { id: 'refurb-airpods-pro-3', name: 'Refurbished AirPods Pro 3', category: 'airpods', msrp: 249, specs: { chip: 'H3', features: 'ANC', condition: 'Certified Refurbished' }, prices: { apple: 199, amazon: 189, bestbuy: 189, ebay: 179 }, outOfStock: [] },
  { id: 'refurb-apple-vision-pro', name: 'Refurbished Apple Vision Pro 256GB', category: 'visionpro', msrp: 3499, specs: { chip: 'M2+R1', storage: '256GB', condition: 'Certified Refurbished' }, prices: { apple: 2999, amazon: 2899, bestbuy: 2899, ebay: 2799 }, outOfStock: [] },
];

// ── GPUDrip Products ──────────────────────────────────────────────────────────

const gpudripProducts = [
  // NVIDIA Blackwell
  { id: 'rtx-5090', name: 'NVIDIA RTX 5090', category: 'nvidia', msrp: 1999, currentPrice: 2399, inStock: false, specs: { architecture: 'Blackwell', vram: '32GB', tdp: '575W', benchmark: 35200 } },
  { id: 'rtx-5080', name: 'NVIDIA RTX 5080', category: 'nvidia', msrp: 999, currentPrice: 1199, inStock: false, specs: { architecture: 'Blackwell', vram: '16GB', tdp: '360W', benchmark: 26800 } },
  { id: 'rtx-5070-ti', name: 'NVIDIA RTX 5070 Ti', category: 'nvidia', msrp: 749, currentPrice: 849, inStock: false, specs: { architecture: 'Blackwell', vram: '16GB', tdp: '300W', benchmark: 22400 } },
  { id: 'rtx-5070', name: 'NVIDIA RTX 5070', category: 'nvidia', msrp: 549, currentPrice: 629, inStock: true, specs: { architecture: 'Blackwell', vram: '12GB', tdp: '250W', benchmark: 18900 } },
  { id: 'rtx-5060-ti', name: 'NVIDIA RTX 5060 Ti', category: 'nvidia', msrp: 429, currentPrice: 459, inStock: true, specs: { architecture: 'Blackwell', vram: '16GB', tdp: '180W', benchmark: 15600 } },
  { id: 'rtx-5060', name: 'NVIDIA RTX 5060', category: 'nvidia', msrp: 299, currentPrice: 329, inStock: true, specs: { architecture: 'Blackwell', vram: '8GB', tdp: '150W', benchmark: 12800 } },
  // NVIDIA Ada Lovelace
  { id: 'rtx-4090', name: 'NVIDIA RTX 4090', category: 'nvidia', msrp: 1599, currentPrice: 1799, inStock: false, specs: { architecture: 'Ada Lovelace', vram: '24GB', tdp: '450W', benchmark: 32100 } },
  { id: 'rtx-4080-super', name: 'NVIDIA RTX 4080 Super', category: 'nvidia', msrp: 999, currentPrice: 1049, inStock: true, specs: { architecture: 'Ada Lovelace', vram: '16GB', tdp: '320W', benchmark: 24900 } },
  { id: 'rtx-4080', name: 'NVIDIA RTX 4080', category: 'nvidia', msrp: 1199, currentPrice: 999, inStock: true, specs: { architecture: 'Ada Lovelace', vram: '16GB', tdp: '320W', benchmark: 23700 } },
  { id: 'rtx-4070-ti-super', name: 'NVIDIA RTX 4070 Ti Super', category: 'nvidia', msrp: 799, currentPrice: 849, inStock: true, specs: { architecture: 'Ada Lovelace', vram: '16GB', tdp: '285W', benchmark: 21700 } },
  { id: 'rtx-4070-ti', name: 'NVIDIA RTX 4070 Ti', category: 'nvidia', msrp: 799, currentPrice: 699, inStock: true, specs: { architecture: 'Ada Lovelace', vram: '12GB', tdp: '285W', benchmark: 20400 } },
  { id: 'rtx-4070-super', name: 'NVIDIA RTX 4070 Super', category: 'nvidia', msrp: 599, currentPrice: 629, inStock: true, specs: { architecture: 'Ada Lovelace', vram: '12GB', tdp: '220W', benchmark: 18900 } },
  { id: 'rtx-4070', name: 'NVIDIA RTX 4070', category: 'nvidia', msrp: 599, currentPrice: 549, inStock: true, specs: { architecture: 'Ada Lovelace', vram: '12GB', tdp: '200W', benchmark: 17500 } },
  { id: 'rtx-4060-ti', name: 'NVIDIA RTX 4060 Ti', category: 'nvidia', msrp: 399, currentPrice: 379, inStock: true, specs: { architecture: 'Ada Lovelace', vram: '8GB', tdp: '160W', benchmark: 14200 } },
  { id: 'rtx-4060', name: 'NVIDIA RTX 4060', category: 'nvidia', msrp: 299, currentPrice: 289, inStock: true, specs: { architecture: 'Ada Lovelace', vram: '8GB', tdp: '115W', benchmark: 11300 } },
  // AMD RDNA 4
  { id: 'rx-9070-xt', name: 'AMD RX 9070 XT', category: 'amd', msrp: 599, currentPrice: 649, inStock: false, specs: { architecture: 'RDNA 4', vram: '16GB', tdp: '304W', benchmark: 24100 } },
  { id: 'rx-9070', name: 'AMD RX 9070', category: 'amd', msrp: 549, currentPrice: 579, inStock: true, specs: { architecture: 'RDNA 4', vram: '16GB', tdp: '220W', benchmark: 20400 } },
  { id: 'rx-9060-xt', name: 'AMD RX 9060 XT', category: 'amd', msrp: 299, currentPrice: 329, inStock: true, specs: { architecture: 'RDNA 4', vram: '16GB', tdp: '150W', benchmark: 14600 } },
  // AMD RDNA 3
  { id: 'rx-7900-xtx', name: 'AMD RX 7900 XTX', category: 'amd', msrp: 999, currentPrice: 899, inStock: true, specs: { architecture: 'RDNA 3', vram: '24GB', tdp: '355W', benchmark: 23500 } },
  { id: 'rx-7900-xt', name: 'AMD RX 7900 XT', category: 'amd', msrp: 899, currentPrice: 749, inStock: true, specs: { architecture: 'RDNA 3', vram: '20GB', tdp: '300W', benchmark: 20900 } },
  { id: 'rx-7800-xt', name: 'AMD RX 7800 XT', category: 'amd', msrp: 499, currentPrice: 479, inStock: true, specs: { architecture: 'RDNA 3', vram: '16GB', tdp: '263W', benchmark: 16400 } },
  { id: 'rx-7700-xt', name: 'AMD RX 7700 XT', category: 'amd', msrp: 449, currentPrice: 419, inStock: true, specs: { architecture: 'RDNA 3', vram: '12GB', tdp: '245W', benchmark: 14200 } },
  { id: 'rx-7600', name: 'AMD RX 7600', category: 'amd', msrp: 269, currentPrice: 259, inStock: true, specs: { architecture: 'RDNA 3', vram: '8GB', tdp: '165W', benchmark: 10800 } },
  // NVIDIA Ampere
  { id: 'rtx-3090', name: 'NVIDIA RTX 3090', category: 'nvidia', msrp: 1499, currentPrice: 999, inStock: true, specs: { architecture: 'Ampere', vram: '24GB', tdp: '350W', benchmark: 24000 } },
  { id: 'rtx-3080-ti', name: 'NVIDIA RTX 3080 Ti', category: 'nvidia', msrp: 1199, currentPrice: 799, inStock: true, specs: { architecture: 'Ampere', vram: '12GB', tdp: '350W', benchmark: 21500 } },
  { id: 'rtx-3080', name: 'NVIDIA RTX 3080', category: 'nvidia', msrp: 699, currentPrice: 549, inStock: true, specs: { architecture: 'Ampere', vram: '10GB', tdp: '320W', benchmark: 19500 } },
  { id: 'rtx-3070-ti', name: 'NVIDIA RTX 3070 Ti', category: 'nvidia', msrp: 599, currentPrice: 449, inStock: true, specs: { architecture: 'Ampere', vram: '8GB', tdp: '290W', benchmark: 17000 } },
  { id: 'rtx-3070', name: 'NVIDIA RTX 3070', category: 'nvidia', msrp: 499, currentPrice: 379, inStock: true, specs: { architecture: 'Ampere', vram: '8GB', tdp: '220W', benchmark: 15500 } },
  { id: 'rtx-3060-ti', name: 'NVIDIA RTX 3060 Ti', category: 'nvidia', msrp: 399, currentPrice: 329, inStock: true, specs: { architecture: 'Ampere', vram: '8GB', tdp: '200W', benchmark: 13500 } },
  { id: 'rtx-3060', name: 'NVIDIA RTX 3060', category: 'nvidia', msrp: 329, currentPrice: 299, inStock: true, specs: { architecture: 'Ampere', vram: '12GB', tdp: '170W', benchmark: 10500 } },
  // AMD RDNA 2
  { id: 'rx-6900-xt', name: 'AMD RX 6900 XT', category: 'amd', msrp: 999, currentPrice: 649, inStock: true, specs: { architecture: 'RDNA 2', vram: '16GB', tdp: '300W', benchmark: 18500 } },
  { id: 'rx-6800-xt', name: 'AMD RX 6800 XT', category: 'amd', msrp: 649, currentPrice: 499, inStock: true, specs: { architecture: 'RDNA 2', vram: '16GB', tdp: '300W', benchmark: 17500 } },
  { id: 'rx-6800', name: 'AMD RX 6800', category: 'amd', msrp: 579, currentPrice: 449, inStock: true, specs: { architecture: 'RDNA 2', vram: '16GB', tdp: '250W', benchmark: 16000 } },
  { id: 'rx-6700-xt', name: 'AMD RX 6700 XT', category: 'amd', msrp: 479, currentPrice: 329, inStock: true, specs: { architecture: 'RDNA 2', vram: '12GB', tdp: '230W', benchmark: 13000 } },
  { id: 'rx-6600-xt', name: 'AMD RX 6600 XT', category: 'amd', msrp: 379, currentPrice: 279, inStock: true, specs: { architecture: 'RDNA 2', vram: '8GB', tdp: '160W', benchmark: 11500 } },
  { id: 'rx-6600', name: 'AMD RX 6600', category: 'amd', msrp: 329, currentPrice: 219, inStock: true, specs: { architecture: 'RDNA 2', vram: '8GB', tdp: '132W', benchmark: 10000 } },
  // Intel Arc
  { id: 'arc-a770', name: 'Intel Arc A770', category: 'intel', msrp: 329, currentPrice: 299, inStock: true, specs: { architecture: 'Alchemist', vram: '16GB', tdp: '225W', benchmark: 14000 } },
  { id: 'arc-a750', name: 'Intel Arc A750', category: 'intel', msrp: 249, currentPrice: 229, inStock: true, specs: { architecture: 'Alchemist', vram: '8GB', tdp: '190W', benchmark: 13000 } },
] as const;

const gpuRetailers = ['amazon', 'bestbuy', 'newegg', 'bh', 'microcenter', 'adorama', 'cdw'];

// ── Seed Functions ────────────────────────────────────────────────────────────

async function seedTheresmac() {
  console.log('Seeding Theresmac new products...');
  let count = 0;

  for (const p of theresmacProducts) {
    const product = await db.product.upsert({
      where: { site_slug: { site: 'theresmac', slug: p.id } },
      create: { site: 'theresmac', slug: p.id, name: p.name, category: p.category, msrp: p.msrp, specs: p.specs as any },
      update: { name: p.name, category: p.category, msrp: p.msrp, specs: p.specs as any },
    });

    for (const [retailer, price] of Object.entries(p.prices)) {
      const isOutOfStock = (p.outOfStock as readonly string[]).includes(retailer);
      await db.retailerPrice.upsert({
        where: { productId_retailer: { productId: product.id, retailer } },
        create: { productId: product.id, retailer, price, status: isOutOfStock ? 'out_of_stock' : 'in_stock', url: `https://theresmac.com/product/${p.id}`, verified: true },
        update: { price, status: isOutOfStock ? 'out_of_stock' : 'in_stock', verified: true },
      });
    }
    count++;
  }

  console.log(`  ✓ ${count} Theresmac new products seeded`);
}

async function seedRefurbTheresmac() {
  console.log('Seeding Theresmac refurbished products...');
  let count = 0;

  for (const p of refurbProducts) {
    const product = await db.product.upsert({
      where: { site_slug: { site: 'theresmac', slug: p.id } },
      create: { site: 'theresmac', slug: p.id, name: p.name, category: p.category, msrp: p.msrp, specs: p.specs as any },
      update: { name: p.name, category: p.category, msrp: p.msrp, specs: p.specs as any },
    });

    for (const [retailer, price] of Object.entries(p.prices)) {
      if (price == null) continue;
      const isOutOfStock = p.outOfStock.includes(retailer);
      await db.retailerPrice.upsert({
        where: { productId_retailer: { productId: product.id, retailer } },
        create: { productId: product.id, retailer, price: price as number, status: isOutOfStock ? 'out_of_stock' : 'in_stock', url: `https://theresmac.com/product/${p.id}`, verified: true },
        update: { price: price as number, status: isOutOfStock ? 'out_of_stock' : 'in_stock', verified: true },
      });
    }
    count++;
  }

  console.log(`  ✓ ${count} Theresmac refurbished products seeded`);
}

async function seedGpuDrip() {
  console.log('Seeding GPUDrip products...');
  let count = 0;

  for (const g of gpudripProducts) {
    const product = await db.product.upsert({
      where: { site_slug: { site: 'gpudrip', slug: g.id } },
      create: { site: 'gpudrip', slug: g.id, name: g.name, category: g.category, msrp: g.msrp, specs: g.specs as any },
      update: { name: g.name, category: g.category, msrp: g.msrp, specs: g.specs as any },
    });

    for (const retailer of gpuRetailers) {
      await db.retailerPrice.upsert({
        where: { productId_retailer: { productId: product.id, retailer } },
        create: { productId: product.id, retailer, price: g.currentPrice, status: g.inStock ? 'in_stock' : 'out_of_stock', url: `https://gpudrip.com/gpu/${g.id}`, verified: false },
        update: { price: g.currentPrice, status: g.inStock ? 'in_stock' : 'out_of_stock' },
      });
    }
    count++;
  }

  console.log(`  ✓ ${count} GPUDrip products seeded`);
}

async function main() {
  console.log('Starting seed...\n');

  const theresmacTotal = (theresmacProducts as unknown as any[]).length + refurbProducts.length;
  console.log(`Theresmac: ${(theresmacProducts as unknown as any[]).length} new + ${refurbProducts.length} refurb = ${theresmacTotal} total`);
  console.log(`GPUDrip: ${gpudripProducts.length} products`);
  console.log(`Grand total: ${theresmacTotal + gpudripProducts.length} products\n`);

  await seedTheresmac();
  await seedRefurbTheresmac();
  await seedGpuDrip();
  console.log('\nSeed complete.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
