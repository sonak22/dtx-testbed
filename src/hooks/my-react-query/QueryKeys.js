export const QueryKeys = {
   // 지도 조회
   getMap: (siteId) => ["get", "map", siteId],
   getPipeDetail: (pipeId) => ["get", "pipe", pipeId],
   getHistoryType: (type, siteId) => ["get", "history", type, siteId],
};
