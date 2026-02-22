# MacTrackr Product Update Task

## Objective
Update the Railway backend (Python FastAPI) with ALL 43 products from the PDF.

## Source File
`/Users/douglasrichman/.openclaw/workspace/price-aggregator-github/price-aggregator-api/app/routers/mactrackr.py`

## Products to Add (from PDF)

### iPhone (10 products)
1. iPhone 16 Pro Max 256GB (A3084, MYW63LL/A) - ALREADY EXISTS
2. iPhone 16 Pro Max 512GB (A3084, MYWE3LL/A) - NEED TO ADD
3. iPhone 16 Pro Max 1TB (A3084, MYWJ3LL/A) - NEED TO ADD
4. iPhone 16 Pro 256GB (A3083, MYMG3LL/A) - ALREADY EXISTS
5. iPhone 16 Pro 512GB (A3083, MYMK3LL/A) - NEED TO ADD
6. iPhone 16 128GB (A3081, MYAP3LL/A) - NEED TO ADD
7. iPhone 16 Plus 128GB (A3082, MXUT3LL/A) - NEED TO ADD
8. iPhone 15 Pro Max 256GB (A2849, MU663LL/A) - NEED TO ADD
9. iPhone 15 Pro 256GB (A2848, MU6A3LL/A) - NEED TO ADD
10. iPhone 15 128GB (A2846, MTPN3LL/A) - NEED TO ADD
11. iPhone 14 Pro Max 256GB (A2651, MQ8W3LL/A) - NEED TO ADD
12. iPhone 14 256GB (A2649, MPW83LL/A) - NEED TO ADD

### iPad (8 products)
1. iPad Pro 13" M4 256GB (A2925, MVX23LL/A) - NEED TO ADD
2. iPad Pro 11" M4 256GB (A2836, MVV93LL/A) - NEED TO ADD
3. iPad Air 13" M3 256GB (A3268, MCNN4LL/A) - NEED TO ADD
4. iPad Air 11" M3 256GB (A3266, MCA14LL/A) - NEED TO ADD
5. iPad mini 7th Gen 128GB (A2993, MXN63LL/A) - NEED TO ADD
6. iPad mini 6th Gen 64GB (A2567, FK7M3LL/A) - NEED TO ADD
7. iPad 10th Gen 256GB (A2757, FPQ83LL/A) - NEED TO ADD
8. iPad Air M2 11" 256GB (A2902, FV203LL/A) - NEED TO ADD

### MacBook Air (5 products)
1. MacBook Air 13" M4 24GB/256GB (A3240, MC654LL/A) - NEED TO ADD
2. MacBook Air 15" M4 24GB/256GB (A3241, MC6J4LL/A) - NEED TO ADD
3. MacBook Air 13" M3 8GB/256GB (A3114, MRXN3LL/A) - NEED TO ADD
4. MacBook Air 15" M3 8GB/256GB (A3114, MRYM3LL/A) - NEED TO ADD
5. MacBook Air 13" M2 8GB/256GB (A2681, MLXW3LL/A) - NEED TO ADD

### MacBook Pro (5 products)
1. MacBook Pro 16" M4 Pro 24GB/512GB (A3403, MX2X3LL/A) - NEED TO ADD
2. MacBook Pro 14" M4 Pro 24GB/512GB (A3401, MX2T3LL/A) - NEED TO ADD
3. MacBook Pro 14" M4 16GB/512GB (A3400, MCX03LL/A) - NEED TO ADD
4. MacBook Pro 16" M3 Pro 18GB/512GB (A2991, MNWG3LL/A) - NEED TO ADD
5. MacBook Pro 14" M3 8GB/512GB (A2990, MRX23LL/A) - NEED TO ADD

### Mac mini (3 products)
1. Mac mini M4 16GB/256GB (A3238, MU9D3LL/A) - ALREADY EXISTS (verify)
2. Mac mini M4 Pro 24GB/512GB (A3239, MCX44LL/A) - NEED TO ADD
3. Mac mini M2 8GB/256GB (A2686, MMFJ3LL/A) - NEED TO ADD

### Apple Watch (4 products)
1. Apple Watch Ultra 2 49mm (A2986, MQDY3LL/A) - NEED TO ADD
2. Apple Watch Series 10 46mm (A2999, MXL83LL/A) - NEED TO ADD
3. Apple Watch SE 2nd Gen 44mm (A2723, MXEK3LL/A) - NEED TO ADD
4. Apple Watch Series 9 45mm (A2980, MRJ83LL/A) - NEED TO ADD

### AirPods (3 products)
1. AirPods Pro 2 USB-C (A3047/A3048, MTJV3AM/A) - ALREADY EXISTS
2. AirPods 4 ANC (A3170/A3171, MU9A3AM/A) - ALREADY EXISTS
3. AirPods Max USB-C (A2053, MQTP3LL/A) - ALREADY EXISTS

## Retailers per Product
- apple
- amazon
- bestbuy
- walmart
- target (if available)
- bhphoto
- adorama

## URL Pattern
Use direct product URLs (not search pages) for all retailers.

## Git
Commit to: `https://github.com/drichman1-maker/kimi-mono.git`
Branch: master

## Success Criteria
- `/api/products` returns 50+ products
- All products have direct URLs to at least 5 retailers
- Categories: iphone, ipad, mac, watch, airpods
