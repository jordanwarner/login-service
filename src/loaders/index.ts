import expressLoader from "./express";
import Logger from "./logger";
import express from "express";

export default async ({ expressApp }: { expressApp: express.Application }) => {
  await expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
