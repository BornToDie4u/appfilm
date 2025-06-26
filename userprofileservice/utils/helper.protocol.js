// Utility function to get the correct protocol
function getProtocol(req) {
  const forwardedProto = req.headers['x-forwarded-proto'];
  if (forwardedProto) return forwardedProto;
  return req.protocol;
}