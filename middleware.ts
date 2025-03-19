import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const host = req.headers.get("host") || "";
    const url = req.nextUrl.clone();


    // Extract subdomain (e.g., greenwoodschool from greenwoodschool.localhost)
    const subdomain = host.split(".")[0];

    // Ignore requests to the main domain (localhost:3000, your main site, etc.)
    if (host === "localhost:3001" || host === "localhost" || host === "schoolapp.pramodkesarkar.tech") {
        return NextResponse.next();
    }

    // **Prevent Infinite Loop:**
    // If the request is already on `/school/[subdomain]`, do nothing
    if (url.pathname.startsWith(`/school/`)) {
        return NextResponse.next();
    }

    // **Rewrite** the request to the dynamic school profile route
    url.pathname = `/school/${subdomain}`;
    return NextResponse.rewrite(url);
}

// ✅ Define match routes here instead of next.config.ts
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"], // Matches all routes except Next.js assets
};
