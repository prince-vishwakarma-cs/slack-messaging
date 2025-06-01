function getScheduleTimestamp(minutesFromNow = 1) {
  const timestamp = Math.floor(Date.now() / 1000) + minutesFromNow * 60;
  return timestamp;
}

module.exports = { getScheduleTimestamp };
