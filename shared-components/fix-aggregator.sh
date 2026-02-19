#!/bin/bash
# Quick fix script for aggregator builds
# Usage: ./fix-aggregator.sh <project-folder>

PROJECT=$1

if [ -z "$PROJECT" ]; then
  echo "Usage: ./fix-aggregator.sh <project-folder>"
  exit 1
fi

echo "Fixing $PROJECT..."

# 1. Add postcss.config.js if missing
if [ ! -f "$PROJECT/postcss.config.js" ] && [ ! -f "$PROJECT/postcss.config.mjs" ]; then
  echo "Adding postcss.config.js..."
  cat > "$PROJECT/postcss.config.js" << 'EOF'
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  }
}
EOF
fi

# 2. Add 'use client' to components using hooks
echo "Checking for components needing 'use client'..."
grep -l "useState\|useEffect\|useContext" "$PROJECT/src"/*.tsx 2>/dev/null | while read file; do
  if ! head -1 "$file" | grep -q "'use client'"; then
    echo "  Adding 'use client' to $(basename $file)"
    sed -i '' "1s/^/'use client';\n/" "$file"
  fi
done

# 3. Add next.config.js tweaks if missing
if [ ! -f "$PROJECT/next.config.js" ]; then
  echo "Adding next.config.js..."
  cat > "$PROJECT/next.config.js" << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
};
module.exports = nextConfig;
EOF
fi

echo "Done! Try building with: cd $PROJECT && npm run build"
