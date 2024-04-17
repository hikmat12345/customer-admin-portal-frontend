// import { NextResponse, type NextRequest } from 'next/server'

// import { withAuth } from 'next-auth/middleware'

// export default withAuth({
// 	callbacks: {
// 		authorized: ({ req }) => {
// 			const sessionToken = req.cookies.get('token')
// 			if (sessionToken) return true
// 			else return false
// 		},
// 	},
// })

// export function middleware(request: NextRequest) {
// 	const session = request.cookies.get('token')?.value

// 	if (!session && process.env.NEXTAUTH_URL) {
// 		return NextResponse.redirect(process.env.NEXTAUTH_URL)
// 	}
// }
// export const config = {
// 	matcher: ['/((?!api|_next|.*\\..*).*)'],
// }

export function middleware() {}
