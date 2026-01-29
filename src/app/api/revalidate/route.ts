import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
    );

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 });
    }

    if (!body?._type) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    // Revalidate by type (e.g. 'blogPost', 'service', 'siteSettings')
    revalidateTag(body._type);

    // If it has a slug, revalidate the specific document tag
    const slug = (body as any).slug?.current;
    if (slug) {
      revalidateTag(`${body._type}:${slug}`);
    }

    // Also revalidate siteSettings if anything changes, as it might affect global state (navigation, footer)
    // and revalidate 'homePage' as it often references multiple other types
    if (body._type !== 'siteSettings') {
      revalidateTag('siteSettings');
    }

    if (body._type !== 'homePage') {
      revalidateTag('homePage');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (err: any) {
    console.error("Revalidation error:", err);
    return new NextResponse(err.message, { status: 500 });
  }
}
