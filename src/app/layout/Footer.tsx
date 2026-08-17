

function Footer() {
    return (
      <footer className="flex justify-between p-[20px] mt-[80px] mb-[20px] bg-[#304ffe] text-white rounded-lg">
        <div className="ml-0 md:ml-[30px] text-justify w-full md:w-[70%]">
          <h3 className="mb-[10px] text-[1.4rem] font-semibold text-white">
            سامانه خرید و اجاره ملک
          </h3>
          
          {/* استایل‌دهی طلایی برای متن پاراگراف فارسی 👇 */}
          <p className="text-gray-200 text-[0.95rem] leading-7 font-light">
            سامانه هوشمند املاک ما، پلتفرمی امن و سریع برای اتصال خریداران، فروشندگان و 
            مستاجران است. ما با بررسی دقیق و گلچین کردن بهترین آگهی‌های مسکونی، تلاش 
            می‌کنیم دغدغه شیرینِ یافتنِ یک سرپناه نو را به آرامش تبدیل کنیم. خانه، قلب 
            تپنده خانواده است؛ آن را با اطمینان انتخاب کنید.
          </p>
        </div>
        <div>
            <ul>
                <li>تعرفه قانونی</li>
                <li>دسترسی سریع</li>
                <li>مشاورین خبره</li>
                <li>قولنامه محضری</li>
            </ul>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  