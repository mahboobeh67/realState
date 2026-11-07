import Profile from "@/models/Profile";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { Types } from "mongoose";
import { p2e } from "@/utils/replaceNumber";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOption } from "@/utils/authOptions";

type CreatePropertyBody = {
  title: string;
  description: string;
  location: string;
  phone: string;
  realState: string;
  price: string | number;
  constructionDate: Date | string | number;
  amenities: string[];
  rules: string[];
  category: string;
};

type UpdateReceptionBody = CreatePropertyBody & {
  _id: string;
};

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body: CreatePropertyBody = await req.json();
    const {
      title,
      description,
      location,
      phone,
      realState,
      price,
      constructionDate,
      amenities,
      rules,
      category,
    } = body;

    const session = await getServerSession(authOption);

    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 },
      );
    }

    if (
      !title ||
      !location ||
      !description ||
      !phone ||
      !realState ||
      !price ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 400 },
      );
    }

    const cleanPrice = Number(p2e(price));
    const cleanPhone = p2e(phone);

    if (isNaN(cleanPrice)) {
      return NextResponse.json(
        { error: "قیمت وارد شده معتبر نیست" },
        { status: 400 },
      );
    }

    const newProfile = await Profile.create({
      title,
      description,
      location,
      phone: cleanPhone,
      realState,
      constructionDate,
      rules,
      category,
      amenities,
      price: cleanPrice,
      userId: new Types.ObjectId(user._id),
    });

    return NextResponse.json(
      { message: "آگهی جدید اضافه شد", data: newProfile },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST Error:", err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await connectDB();
    const body: UpdateReceptionBody = await req.json();
    const {
      _id,
      title,
      description,
      location,
      phone,
      realState,
      price,
      constructionDate,
      amenities,
      rules,
      category,
    } = body;

    if (
      !_id ||
      !title ||
      !location ||
      !description ||
      !phone ||
      !realState ||
      !price ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا تمام اطلاعات الزامی را وارد کنید" },
        { status: 400 },
      );
    }

    const session = await getServerSession(authOption);

    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود شوید" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: session?.user?.email });

    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 },
      );
    }

    const profile = await Profile.findOne({ _id });

    if (!profile) {
      return NextResponse.json(
        { error: "آگهی مورد نظر یافت نشد" },
        { status: 404 },
      );
    }

    // 🔴 اصلاح باگ اصلى: متد equals با حرف s در انتهای آن
    if (!user._id.equals(profile.userId)) {
      return NextResponse.json(
        { error: "دسترسی شما به این آگهی محدود شده است" },
        { status: 403 },
      );
    }

    const cleanPrice = Number(p2e(price));
    const cleanPhone = p2e(phone);

    if (isNaN(cleanPrice)) {
      return NextResponse.json(
        { error: "قیمت وارد شده معتبر نیست" },
        { status: 400 },
      );
    }

    profile.title = title;
    profile.description = description;
    profile.location = location;
    profile.phone = cleanPhone;
    profile.realState = realState;
    profile.price = cleanPrice;
    profile.constructionDate = constructionDate;
    profile.amenities = amenities;
    profile.rules = rules;
    profile.category = category;

    // 🔴 اصلاح باگ دوم: اضافه کردن await
    await profile.save();

    return NextResponse.json(
      { message: "آگهی با موفقیت ویرایش شد" },
      { status: 200 },
    );
  } catch (err) {
    console.error("PATCH Error:", err);
    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است" },
      { status: 500 },
    );
  }
}
