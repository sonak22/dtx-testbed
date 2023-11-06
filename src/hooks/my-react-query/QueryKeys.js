export const QueryKeys = {
   // 지도 조회
   getMap: (siteId) => ["get", "map", siteId],
   getPipeDetail: (pipeId) => ["get", "pipe", pipeId],
   getHistoryType: (type, siteId) => ["get", "history", type, siteId],
   // 알림 조회
   getNoti: (siteId) => ["get", "noti", siteId],
};
