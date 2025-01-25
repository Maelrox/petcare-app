FROM node:20-alpine AS base
WORKDIR /app

FROM base AS build
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

FROM base AS runtime
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD node ./dist/server/entry.mjs