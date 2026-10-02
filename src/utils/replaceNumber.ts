

const e2p = (s: string | number): string =>
  s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

const p2e = (s: string | number): string => {
  return s
    .toString()
    // تبدیل اعداد فارسی
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
    // تبدیل اعداد عربی
    .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString())
    // حذف هرگونه کاراکتر غیر عددی (مثل ویرگول، فاصله، نقطه‌های اضافی)
    .replace(/[^0-9]/g, "");
};

const sp = (number: string | number): string => {
  // ابتدا عدد را کاملاً انگلیسی و پاکسازی می‌کنیم تا regex درست کار کند
  const cleanNumber = p2e(number);
  const separatedNumber = cleanNumber.match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = separatedNumber?.join(",") ?? "";
  return e2p(joinedNumber);
};

export { e2p, p2e, sp };
