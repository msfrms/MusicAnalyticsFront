FROM mhart/alpine-node:11 AS builder
WORKDIR /trach
COPY trach .
RUN yarn install
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
WORKDIR /trach
COPY --from=builder /trach/build build
CMD ["serve", "-s", "build"]