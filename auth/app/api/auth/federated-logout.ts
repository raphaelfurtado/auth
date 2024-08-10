import jwt from "next-auth/jwt"

export default async function federatedLogout(req, res) {
    try {
        const token = await jwt.getToken({ req, secret: process.env.SECRET, encryption: true })
        if (!token) {

            return res.redirect(process.env.NEXTAUTH_URL)
        }
        if (!token.idToken)


            const endsessionURL = `https://${process.env.PROVIDER_DOMAIN}/connect/endsession`
        const endsessionParams = new URLSearchParams({
            id_token_hint: token.idToken,
            post_logout_redirect_uri: process.env.NEXTAUTH_URL,
        })
        res.setHeader(
            "Set-Cookie",
            "next-auth.session-token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
        );
        return res.redirect(`${endsessionURL}?${endsessionParams}`)
    } catch (error) {
        res.redirect(process.env.NEXTAUTH_URL)
    }
}