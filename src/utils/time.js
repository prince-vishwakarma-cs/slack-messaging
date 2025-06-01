function getFutureTimestamp(minutes = 1) {
  const now = Math.floor(Date.now() / 1000);
  return now + minutes * 60;
}

module.exports = { getFutureTimestamp };
