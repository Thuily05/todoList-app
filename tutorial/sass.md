SỰ KHÁC BIỆT GIỮA SASS VÀ CSS
1. CÀI ĐẶT SASS: npm install SASS/ yarn add SASS/ pnpm add SASS
2. TẠO FILE .scss: ví dụ như app/globals.scss hoặc app/styles/button.scss
3. IMPORT vào app/layout.tsx: import './global.scss'
4. VÍ DỤ 1 FILE SCSS: 
$color: #ff5f2e;
.btn {
  padding: 10px 16px;
  background: $color;
  border-radius: 10px;

  &:hover {
    background: darken($color, 10%);
  }
}
5. Sự khác biệt của SASS với CSS:
SASS (hoặc SCSS) là ngôn ngữ mở rộng của CSS -> giúp viết CSS nhanh, gọn và mạnh hơn. 
Cuối dùng Sas biên dịch CSS bình thường để trình duyệt dùng
- Cú pháp mạnh hơn nhiều so với CSS: Biến (Variables) CSS- không có biến, SASS-có biến.
+ví dụ: $primary: #ff5f2e;
button{
    background: $primary
}
- Lồng nhau: trong CSS viết dài và lặp lại selector, SASS viết gọn hơn.
+ CSS: viết .nav {} .nav ul{} .nav ul li a{}
+ SASS viết:
.nav {
    ul{
        li{
            a{}
        }
    }
}
- Mixins (khai báo hàm tái sử dụng): CSS không có hàm, SASS cho phép khai báo lại CSS để tái sử dụng:
@mixin center{
    display: flex;
    justify-content: center;
    align-items: center;
}
.book {
    @include center;
}
- Import nhiều file dễ dàng:
@use 'variables'
@use 'mixins'
- Toán học và logic:
$size: 4
.box{
    width: $size * 20px;
}
6. Ví dụ về Import và Partial