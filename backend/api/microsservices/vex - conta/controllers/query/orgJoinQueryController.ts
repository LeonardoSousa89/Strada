import express from "express";
import OrgJoinQueryService from "../../services/query/orgJoinQueryService";
import RedisOperations from "../../repositories/redis/cache/services/redis.cache.operation";

const OrgJoinQueryController = express.Router();

OrgJoinQueryController.route("/org/join/data").get(async (req, res) => {
  const Org = { ...req.query };

  const orgJoinQueryService = new OrgJoinQueryService();

  const cache = new RedisOperations();

  if (!Org.org_id)
    return res.status(400).json({
      error: "query params required",
    });

  try {
    const orgJoinQueryFromCache = await cache.getCache(
      `OrgJoinQuery_${Org.org_id}`
    );

    if (orgJoinQueryFromCache) {
      const data = JSON.parse(orgJoinQueryFromCache);

      return res.status(200).json({
        data: { inCache: "yes", data },
      });
    }

    const data = await orgJoinQueryService.getById(Number(Org.org_id));

    if (data.data.organization.organization.length === 0) {
      return res.status(404).json({
        error: "organization not found",
      });
    }

    await cache.setCache(
      `OrgJoinQuery_${Org.org_id}`,
      JSON.stringify(data),
      300
    );

    return res.status(200).json({
      data: { inCache: "no", data },
    });
  } catch (__) {
    return res.status(500).json({
      error: "i am sorry, there is an error with server"+__,
    });
  }
});

export { OrgJoinQueryController };
