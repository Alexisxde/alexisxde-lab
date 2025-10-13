import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	eslint: { ignoreDuringBuilds: true },
	typescript: { ignoreBuildErrors: true },
	reactStrictMode: true,
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
}

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: ["remark-gfm"]
	}
})

export default withMDX(nextConfig)
