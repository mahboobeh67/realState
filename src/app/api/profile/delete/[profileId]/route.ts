import Profile from "@/models/Profile";
import User from "@/models/User";
import { authOption } from "@/utils/authOptions";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: {
    profileId: string;
  };
};

export async function DELETE(
  _req: NextRequest,
  context: RouteContext,
) {
  try {
    await connectDB();

    const { profileId } = context.params;

    const session = await getServerSession(authOption);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "لطفاً ابتدا وارد حساب کاربری خود شوید" },
        { status: 401 },
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری یافت نشد" },
        { status: 404 },
      );
    }

    const profile = await Profile.findById(profileId);
    if (!profile) {
      return NextResponse.json(
        { error: "پرونده پذیرش یافت نشد" },
        { status: 404 },
      );
    }

    if (!user._id.equals(profile.userId)) {
      return NextResponse.json(
        { error: "دسترسی شما به این پرونده پذیرش محدود شده است" },
        { status: 403 },
      );
    }

    await profile.deleteOne();

    return NextResponse.json(
      { message: "آگهی پذیرش مورد نظر حذف شد" },
      { status: 200 },
    );
  } catch (err: unknown) {
    console.error("خطا در حذف پذیرش:", err);

    return NextResponse.json(
      { error: "مشکلی در سرور رخ داده است. لطفاً مجدداً تلاش کنید." },
      { status: 500 },
    );
  }
}
