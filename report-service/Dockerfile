# ---- Build Stage ----
FROM node:22-slim AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:22-slim

# Puppeteer ต้องการ Chromium และ dependencies เหล่านี้
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-ipafont-gothic \
    fonts-freefont-ttf \
    fonts-thai-tlwg \
    fonts-noto-color-emoji \
    && rm -rf /var/lib/apt/lists/*

# บอก Puppeteer ให้ใช้ Chromium ที่ติดตั้งไว้แทนการดาวน์โหลดเอง
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/main"]
